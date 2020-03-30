/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dinamico/index.js":
/*!*******************************!*\
  !*** ./src/dinamico/index.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ga_logo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ga-logo.svg */ "./src/ga-logo.svg");

var registerBlockType = wp.blocks.registerBlockType;
var RichText = wp.editor.RichText;
var withSelect = wp.data.withSelect; //importamos icono personalizado


/**  
        ---7 Pasos para crear un Bloque en Gutenberg ---
    1.- Importar el componente(s) que utilizarás
    2.- Coloca el componente donde deseas utilizarlo.
    3.- Crea una función que lea los contenidos
    4.- Registra un atributo
    5.- Extraer el contenido desde props
    6.- Guarda el contenido con setAttributes
    7.- Lee los contenidos guardados en save()
*/

registerBlockType('ga/dinamico', {
  title: 'Ga Ultimas Recetas',
  icon: {
    src: _ga_logo_svg__WEBPACK_IMPORTED_MODULE_1__["ReactComponent"]
  },
  category: 'gourmet-artist',
  edit: withSelect(function (select) {
    return {
      //Consultar WP REST API para traer las ultimas recetas
      posts: select("core").getEntityRecords("postType", "recetas", {
        per_page: 3,
        offset: 1
      }) //posts: select("core").getEntityRecords('postType', 'post', { per_page: -1 })

    };
  })(function (_ref) {
    var posts = _ref.posts;
    console.log(posts); //Se hara una consulta a posts

    if (!posts) {
      return 'Cargando..';
    }

    if (posts && posts.length == 0) {
      return 'No hay resultados';
    }

    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h2", null, "\xDAltimas Recetas"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("ul", {
      className: "ultimas-recetas contenedor"
    }, posts.map(function (post) {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
        src: post.imagen_destacada
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
        className: "contenido"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h3", null, post.title.rendered), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
        value: post.content.rendered.substring(0, 180) + '...'
      })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
        href: post.link,
        className: "boton"
      }, "Leer M\xE1s")));
    })));
  }),
  save: function save() {
    return null;
  }
});

/***/ }),

/***/ "./src/ga-logo.svg":
/*!*************************!*\
  !*** ./src/ga-logo.svg ***!
  \*************************/
