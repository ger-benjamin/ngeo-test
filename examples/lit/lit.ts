import 'ol/ol.css';
//import 'ngeo/sass/font.scss';
//$fa-font-path: '@fortawesome/fontawesome-free/webfonts';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/regular.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'ngeo/sass/typeahead.scss';

//import 'ngeo/sass/jquery-ui.scss';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/datepicker.css';
import 'jquery-ui/themes/base/draggable.css';
import 'jquery-ui/themes/base/resizable.css';
import 'jquery-ui/themes/base/slider.css';
import 'jquery-ui/themes/base/theme.css';

import 'ngeo/controllers/vars_desktop.scss';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {Tile as TileLayer } from 'ol/layer.js';
import 'ngeo/lidar/index';
import mapModel from 'gmfapi/store/map';
import configModel from 'gmfapi/store/config';
import {code as epsg2056} from 'ngeo/proj/EPSG_2056.js'

import SwisstopoSource from '@geoblocks/sources/src/Swisstopo.js';
import i18next from 'i18next';

i18next.init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {}
});

const RESOLUTIONS = [650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1];

const swisstopoPixelkarteFarbe = new SwisstopoSource({
  layer: 'ch.swisstopo.pixelkarte-farbe',
  format: 'image/jpeg',
  projection: epsg2056,
});

const layers = [new TileLayer({source: swisstopoPixelkarteFarbe})];

const extent = swisstopoPixelkarteFarbe.getProjectionExtent();
const view = new View({
  projection: 'EPSG:2056',
  resolutions: RESOLUTIONS,
  extent,
});

const map = new Map({
  controls: [],
  target: 'map',
  layers,
  view,
});

view.fit(extent);

mapModel.setMap(map);
configModel.setConfig({
  pytreeLidarprofileJsonUrl: 'https://sitn.ne.ch/pytree'
});

