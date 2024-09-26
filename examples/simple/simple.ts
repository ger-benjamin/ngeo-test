//import KML from 'ol/format/KML.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { OSM } from 'ol/source';
import {Tile as TileLayer } from 'ol/layer.js';
import {Time} from 'ngeo/misc/Time';

const raster = new TileLayer({
  source: new OSM(),
  className: 'raster'
});

const view = new View({
  center: [914099, 5919982],
  zoom: 7,
  projection: 'EPSG:3857'
});

new Map({
  layers: [raster],
  target: 'map',
  view: view,
});

const time = new Time();
const date = time.createDate('2024.08.15')
console.log(date);