/*! exports provided: default, ReactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactComponent", function() { return SvgGaLogo; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  fill: "#69AA04",
  d: "M0-1.612h27.09v27.255H0z"
});

var _ref2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", {
  fill: "#FFF",
  stroke: "#FFF",
  strokeMiterlimit: 10
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M12.2 3.145c.779.715 1.283 1.673 1.494 2.891h-.406c-.195-1.104-.65-1.965-1.364-2.599-.78-.714-1.803-1.056-3.07-1.056-1.542 0-2.761.568-3.67 1.721-.845 1.04-1.25 2.372-1.25 3.979s.438 2.923 1.315 3.93c.942 1.088 2.241 1.641 3.898 1.641a7.79 7.79 0 002.258-.341c.747-.227 1.332-.52 1.786-.845V8.569H8.627v-.39h4.954v4.482c-.487.39-1.12.731-1.916.991a8.502 8.502 0 01-2.518.39c-1.819 0-3.216-.601-4.223-1.771-.926-1.088-1.38-2.485-1.38-4.19 0-1.689.438-3.103 1.348-4.223.974-1.25 2.29-1.868 3.962-1.868 1.365.001 2.485.375 3.346 1.155zM16.432 9.373l5.185 12.59h-.494l-1.693-4.144h-6.56l-1.693 4.144h-.494l5.184-12.59h.565zm2.821 8.023l-3.068-7.564h-.053l-3.086 7.564h6.207z"
}));

function SvgGaLogo(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", _extends({
    width: 25.16,
    height: 23.954
  }, props), _ref, _ref2);
}

/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,ZnVuY3Rpb24gX2V4dGVuZHMoKSB7IF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTsgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0KCmltcG9ydCAqIGFzIFJlYWN0IGZyb20gInJlYWN0IjsKCnZhciBfcmVmID0gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoInBhdGgiLCB7CiAgZmlsbDogIiM2OUFBMDQiLAogIGQ6ICJNMC0xLjYxMmgyNy4wOXYyNy4yNTVIMHoiCn0pOwoKdmFyIF9yZWYyID0gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoImciLCB7CiAgZmlsbDogIiNGRkYiLAogIHN0cm9rZTogIiNGRkYiLAogIHN0cm9rZU1pdGVybGltaXQ6IDEwCn0sIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KCJwYXRoIiwgewogIGQ6ICJNMTIuMiAzLjE0NWMuNzc5LjcxNSAxLjI4MyAxLjY3MyAxLjQ5NCAyLjg5MWgtLjQwNmMtLjE5NS0xLjEwNC0uNjUtMS45NjUtMS4zNjQtMi41OTktLjc4LS43MTQtMS44MDMtMS4wNTYtMy4wNy0xLjA1Ni0xLjU0MiAwLTIuNzYxLjU2OC0zLjY3IDEuNzIxLS44NDUgMS4wNC0xLjI1IDIuMzcyLTEuMjUgMy45NzlzLjQzOCAyLjkyMyAxLjMxNSAzLjkzYy45NDIgMS4wODggMi4yNDEgMS42NDEgMy44OTggMS42NDFhNy43OSA3Ljc5IDAgMDAyLjI1OC0uMzQxYy43NDctLjIyNyAxLjMzMi0uNTIgMS43ODYtLjg0NVY4LjU2OUg4LjYyN3YtLjM5aDQuOTU0djQuNDgyYy0uNDg3LjM5LTEuMTIuNzMxLTEuOTE2Ljk5MWE4LjUwMiA4LjUwMiAwIDAxLTIuNTE4LjM5Yy0xLjgxOSAwLTMuMjE2LS42MDEtNC4yMjMtMS43NzEtLjkyNi0xLjA4OC0xLjM4LTIuNDg1LTEuMzgtNC4xOSAwLTEuNjg5LjQzOC0zLjEwMyAxLjM0OC00LjIyMy45NzQtMS4yNSAyLjI5LTEuODY4IDMuOTYyLTEuODY4IDEuMzY1LjAwMSAyLjQ4NS4zNzUgMy4zNDYgMS4xNTV6TTE2LjQzMiA5LjM3M2w1LjE4NSAxMi41OWgtLjQ5NGwtMS42OTMtNC4xNDRoLTYuNTZsLTEuNjkzIDQuMTQ0aC0uNDk0bDUuMTg0LTEyLjU5aC41NjV6bTIuODIxIDguMDIzbC0zLjA2OC03LjU2NGgtLjA1M2wtMy4wODYgNy41NjRoNi4yMDd6Igp9KSk7CgpmdW5jdGlvbiBTdmdHYUxvZ28ocHJvcHMpIHsKICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoInN2ZyIsIF9leHRlbmRzKHsKICAgIHdpZHRoOiAyNS4xNiwKICAgIGhlaWdodDogMjMuOTU0CiAgfSwgcHJvcHMpLCBfcmVmLCBfcmVmMik7Cn0KCmV4cG9ydCBkZWZhdWx0ICJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlkWFJtTFRnaVB6NE5DandoTFMwZ1IyVnVaWEpoZEc5eU9pQkJaRzlpWlNCSmJHeDFjM1J5WVhSdmNpQXhOaTR3TGpBc0lGTldSeUJGZUhCdmNuUWdVR3gxWnkxSmJpQXVJRk5XUnlCV1pYSnphVzl1T2lBMkxqQXdJRUoxYVd4a0lEQXBJQ0F0TFQ0TkNqd2hSRTlEVkZsUVJTQnpkbWNnVUZWQ1RFbERJQ0l0THk5WE0wTXZMMFJVUkNCVFZrY2dNUzR4THk5RlRpSWdJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MMGR5WVhCb2FXTnpMMU5XUnk4eExqRXZSRlJFTDNOMlp6RXhMbVIwWkNJK0RRbzhjM1puSUhabGNuTnBiMjQ5SWpFdU1TSWdhV1E5SWtOaGNHRmZNU0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUI0Yld4dWN6cDRiR2x1YXowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzk0YkdsdWF5SWdlRDBpTUhCNElpQjVQU0l3Y0hnaURRb0pJSGRwWkhSb1BTSXlOUzR4Tm5CNElpQm9aV2xuYUhROUlqSXpMamsxTkhCNElpQjJhV1YzUW05NFBTSXdJREFnTWpVdU1UWWdNak11T1RVMElpQmxibUZpYkdVdFltRmphMmR5YjNWdVpEMGlibVYzSURBZ01DQXlOUzR4TmlBeU15NDVOVFFpSUhodGJEcHpjR0ZqWlQwaWNISmxjMlZ5ZG1VaVBnMEtQSEpsWTNRZ2VUMGlMVEV1TmpFeUlpQm1hV3hzUFNJak5qbEJRVEEwSWlCM2FXUjBhRDBpTWpjdU1Ea2lJR2hsYVdkb2REMGlNamN1TWpVMUlpOCtEUW84Wno0TkNnazhjR0YwYUNCbWFXeHNQU0lqUmtaR1JrWkdJaUJ6ZEhKdmEyVTlJaU5HUmtaR1JrWWlJSE4wY205clpTMXRhWFJsY214cGJXbDBQU0l4TUNJZ1pEMGlUVEV5TGpJc015NHhORFZqTUM0M056a3NNQzQzTVRVc01TNHlPRE1zTVM0Mk56TXNNUzQwT1RRc01pNDRPVEZvTFRBdU5EQTJEUW9KQ1dNdE1DNHhPVFV0TVM0eE1EUXRNQzQyTlMweExqazJOUzB4TGpNMk5DMHlMalU1T1dNdE1DNDNPQzB3TGpjeE5DMHhMamd3TXkweExqQTFOaTB6TGpBM0xURXVNRFUyWXkweExqVTBNaXd3TFRJdU56WXhMREF1TlRZNExUTXVOamNzTVM0M01qRU5DZ2tKWXkwd0xqZzBOU3d4TGpBMExURXVNalVzTWk0ek56SXRNUzR5TlN3ekxqazNPWE13TGpRek9Dd3lMamt5TXl3eExqTXhOU3d6TGprell6QXVPVFF5TERFdU1EZzRMREl1TWpReExERXVOalF4TERNdU9EazRMREV1TmpReFl6QXVOelEzTERBc01TNDFNUzB3TGpFeE5Dd3lMakkxT0Mwd0xqTTBNUTBLQ1Fsak1DNDNORGN0TUM0eU1qY3NNUzR6TXpJdE1DNDFNaXd4TGpjNE5pMHdMamcwTlZZNExqVTJPVWc0TGpZeU4zWXRNQzR6T1dnMExqazFOSFkwTGpRNE1tTXRNQzQwT0Rjc01DNHpPUzB4TGpFeUxEQXVOek14TFRFdU9URTJMREF1T1RreERRb0pDV010TUM0NE5EVXNNQzR5TlRrdE1TNDJOek1zTUM0ek9TMHlMalV4T0N3d0xqTTVZeTB4TGpneE9Td3dMVE11TWpFMkxUQXVOakF4TFRRdU1qSXpMVEV1TnpjeFl5MHdMamt5TmkweExqQTRPQzB4TGpNNExUSXVORGcxTFRFdU16Z3ROQzR4T1EwS0NRbGpNQzB4TGpZNE9Td3dMalF6T0MwekxqRXdNeXd4TGpNME9DMDBMakl5TTJNd0xqazNOQzB4TGpJMUxESXVNamt0TVM0NE5qZ3NNeTQ1TmpJdE1TNDROamhETVRBdU1qRTVMREV1T1RreExERXhMak16T1N3eUxqTTJOU3d4TWk0eUxETXVNVFExZWlJdlBnMEtDVHh3WVhSb0lHWnBiR3c5SWlOR1JrWkdSa1lpSUhOMGNtOXJaVDBpSTBaR1JrWkdSaUlnYzNSeWIydGxMVzFwZEdWeWJHbHRhWFE5SWpFd0lpQmtQU0pOTVRZdU5ETXlMRGt1TXpjemJEVXVNVGcxTERFeUxqVTVhQzB3TGpRNU5Hd3RNUzQyT1RNdE5DNHhORFJvTFRZdU5UWU5DZ2tKYkMweExqWTVNeXcwTGpFME5HZ3RNQzQwT1RSc05TNHhPRFF0TVRJdU5UbElNVFl1TkRNeWVpQk5NVGt1TWpVekxERTNMak01Tm13dE15NHdOamd0Tnk0MU5qUm9MVEF1TURVemJDMHpMakE0Tml3M0xqVTJORWd4T1M0eU5UTjZJaTgrRFFvOEwyYytEUW84TDNOMlp6NE5DZz09IjsKZXhwb3J0IHsgU3ZnR2FMb2dvIGFzIFJlYWN0Q29tcG9uZW50IH07");


/***/ }),

