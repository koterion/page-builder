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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/editor.js":
/*!**************************!*\
  !*** ./src/js/editor.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svg */ "./src/js/svg.js");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



window.pageBuilder = function (selector, options) {
  try {
    checkSelector(selector);
  } catch (e) {
    console.error(e.message);
    return false;
  }

  var list = new PageBuilder(selector, options);

  list._init();

  return list;
};

var defaults = {
  tinymce: {
    settings: function settings(className) {
      tinymce.init({
        menubar: false,
        selector: className,
        height: 400,
        plugins: 'link table lists paste',
        toolbar: 'formatselect | table',
        setup: function setup(editor) {
          editor.ui.registry.addContextToolbar('textselection', {
            predicate: function predicate(node) {
              return !editor.selection.isCollapsed();
            },
            items: 'bold italic underline | bullist numlist | alignleft aligncenter alignright',
            position: 'selection',
            scope: 'node'
          });
        }
      });
    }
  }
};

var PageBuilder =
/*#__PURE__*/
function () {
  function PageBuilder(selector, options) {
    var _this2 = this;

    _classCallCheck(this, PageBuilder);

    this.selector = selector.length > 0 ? selector[0] : selector;
    this.className = 'pgBld';
    this.textareaClass = this.className + '-textarea';
    this.textareaEditor = this.className + '-editor-textarea';
    this.textarea = 'div.' + this.textareaClass;
    var customOptions = options || {};
    this.options = {};
    forEachObj(defaults, function (key, value) {
      _this2.options[key] = customOptions.hasOwnProperty(key) ? customOptions[key] : value;
    });
  }

  _createClass(PageBuilder, [{
    key: "_init",
    value: function _init() {
      this._changeSelector();

      this._createInterface();

      this._createMenu();

      this._createBody();

      this._createEditor();

      this._createRow();
    }
  }, {
    key: "_changeSelector",
    value: function _changeSelector() {
      this.value = this.selector.value;
      this.selector.style.display = 'none';
    }
  }, {
    key: "_createInterface",
    value: function _createInterface() {
      this.wrapBlock = this._createEl('div', {
        'class': this.className
      });
      this.selector.parentNode.insertBefore(this.wrapBlock, this.selector);
    }
  }, {
    key: "_createMenu",
    value: function _createMenu() {
      var _this3 = this;

      this.menu = this._createEl('ul', {
        'class': this.className + '-menu'
      });
      this.menuItem = {
        'add': this._createEl('li', {
          'class': this.className + '-menu-item-add'
        }, "".concat(_svg__WEBPACK_IMPORTED_MODULE_0__["default"].plus, " Add row"))
      };
      this.wrapBlock.appendChild(this.menu);
      forEachObj(this.menuItem, function (key, value) {
        _this3.menu.appendChild(value);
      });
    }
  }, {
    key: "_createBody",
    value: function _createBody() {
      this.body = this._createEl('div', {
        'class': this.className + '-body'
      }, this.value);
      this.wrapBlock.appendChild(this.body);
    }
  }, {
    key: "_createEditor",
    value: function _createEditor() {
      var _this = this;

      _this.editor = _this._createEl('div', {
        'class': _this.className + '-editor'
      });

      var block = _this._createEl('div', {
        'class': _this.className + '-editor-block'
      });

      var close = _this._createEl('div', {
        'class': _this.className + '-editor-close',
        'title': 'Close'
      }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].close);

      var save = _this._createEl('div', {
        'class': _this.className + '-editor-save',
        'title': 'Save'
      }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].save);

      _this.editor.appendChild(block);

      block.appendChild(close);
      block.appendChild(save);

      _this._createTextarea(block, _this.textareaEditor);

      _this.wrapBlock.appendChild(_this.editor);

      on(close, 'click', function () {
        closeEditor();
      });
      on(save, 'click', function () {
        var content = closeEditor();
        content.innerHTML = block.querySelector('div.' + _this.textareaEditor).innerHTML;
      });

      function closeEditor() {
        var content = _this.wrapBlock.querySelector('.changing');

        _this.editor.classList.remove('show');

        tinymce.remove('div#' + block.querySelector('div.' + _this.textareaEditor).id);
        return content;
      }
    }
  }, {
    key: "_createRowMenu",
    value: function _createRowMenu(row) {
      var _this4 = this;

      this.rowMenu = this._createEl('div', {
        'class': this.className + '-row-menu'
      });
      var menuItems = {
        'left': {
          'menu': this._createEl('ul'),
          'items': {
            'column': this._createEl('li', {
              'title': 'Add column',
              'data-role': 'addCol'
            }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].column)
          }
        },
        'right': {
          'menu': this._createEl('ul'),
          'items': {
            'delete': this._createEl('li', {
              'title': 'Remove this row',
              'data-role': 'delRow'
            }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].delete)
          }
        }
      };
      forEachObj(menuItems, function (key, value) {
        forEachObj(value.items, function (name, el) {
          el.classList = _this4.className + '-row-menu-' + name;
          value.menu.appendChild(el);
        });
        value.menu.classList = _this4.className + '-row-menu-' + key;

        _this4.rowMenu.appendChild(value.menu);
      });
      row.firstChild ? row.insertBefore(this.rowMenu, row.firstChild) : row.appendChild(this.rowMenu);
    }
  }, {
    key: "_createRow",
    value: function _createRow() {
      var _this5 = this;

      this.rows = this.body.querySelectorAll('div.' + this.className + '-row');
      forEachArr(this.rows, function (el) {
        _this5._createRowMenu(el);

        _this5._connectMenuFunc(el);

        var col = el.querySelector('div.' + _this5.className + '-col');

        if (!el.contains(col)) {
          el.querySelector('div.' + _this5.className + '-content').classList.add(_this5.textareaClass);
        }

        addTiny(_this5.textarea);
      });
      on(this.menuItem.add, 'click', function () {
        var row = _this5._createEl('div', {
          'class': _this5.className + '-row',
          'data-col': 0
        });

        _this5.body.appendChild(row);

        _this5._createRowMenu(row);

        _this5.rows = _this5.body.querySelectorAll('div.' + _this5.className + '-row');

        _this5._connectMenuFunc(row);

        _this5._createTextarea(row, _this5.className + '-content ' + _this5.textareaClass);
      });
    }
  }, {
    key: "_createCol",
    value: function _createCol(el, row) {
      var _this6 = this;

      var _this = this;

      on(el, 'click', function () {
        var num = row.dataset.col;

        if (num < 6) {
          var col = _this6._createEl('div', {
            'class': _this6.className + '-col'
          });

          var del = _this6._createEl('div', {
            'class': _this6.className + '-col-del'
          }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].delete);

          var edit = _this6._createEl('div', {
            'class': _this6.className + '-col-edit'
          }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].edit);

          var content = _this6._createEl('div', {
            'class': _this6.className + '-content'
          });

          col.appendChild(del);
          col.appendChild(edit);
          row.appendChild(col);
          row.dataset.col = row.querySelectorAll('.' + _this6.className + '-col').length;

          if (num === '0') {
            content = row.querySelector(_this.textarea);
            tinymce.remove('div#' + content.id);
            content.classList.remove(_this.textareaClass);
            col.appendChild(content);
            el.click();
          } else {
            col.appendChild(content);
          }

          _this6._removeCol(del, col);

          _this6._editContent(edit, col);
        }
      });
    }
  }, {
    key: "_connectMenuFunc",
    value: function _connectMenuFunc(row) {
      var _this7 = this;

      forEachArr(row.querySelectorAll('div.' + this.className + '-row-menu li'), function (el) {
        if (el.dataset.role === 'delRow') {
          _this7._removeRow(el, row);
        } else if (el.dataset.role === 'addCol') {
          _this7._createCol(el, row);
        }
      });
    }
  }, {
    key: "_removeRow",
    value: function _removeRow(el, row) {
      var _this8 = this;

      on(el, 'click', function () {
        forEachArr(row.querySelectorAll(_this8.textarea), function (el) {
          tinymce.remove('div#' + el.id);
        });
        row.parentElement.removeChild(row);
      });
    }
  }, {
    key: "_removeCol",
    value: function _removeCol(el, column) {
      var _this = this;

      on(el, 'click', function () {
        var parent = column.parentElement;
        parent.removeChild(column);

        if (parent.dataset.col === '2') {
          var col = parent.querySelector('div.' + _this.className + '-col');
          var content = col.querySelector('div.' + _this.className + '-content');
          content.classList.add(_this.textareaClass);
          parent.appendChild(content);
          parent.removeChild(col);
          addTiny(_this.textarea);
        }

        parent.dataset.col = parent.querySelectorAll('.' + this.className).length;
      });
    }
  }, {
    key: "_editContent",
    value: function _editContent(el, col) {
      var _this = this;

      on(el, 'click', function () {
        _this.editor.classList.add('show');

        var content = col.querySelector('div.' + _this.className + '-content');

        var editor = _this.editor.querySelector('div.' + _this.textareaEditor);

        editor.innerHTML = content.innerHTML;
        content.classList.add('changing');
        addTiny('div.' + _this.textareaEditor);
      });
    }
  }, {
    key: "_createTextarea",
    value: function _createTextarea(parent) {
      var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.textareaClass;

      var textarea = this._createEl('div', {
        'class': className
      });

      parent.appendChild(textarea);
      addTiny(this.textarea);
    }
  }, {
    key: "_createEl",
    value: function _createEl(el) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var inner = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var elem = document.createElement(el);
      forEachObj(options, function (key, value) {
        elem.setAttribute(key, value);
      });
      elem.innerHTML = inner;
      return elem;
    }
  }]);

  return PageBuilder;
}();

