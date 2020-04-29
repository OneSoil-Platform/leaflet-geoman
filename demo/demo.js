// Common data
const accessToken =
  'pk.eyJ1Ijoib25lc29pbCIsImEiOiJjamsydmM2Yngwd3EyM3FyeWVyOWF0cTByIn0.Crc52Fh0B1P-2M_mLrlllg';
const mapboxTileLayerProps = [`https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
  attribution:
    '&copy; <a href="https://www.mapbox.com/feedback/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}]

const geoJsonData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { customGeometry: { radius: 50 } },
      geometry: {
        type: 'Point',
        coordinates: [-0.152843, 51.486742, 77],
      },
    },
    {
      type: 'Feature',
      properties: { customGeometry: { radius: 20 } },
      geometry: {
        type: 'Point',
        coordinates: [-0.151727, 51.487472, 77],
      },
    },
    {
      type: 'Feature',
      properties: { customGeometry: { radius: 80 } },
      geometry: {
        type: 'Point',
        coordinates: [-0.153636, 51.486562, 77],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.15369, 51.486973, 77],
            [-0.153853, 51.48686, 77],
            [-0.154183, 51.486968, 77],
            [-0.154001, 51.487087, 77],
            [-0.15369, 51.486973, 77],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.15252, 51.487201, 77],
            [-0.152789, 51.487281, 77],
            [-0.153025, 51.487097, 77],
            [-0.152633, 51.487002, 77],
            [-0.152448, 51.487088, 77],
            [-0.15252, 51.487201, 77],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.154241, 51.487382, 77],
            [-0.1545, 51.487608, 77],
            [-0.154905, 51.487384, 77],
            [-0.154343, 51.487322, 77],
            [-0.154241, 51.487382, 77],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { customGeometry: { radius: 50 } },
      geometry: {
        type: 'Point',
        coordinates: [-0.153366, 51.487348, 77],
      },
    },
  ],
};

// Demo 1, cutting

const mapboxTiles1 = L.tileLayer(...mapboxTileLayerProps);

const map1 = L.map('example1')
  .setView([51.505, -0.09], 13)
  .addLayer(mapboxTiles1);

const theCollection2 = L.geoJson(geoJsonData, {
  pointToLayer: () => null
});
theCollection2.addTo(map1);

map1.fitBounds(theCollection2.getBounds());

map1.pm.addControls();

// map1.pm.Draw.Cut.enable();
theCollection2.pm.enable();
map1.on('pm:cut', event => {
  event.layer.pm.enable();
})


const mapboxTiles2 = L.tileLayer(...mapboxTileLayerProps);
const mapboxTiles3 = L.tileLayer(...mapboxTileLayerProps);
const mapboxTiles4 = L.tileLayer(...mapboxTileLayerProps);

const map2 = L.map('example2')
  .setView([51.505, -0.09], 13)
  .addLayer(mapboxTiles2);
const map3 = L.map('example3')
  .setView([51.505, -0.09], 13)
  .addLayer(mapboxTiles3);
const map4 = L.map('example4')
  .setView([51.505, -0.09], 13)
  .addLayer(mapboxTiles4);

map2.pm.addControls({
  drawMarker: false,
  drawPolygon: true,
  editPolygon: false,
  drawPolyline: false,
  deleteLayer: true,
});
// map2.pm.addControls({
//     drawMarker: false,
//     drawPolygon: true,
//     editPolygon: false,
//     drawPolyline: false,
//     deleteLayer: false,
// });
// map2.pm.addControls({
//     drawMarker: true,
//     drawPolygon: false,
//     editPolygon: false,
//     drawPolyline: false,
//     deleteLayer: true,
// });
map2.pm.addControls({
  drawMarker: true,
  drawPolygon: true,
  editPolygon: true,
  drawPolyline: true,
  deleteLayer: true,
});

// map2.pm.disableDraw('Polygon');
// map2.pm.enableDraw('Circle', {
//     snappable: true,
//     cursorMarker: true
// });

// map2.pm.enableDraw('Line', { allowSelfIntersection: false });
// map2.pm.enableDraw('Polygon', { allowSelfIntersection: false });

// GEOSJON EXAMPLE

const theCollection = L.geoJson(geoJsonData, {
  pointToLayer: (feature, latlng) => {
    if (feature.properties.customGeometry) {
      return new L.Circle(latlng, feature.properties.customGeometry.radius);
    } else {
      return new L.Marker(latlng);
    }
  },
});
theCollection.addTo(map2);


const b = theCollection.getBounds();
map2.fitBounds(b);

console.log(theCollection);


map3.pm.addControls({
  drawMarker: true,
  drawPolygon: true,
  editPolygon: true,
  deleteLayer: true,
  drawPolyline: true,
});

const markerStyle = {
  opacity: 0.5,
  draggable: false,
};

map3.pm.enableDraw('Polygon', {
  snappable: true,
  templineStyle: {
    color: 'blue',
  },
  hintlineStyle: {
    color: 'blue',
    dashArray: [5, 5],
  },
  pathOptions: {
    color: 'red',
    fillColor: 'orange',
    fillOpacity: 0.7,
  },
  markerStyle: markerStyle,
  cursorMarker: false,
  // finishOn: 'contextmenu',
  finishOnDoubleClick: true,
});

const scotland = L.polygon([
  [[60, -13], [60, 0], [50, 4], [50, -13]],
  [[55.7, -4.5], [56, -4.5], [56, -4], [55.7, -4]],
]);
scotland.addTo(map3);

const bounds = scotland.getBounds();

map3.fitBounds(bounds);

// Polygon Example

const polygonLayer = L.polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047],
])
  .addTo(map3)
  .addTo(map2);

map2.pm.enableDraw('Polygon', { allowSelfIntersection: false });
map2.pm.disableDraw('Polygon');
map2.pm.enableDraw('Line', { allowSelfIntersection: false });
map2.pm.disableDraw('Line');

// Layer Group Example

const layerGroupItem1 = L.polyline(
  [[51.51, -0.09], [51.513, -0.08], [51.514, -0.11]],
  { pmIgnore: true }
);
const layerGroupItem2 = L.polygon([
  [51.52, -0.06],
  [51.51, -0.07],
  [51.52, -0.05],
]);

const layerGroupItem3 = L.polygon([
  [51.51549835365031, -0.06450164634969281],
  [51.51944818307178, -0.08425079345703125],
  [51.51868369995795, -0.06131630004205801],
  [51.51549835365031, -0.06450164634969281],
]);

const feature = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [72.839012, 19.058873],
        [72.92038, 19.066985],
        [72.856178, 19.019928],
        [72.839012, 19.058873],
      ],
    ],
  },
};

const layerGroup = L.featureGroup([layerGroupItem1]).addTo(map4);
layerGroup.pm.toggleEdit({
  draggable: true,
  snappable: true,
  snapDistance: 30,
});
const someLayer = L.geoJSON(feature);

layerGroup.addLayer(someLayer);

someLayer.addData(feature);

map4.pm.addControls({
  position: 'topright',
});

map4.pm.enableDraw('Polygon', {
  finishOn: 'mouseout',
});
map4.pm.disableDraw('Polygon');

map4.pm.enableDraw('Marker', {
  snappable: false,
});
map4.pm.disableDraw('Marker');


layerGroup.addLayer(layerGroupItem2);
layerGroup.addLayer(layerGroupItem3);