/***/ "./src/hero/index.js":
/*!***************************!*\
  !*** ./src/hero/index.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ga_logo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ga-logo.svg */ "./src/ga-logo.svg");

var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    RichText = _wp$editor.RichText,
    MediaUpload = _wp$editor.MediaUpload,
    BlockControls = _wp$editor.BlockControls,
    AlignmentToolbar = _wp$editor.AlignmentToolbar;
var IconButton = wp.components.IconButton; //importamos icono personalizado


/**  
        ---7 Pasos para crear un Bloque en Gutenberg ---
    1.- Importar el componente(s) que utilizarás
    2.- Coloca el componente donde deseas utilizarlo.
    3.- Crea una función que lea los contenidos
    4.- Registra un atributo
    5.- Extraer el contenido desde props
    6.- Guarda el contenido con setAttributes
    7.- Lee los contenidos guardados en save()
*/

registerBlockType('ga/hero', {
  title: 'Ga Hero',
  icon: {
    src: _ga_logo_svg__WEBPACK_IMPORTED_MODULE_1__["ReactComponent"]
  },
  category: 'gourmet-artist',
  attribute: {
    tituloHero: {
      type: 'string',
      source: 'html',
      selector: '.hero-block h1'
    },
    textoHero: {
      type: 'string',
      source: 'html',
      selector: '.hero-block p'
    },
    imagenHero: {
      type: 'string',
      selector: '.hero-block'
    },
    alinearContenido: {
      type: 'string',
      default: 'center'
    }
  },
  supports: {
    align: ['wide', 'full']
  },
  edit: function edit(props) {
    //extraemos los valores de los props
    var _props$attributes = props.attributes,
        tituloHero = _props$attributes.tituloHero,
        textoHero = _props$attributes.textoHero,
        imagenHero = _props$attributes.imagenHero,
        alinearContenido = _props$attributes.alinearContenido,
        setAttributes = props.setAttributes;

    var onChangeTitulo = function onChangeTitulo(nuevoTitulo) {
      setAttributes({
        tituloHero: nuevoTitulo
      });
    };

    var onChangeTexto = function onChangeTexto(nuevoTexto) {
      setAttributes({
        textoHero: nuevoTexto
      });
    };

    var onSeleccionarImagen = function onSeleccionarImagen(nuevoImagen) {
      setAttributes({
        imagenHero: nuevoImagen.sizes.full.url
      });
    };

    var onChangeAlinearContenido = function onChangeAlinearContenido(nuevaAlineacion) {
      setAttributes({
        alinearContenido: nuevaAlineacion
      });
    };

    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      class: "hero-block",
      style: {
        backgroundImage: "url( ".concat(imagenHero, " )")
      }
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(BlockControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(AlignmentToolbar, {
      onChange: onChangeAlinearContenido
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUpload, {
      onSelect: onSeleccionarImagen,
      type: "image",
      value: imagenHero,
      render: function render(_ref) {
        var open = _ref.open;
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(IconButton, {
          onClick: open,
          icon: "format-image",
          showTooltip: "true",
          label: "Cambiar Imagen"
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h1", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText, {
      style: {
        textAlign: alinearContenido
      },
      placeholder: "Agrega un texto",
      onChange: onChangeTitulo,
      value: tituloHero
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText, {
      style: {
        textAlign: alinearContenido
      },
      placeholder: "Agrega Descripcion texto",
      onChange: onChangeTexto,
      value: textoHero
    })));
  },
  save: function save(props) {
    //extraemos los valores de los props
    var _props$attributes2 = props.attributes,
        tituloHero = _props$attributes2.tituloHero,
        textoHero = _props$attributes2.textoHero,
        imagenHero = _props$attributes2.imagenHero,
        alinearContenido = _props$attributes2.alinearContenido;
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      class: "hero-block",
      style: {
        backgroundImage: "url( ".concat(imagenHero, " )"),
        textAlign: alinearContenido
      }
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h1", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
      value: tituloHero
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
      value: textoHero
    })));
  }
});