function addTiny(className) {
  defaults.tinymce.settings(className);
}

function checkSelector(selector) {
  if (selector === undefined || selector.length === 0) {
    throw Error("PageBuilder: Didn't find selector");
  } else if (selector.length > 1) {
    throw Error("PageBuilder: Please use individual selector, not more.\n        You use " + selector.length + " selectors");
  }
}

function forEachObj(obj, callback) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      callback(prop, obj[prop]);
    }
  }
}

function forEachArr(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    callback(arr[i], arr);
  }
}

function on(elem, event, func) {
  if (elem.addEventListener) {
    elem.addEventListener(event, func);
  } else {
    elem.attachEvent('on' + event, func);
  }
} // For IE function closest https://developer.mozilla.org/en-US/docs/Web/API/Element/closest


if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s);
    var i;
    var el = this;

    do {
      i = matches.length;

      while (--i >= 0 && matches.item(i) !== el) {}
    } while (i < 0 && (el = el.parentElement));

    return el;
  };
}

/***/ }),

/***/ "./src/js/svg.js":
/*!***********************!*\
  !*** ./src/js/svg.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  'plus': "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z\"></path></svg>",
  'column': "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64V160h160v256zm224 0H288V160h160v256z\"></path></svg>",
  'delete': "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><path d=\"M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z\"></path></svg>",
  'close': "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 352 512\" ><path d=\"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z\"></path></svg>",
  'save': "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" ><path d=\"M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z\"></path></svg>",
  'edit': "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\" ><path d=\"M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z\"></path></svg>"
});

/***/ }),

/***/ "./src/sass/editor.sass":
/*!******************************!*\
  !*** ./src/sass/editor.sass ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*******************************************************!*\
  !*** multi ./src/js/editor.js ./src/sass/editor.sass ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\Administrator\Desktop\111\Plugins\page-builder\src\js\editor.js */"./src/js/editor.js");
module.exports = __webpack_require__(/*! C:\Users\Administrator\Desktop\111\Plugins\page-builder\src\sass\editor.sass */"./src/sass/editor.sass");


/***/ })

/******/ });