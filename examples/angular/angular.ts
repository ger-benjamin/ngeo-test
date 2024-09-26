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

import angular from 'angular';
import 'angular-gettext';
import ngeoDrawModule from 'ngeo/draw/module';
import gmfMapComponent from 'ngeo/map/component';
import options from './options';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/WebGLTile';
import olLayerVector from 'ol/layer/Vector';
import olSourceOSM from 'ol/source/OSM';
import olSourceVector from 'ol/source/Vector';


/** @type {angular.IModule} **/
const myModule = angular.module('app', [
  'gettext',
  ngeoDrawModule.name,
  gmfMapComponent.name,
  ngeoMiscToolActivateMgr.name,
]);

MainController.$inject = ['$scope', 'ngeoFeatures', 'ngeoToolActivateMgr'];

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>} ngeoFeatures Collection
 *    of features.
 * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @class
 */
function MainController($scope, ngeoFeatures, ngeoToolActivateMgr) {
  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;
  const vector = new olLayerVector({
    source: new olSourceVector({
      wrapX: false,
      features: ngeoFeatures,
    }),
  });

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
      vector,
    ],
    view: new olView({
      center: [0, 0],
      zoom: 3,
    }),
  });

  /**
   * @type {boolean}
   */
  this.drawActive = false;
  const drawToolActivate = new ngeoMiscToolActivate(this, 'drawActive');
  ngeoToolActivateMgr.registerTool('mapTools', drawToolActivate, false);

  /**
   * @type {boolean}
   */
  this.dummyActive = true;
  const dummyToolActivate = new ngeoMiscToolActivate(this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, true);
}
myModule.controller('MainController', MainController);
options(myModule);
export default myModule;