/***/ }),

/***/ "./src/imagentexto/index.js":
/*!**********************************!*\
  !*** ./src/imagentexto/index.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ga_logo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ga-logo.svg */ "./src/ga-logo.svg");

var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    RichText = _wp$editor.RichText,
    MediaUpload = _wp$editor.MediaUpload,
    URLInputButton = _wp$editor.URLInputButton,
    BlockControls = _wp$editor.BlockControls,
    AlignmentToolbar = _wp$editor.AlignmentToolbar;
var IconButton = wp.components.IconButton; //importamos icono personalizado


/**  
        ---7 Pasos para crear un Bloque en Gutenberg ---
    1.- Importar el componente(s) que utilizarás
    2.- Coloca el componente donde deseas utilizarlo.
    3.- Crea una función que lea los contenidos
    4.- Registra un atributo
    5.- Extraer el contenido desde props
    6.- Guarda el contenido con setAttributes
    7.- Lee los contenidos guardados en save()
*/

registerBlockType('ga/imagentexto', {
  title: 'Ga Imagen',
  icon: {
    src: _ga_logo_svg__WEBPACK_IMPORTED_MODULE_1__["ReactComponent"]
  },
  category: 'gourmet-artist',
  attribute: {
    appTitulo: {
      type: 'string',
      source: 'html',
      selector: '.contenido h1'
    },
    appTexto: {
      type: 'string',
      source: 'html',
      selector: '.contenido p'
    },
    appImagen: {
      type: 'string',
      source: 'attribute',
      attribute: 'src',
      selector: '.imagen img',
      default: _ga_logo_svg__WEBPACK_IMPORTED_MODULE_1__["ReactComponent"]
    },
    urlApp: {
      type: 'string',
      source: 'attribute',
      attribute: 'href'
    },
    alinearContenido: {
      type: 'string',
      default: 'center'
    }
  },
  supports: {
    align: ['wide', 'full']
  },
  styles: [{
    name: 'default',
    label: 'Azul (default)',
    isDefault: true
  }, {
    name: 'verde',
    label: 'Verde'
  }, {
    name: 'rosa',
    label: 'Rosa'
  }],
  edit: function edit(props) {
    //extraemos los valores de los props
    var _props$attributes = props.attributes,
        appTitulo = _props$attributes.appTitulo,
        appTexto = _props$attributes.appTexto,
        appImagen = _props$attributes.appImagen,
        urlApp = _props$attributes.urlApp,
        alinearContenido = _props$attributes.alinearContenido,
        setAttributes = props.setAttributes;

    var onChangeTitulo = function onChangeTitulo(nuevoTitulo) {
      setAttributes({
        appTitulo: nuevoTitulo
      });
    };

    var onChangeTexto = function onChangeTexto(nuevoTexto) {
      setAttributes({
        appTexto: nuevoTexto
      });
    };

    var onSeleccionarImagen = function onSeleccionarImagen(imagen) {
      setAttributes({
        appImagen: imagen.sizes.medium.url
      });
    };

    var onChangeURL = function onChangeURL(nuevaUrl) {
      setAttributes({
        urlApp: nuevaUrl
      });
    };

    var onChangeAlinearContenido = function onChangeAlinearContenido(nuevaAlineacion) {
      setAttributes({
        alinearContenido: nuevaAlineacion
      });
    };

    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(BlockControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(AlignmentToolbar, {
      onChange: onChangeAlinearContenido,
      value: alinearContenido
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "imagen-texto-block"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "contenedor"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "contenido"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h1", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText, {
      placeholder: "Agrega el titulo",
      onChange: onChangeTitulo,
      value: appTitulo,
      style: {
        textAlign: alinearContenido
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText, {
      placeholder: "Agrega la descripci\xF3n",
      onChange: onChangeTexto,
      value: appTexto,
      style: {
        textAlign: alinearContenido
      }
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
      href: urlApp,
      className: "boton"
    }, "Descargar"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(URLInputButton, {
      url: urlApp,
      onChange: onChangeURL
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "imagen"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
      src: appImagen
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUpload, {
      onSelect: onSeleccionarImagen,
      type: "image",
      value: appImagen,
      render: function render(_ref) {
        var open = _ref.open;
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(IconButton, {
          onClick: open,
          icon: "format-image",
          showTooltip: "true",
          label: "Seleccionar Imagen"
        });
      }
    })))));
  },
  save: function save(props) {
    //extraemos los valores de los props
    var _props$attributes2 = props.attributes,
        appTitulo = _props$attributes2.appTitulo,
        appTexto = _props$attributes2.appTexto,
        appImagen = _props$attributes2.appImagen,
        urlApp = _props$attributes2.urlApp,
        alinearContenido = _props$attributes2.alinearContenido;
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "imagen-texto-block"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "contenedor"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "contenido",
      style: "text-align: ".concat(alinearContenido)
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h1", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
      value: appTitulo
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
      value: appTexto
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("a", {
      href: urlApp,
      className: "boton"
    }, "Descargar")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "imagen"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
      src: appImagen
    }))));
  }
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _testimonial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./testimonial */ "./src/testimonial/index.js");
/* harmony import */ var _hero__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hero */ "./src/hero/index.js");
/* harmony import */ var _imagentexto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imagentexto */ "./src/imagentexto/index.js");
/* harmony import */ var _dinamico__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dinamico */ "./src/dinamico/index.js");
//importar los bloques





