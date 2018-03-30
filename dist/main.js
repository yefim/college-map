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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _req__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./req */ \"./src/req.js\");\n\n\n\n\nwindow.initMap = function() {\n  const center = {\n    lat: 39.5,\n    lng: -98.35\n  };\n\n  const map = new google.maps.Map(document.getElementById('college-map'), {\n    zoom: 4,\n    center: center\n  });\n\n  const infoWindows = [];\n\n  Object(_req__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({url: '/v1/users/me?fields=followedCollegeIds', method: 'get'}).then(function({followedCollegeIds}) {\n    followedCollegeIds.forEach(function(collegeId) {\n      Object(_req__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({url: `/v1/colleges/${collegeId}?fields=amount,loc,name,logo`, method: 'get'}).then(function(college) {\n        const contentString = [\n          '<div style=\"display: flex; flex-direction: column; align-items: center;\">',\n          `<p style=\"font-size: 20px; font-weight: 400;\">${college.name}</p>`,\n          `<img height=\"60\" width=60\" src=\"${college.logo}\" />`,\n          college.amount ? `<p style=\"font-size: 16px;\">You're earning $${college.amount}.</p>` : '',\n          '</div>'\n        ].join('');\n\n        const infoWindow = new google.maps.InfoWindow({\n          content: contentString\n        });\n\n        infoWindows.push(infoWindow);\n\n        const marker = new google.maps.Marker({\n          position: {lat: college.loc[1], lng: college.loc[0]},\n          map: map,\n          animation: google.maps.Animation.DROP\n        });\n\n        marker.addListener('click', function() {\n          infoWindows.forEach(function(i) {\n            i.close();\n          });\n\n          infoWindow.open(map, marker);\n        });\n      });\n    });\n  });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vc3R5bGVzLmNzcydcblxuaW1wb3J0IHJlcSBmcm9tICcuL3JlcSc7XG5cbndpbmRvdy5pbml0TWFwID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGNlbnRlciA9IHtcbiAgICBsYXQ6IDM5LjUsXG4gICAgbG5nOiAtOTguMzVcbiAgfTtcblxuICBjb25zdCBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xsZWdlLW1hcCcpLCB7XG4gICAgem9vbTogNCxcbiAgICBjZW50ZXI6IGNlbnRlclxuICB9KTtcblxuICBjb25zdCBpbmZvV2luZG93cyA9IFtdO1xuXG4gIHJlcSh7dXJsOiAnL3YxL3VzZXJzL21lP2ZpZWxkcz1mb2xsb3dlZENvbGxlZ2VJZHMnLCBtZXRob2Q6ICdnZXQnfSkudGhlbihmdW5jdGlvbih7Zm9sbG93ZWRDb2xsZWdlSWRzfSkge1xuICAgIGZvbGxvd2VkQ29sbGVnZUlkcy5mb3JFYWNoKGZ1bmN0aW9uKGNvbGxlZ2VJZCkge1xuICAgICAgcmVxKHt1cmw6IGAvdjEvY29sbGVnZXMvJHtjb2xsZWdlSWR9P2ZpZWxkcz1hbW91bnQsbG9jLG5hbWUsbG9nb2AsIG1ldGhvZDogJ2dldCd9KS50aGVuKGZ1bmN0aW9uKGNvbGxlZ2UpIHtcbiAgICAgICAgY29uc3QgY29udGVudFN0cmluZyA9IFtcbiAgICAgICAgICAnPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7XCI+JyxcbiAgICAgICAgICBgPHAgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGZvbnQtd2VpZ2h0OiA0MDA7XCI+JHtjb2xsZWdlLm5hbWV9PC9wPmAsXG4gICAgICAgICAgYDxpbWcgaGVpZ2h0PVwiNjBcIiB3aWR0aD02MFwiIHNyYz1cIiR7Y29sbGVnZS5sb2dvfVwiIC8+YCxcbiAgICAgICAgICBjb2xsZWdlLmFtb3VudCA/IGA8cCBzdHlsZT1cImZvbnQtc2l6ZTogMTZweDtcIj5Zb3UncmUgZWFybmluZyAkJHtjb2xsZWdlLmFtb3VudH0uPC9wPmAgOiAnJyxcbiAgICAgICAgICAnPC9kaXY+J1xuICAgICAgICBdLmpvaW4oJycpO1xuXG4gICAgICAgIGNvbnN0IGluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XG4gICAgICAgICAgY29udGVudDogY29udGVudFN0cmluZ1xuICAgICAgICB9KTtcblxuICAgICAgICBpbmZvV2luZG93cy5wdXNoKGluZm9XaW5kb3cpO1xuXG4gICAgICAgIGNvbnN0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgIHBvc2l0aW9uOiB7bGF0OiBjb2xsZWdlLmxvY1sxXSwgbG5nOiBjb2xsZWdlLmxvY1swXX0sXG4gICAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgICAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uRFJPUFxuICAgICAgICB9KTtcblxuICAgICAgICBtYXJrZXIuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaW5mb1dpbmRvd3MuZm9yRWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICBpLmNsb3NlKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpbmZvV2luZG93Lm9wZW4obWFwLCBtYXJrZXIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/req.js":
/*!********************!*\
  !*** ./src/req.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n// libraries\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (({url, method, data}) => {\n  let params = {dataType: 'json'};\n\n  switch (method.toLowerCase()) {\n    case 'patch':\n    case 'post':\n    case 'put':\n      params.data = JSON.stringify(data);\n      params.contentType = 'application/json';\n      break;\n    default:\n      params.data = data;\n      break;\n  }\n\n  return new Promise((resolve, reject) => {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({\n      url,\n      method,\n      ...params\n    }).done((res) => {\n      resolve(res);\n    }).fail((res) => {\n      reject(res.responseJSON);\n    });\n  });\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVxLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3JlcS5qcz9hMDZmIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGxpYnJhcmllc1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgKHt1cmwsIG1ldGhvZCwgZGF0YX0pID0+IHtcbiAgbGV0IHBhcmFtcyA9IHtkYXRhVHlwZTogJ2pzb24nfTtcblxuICBzd2l0Y2ggKG1ldGhvZC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAncGF0Y2gnOlxuICAgIGNhc2UgJ3Bvc3QnOlxuICAgIGNhc2UgJ3B1dCc6XG4gICAgICBwYXJhbXMuZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgcGFyYW1zLmNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHBhcmFtcy5kYXRhID0gZGF0YTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsLFxuICAgICAgbWV0aG9kLFxuICAgICAgLi4ucGFyYW1zXG4gICAgfSkuZG9uZSgocmVzKSA9PiB7XG4gICAgICByZXNvbHZlKHJlcyk7XG4gICAgfSkuZmFpbCgocmVzKSA9PiB7XG4gICAgICByZWplY3QocmVzLnJlc3BvbnNlSlNPTik7XG4gICAgfSk7XG4gIH0pO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/req.js\n");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3R5bGVzLmNzcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zdHlsZXMuY3NzP2RiMWUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/styles.css\n");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = jQuery;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianF1ZXJ5LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCI/Y2QwYyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///jquery\n");

/***/ })

/******/ });