import Draw from './L.PM.Draw';
import EditLine from '../Edit/L.PM.Edit.Line';

Draw.Selection = Draw.Rectangle.extend({
  initialize(map) {
    this._map = map;
    this._shape = 'Selection';
    this.toolbarButtonName = 'selectMode';
  },
  _selectPoints(bounds) {
    const all = this._map._layers;

    // find all layers that intersect with `layer`, the just drawn cutting layer
    const layers = Object.keys(all)
      // convert object to array
      .map(l => all[l])
      // only layers handled by leaflet-geoman
      .filter(l => l.pm)
      // only polygons
      .filter(l => l instanceof L.Polygon)
      // exclude the drawn one
      .filter(l => l !== this._layer);

    layers.forEach(l => {
      const markSelectedMarkers = m => {
        if (Array.isArray(m)) {
          m.forEach(markSelectedMarkers);
          return;
        }
        const latlng = m.getLatLng();
        if (!bounds.contains(latlng)) {
          return;
        }
        l.pm.selectMarker(m);
      };
      markSelectedMarkers(l.pm._markers);
    });
  },
  _finishShape(e) {
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const B = this._hintMarker.getLatLng();

    // get already placed corner from the startmarker
    const A = this._startMarker.getLatLng();

    this._selectPoints(L.latLngBounds(A, B));

    this.disable();
  },
});