/***/ }),

/***/ "./src/testimonial/index.js":
/*!**********************************!*\
  !*** ./src/testimonial/index.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ga_logo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ga-logo.svg */ "./src/ga-logo.svg");

var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    RichText = _wp$editor.RichText,
    MediaUpload = _wp$editor.MediaUpload,
    InspectorControls = _wp$editor.InspectorControls,
    ColorPalette = _wp$editor.ColorPalette;
var _wp$components = wp.components,
    IconButton = _wp$components.IconButton,
    PanelBody = _wp$components.PanelBody; //importamos icono personalizado


/**  
        ---7 Pasos para crear un Bloque en Gutenberg ---
    1.- Importar el componente(s) que utilizarás
    2.- Coloca el componente donde deseas utilizarlo.
    3.- Crea una función que lea los contenidos
    4.- Registra un atributo
    5.- Extraer el contenido desde props
    6.- Guarda el contenido con setAttributes
    7.- Lee los contenidos guardados en save()
*/

registerBlockType('ga/testimonial', {
  title: 'Ga Testimonial',
  icon: {
    src: _ga_logo_svg__WEBPACK_IMPORTED_MODULE_1__["ReactComponent"]
  },
  category: 'gourmet-artist',
  attribute: {
    textoTestimonial: {
      type: 'string',
      source: 'html',
      selector: '.testimonial-block blockquote'
    },
    nombreTestimonial: {
      type: 'string',
      source: 'html',
      selector: '.testimonial-info p'
    },
    imagenTestimonial: {
      type: 'string',
      source: 'attribute',
      attribute: 'src',
      selector: '.testimonial-info img',
      default: _ga_logo_svg__WEBPACK_IMPORTED_MODULE_1__["ReactComponent"]
    },
    colorTestimonial: {
      type: 'string'
    }
  },
  edit: function edit(props) {
    //extraemos los valores de los props
    var _props$attributes = props.attributes,
        textoTestimonial = _props$attributes.textoTestimonial,
        nombreTestimonial = _props$attributes.nombreTestimonial,
        imagenTestimonial = _props$attributes.imagenTestimonial,
        colorTestimonial = _props$attributes.colorTestimonial,
        setAttributes = props.setAttributes;

    var onChangeTextoTestimonial = function onChangeTextoTestimonial(nuevoTexto) {
      setAttributes({
        textoTestimonial: nuevoTexto
      });
    };

    var onChangeNombreTestimonial = function onChangeNombreTestimonial(nuevoTestimonial) {
      setAttributes({
        nombreTestimonial: nuevoTestimonial
      });
    };

    var onSeleccionarImagen = function onSeleccionarImagen(imagen) {
      setAttributes({
        imagenTestimonial: imagen.sizes.medium.url
      });
    };

    var onChangeColorTestimonial = function onChangeColorTestimonial(colorNuevo) {
      setAttributes({
        colorTestimonial: colorNuevo
      });
    };

    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, {
      title: 'Opciones de Color'
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "components-base-control"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "components-base-control__field"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("label", {
      className: "components-base-control__label"
    }, "Color de texto y linea"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(ColorPalette, {
      onChange: onChangeColorTestimonial
    }))))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "seccion contenedor"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h1", null, "Testimonial"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "testimonial-block",
      style: {
        borderColor: colorTestimonial
      }
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("blockquote", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText, {
      placeholder: "Agrega un texto del testimonial",
      onChange: onChangeTextoTestimonial,
      value: textoTestimonial
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "testimonial-info"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
      src: imagenTestimonial
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(MediaUpload, {
      onSelect: onSeleccionarImagen,
      type: "image",
      value: imagenTestimonial,
      render: function render(_ref) {
        var open = _ref.open;
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(IconButton, {
          onClick: open,
          icon: "format-image",
          showTooltip: "true",
          label: "Seleccionar Imagen"
        });
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText, {
      placeholder: "Agrega el nombre del testimonial",
      onChange: onChangeNombreTestimonial,
      value: nombreTestimonial,
      style: {
        color: colorTestimonial
      }
    }))))));
  },
  save: function save(props) {
    var _props$attributes2 = props.attributes,
        textoTestimonial = _props$attributes2.textoTestimonial,
        nombreTestimonial = _props$attributes2.nombreTestimonial,
        imagenTestimonial = _props$attributes2.imagenTestimonial,
        colorTestimonial = _props$attributes2.colorTestimonial;
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "seccion contenedor"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h1", null, "Testimonial"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "testimonial-block",
      style: {
        borderColor: colorTestimonial
      }
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("blockquote", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
      value: textoTestimonial
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
      className: "testimonial-info"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("img", {
      src: imagenTestimonial
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
      style: {
        color: colorTestimonial
      }
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(RichText.Content, {
      value: nombreTestimonial
    })))));
  }
});

/***/ }),

/***/ "@wordpress/element":
/*!******************************************!*\
  !*** external {"this":["wp","element"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["element"]; }());

/***/ }),

/***/ "react":
/*!*********************************!*\
  !*** external {"this":"React"} ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["React"]; }());

/***/ })

/******/ });
//# sourceMappingURL=index.js.map