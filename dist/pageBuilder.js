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

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/js/pageBuilder.js":
/*!*******************************!*\
  !*** ./src/js/pageBuilder.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svg */ "./src/js/svg.js");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var id = 0;
var pageBuilder = {
  editors: {},
  create: function create(selector, options) {
    try {
      checkSelector(selector);
    } catch (e) {
      console.error(e.message);
      return false;
    }

    var list = new PageBuilder(selector, options);

    list._init();

    this.editors[list.className + '_' + id] = list;
    id += id;
    return list;
  },
  getContent: function getContent(id) {
    return this.editors[id]._getContent();
  }
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
    },
    setContent: function setContent(editor, content) {
      tinymce.get(editor.id).setContent(content);
    },
    getContent: function getContent(editor) {
      return tinymce.get(editor.id).getContent();
    }
  },
  bgClasses: 'first, sec, third'
};

var PageBuilder =
/*#__PURE__*/
function () {
  function PageBuilder(selector, options) {
    var _this2 = this;

    _classCallCheck(this, PageBuilder);

    this.selector = selector.length > 0 ? selector[0] : selector;
    this.className = 'pgBld';
    this.textareaEditor = this.className + '-editor-textarea';
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

      this._createBody();

      this._createMenu();

      this._createEditor();

      this._createRowSettings();

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
        'id': this.className + '_' + id,
        'class': this.className
      });
      this.selector.parentNode.insertBefore(this.wrapBlock, this.selector);
    }
  }, {
    key: "_createMenu",
    value: function _createMenu() {
      var _this3 = this;

      this.menu = this._createEl('div', {
        'class': this.className + '-menu'
      });
      this.menuItem = {
        'add': this._createEl('div', {
          'class': this.className + '-menu-item-add'
        }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].plus)
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

      var className = _this.className + '-editor';
      _this.editor = _this._createEl('div', {
        'class': className
      });
      var _ref = [_this._createEl('div', {
        'class': className + '-block'
      }), _this._createEl('div', {
        'class': className + '-close',
        'title': 'Close'
      }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].close), _this._createEl('div', {
        'class': className + '-save',
        'title': 'Save'
      }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].save), _this._createEl('div', {
        'class': _this.textareaEditor
      })],
          block = _ref[0],
          close = _ref[1],
          save = _ref[2],
          textarea = _ref[3];

      _this.editor.appendChild(block);

      forEachArr([close, save, textarea], function (el) {
        block.appendChild(el);
      });

      _this.wrapBlock.appendChild(_this.editor);

      addTiny('div.' + this.textareaEditor);
      on(close, 'click', function () {
        closeEditor();
      });
      on(save, 'click', function () {
        var content = closeEditor();
        content.innerHTML = _this.options.tinymce.getContent(block.querySelector('div.' + _this.textareaEditor));
      });

      function closeEditor() {
        var content = _this.wrapBlock.querySelector('div.' + _this.className + '-content.changing');

        _this.editor.classList.remove('show');

        content.classList.remove('changing');
        return content;
      }
    }
  }, {
    key: "_createRowSettings",
    value: function _createRowSettings() {
      var _this = this;

      var className = _this.className + '-settings';
      _this.rowSettings = _this._createEl('div', {
        'class': className
      });
      var _ref2 = [_this._createEl('div', {
        'class': className + '-block'
      }), _this._createEl('div', {
        'class': className + '-close',
        'title': 'Close'
      }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].close), _this._createEl('div', {
        'class': className + '-save',
        'title': 'Save'
      }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].save), _this._createEl('div', {
        'class': className + '-bgRow'
      }), _this._createEl('h3', {
        'class': className + '-h3'
      }, "Background style <span>clear formatting</span>"), _this._createEl('h3', {
        'class': className + '-h3'
      }, "Number of columns (1-6): <input type=\"text\">")],
          block = _ref2[0],
          close = _ref2[1],
          save = _ref2[2],
          bgRow = _ref2[3],
          text = _ref2[4],
          column = _ref2[5];
      on(text.lastChild, 'click', function () {
        removeActive();
      });
      forEachArr(_this.options.bgClasses.split(', '), function (el) {
        var bg = _this._createEl('div', {
          'class': className + '-bgCol ' + el,
          'data-class': el
        });

        bgRow.appendChild(bg);
        on(bg, 'click', function () {
          removeActive();
          bg.classList.add('active');
        });
      });

      _this.rowSettings.appendChild(block);

      forEachArr([close, save, text, bgRow, column], function (el) {
        block.appendChild(el);
      });

      _this.wrapBlock.appendChild(_this.rowSettings);

      var input = column.querySelector('input');
      on(input, 'keypress', function (event) {
        if (!(event.key.search(/[^1-6]/ig) === -1)) {
          event.preventDefault();
        } else {
          this.dataset.change = true;

          if (this.value + '' + event.key > 6) {
            this.value = event.key;
            event.preventDefault();
          }
        }
      });
      on(close, 'click', function () {
        closeSettings();
        removeActive();
      });
      on(save, 'click', function () {
        var row = closeSettings();
        var bg = bgRow.querySelector('div.active');
        row.className = _this.className + '-row';
        if (bg) row.classList.add(bg.dataset.class);

        if (input.dataset.change && input.value > 0) {
          row.dataset.setCol = input.value;
        }

        removeActive();
      });

      function closeSettings() {
        var row = _this.wrapBlock.querySelector('div.' + _this.className + '-row.changing');

        row.classList.remove('changing');

        _this.rowSettings.classList.remove('show');

        return row;
      }

      function removeActive() {
        forEachArr(bgRow.querySelectorAll('div.' + className + '-bgCol'), function (el) {
          el.classList.remove('active');
        });
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
            'edit': this._createEl('li', {
              'title': 'Edit row style',
              'data-role': 'editRow'
            }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].edit),
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

        var num = el.dataset.col;

        _this5._connectMenuFunc(el);

        if (num < 1) {
          _this5._createCol(el, true);
        } else {
          forEachArr(el.querySelectorAll('div.' + _this5.className + '-col'), function (col) {
            _this5._addColFunc(col);
          });
        }
      });
      on(this.menuItem.add, 'click', function () {
        var row = _this5._createEl('div', {
          'class': _this5.className + '-row',
          'data-col': 0
        });

        _this5.body.appendChild(row);

        _this5._createRowMenu(row);

        _this5._createCol(row);

        _this5.rows = _this5.body.querySelectorAll('div.' + _this5.className + '-row');

        _this5._connectMenuFunc(row);
      });
    }
  }, {
    key: "_connectMenuFunc",
    value: function _connectMenuFunc(row) {
      var _this6 = this;

      forEachArr(row.querySelectorAll('div.' + this.className + '-row-menu li'), function (el) {
        if (el.dataset.role === 'delRow') {
          _this6._removeRow(el, row);
        } else if (el.dataset.role === 'addCol') {
          _this6._addCol(el, row);
        } else if (el.dataset.role === 'editRow') {
          _this6._showSetting(el, row);
        }
      });
    }
  }, {
    key: "_showSetting",
    value: function _showSetting(el, row) {
      var _this7 = this;

      on(el, 'click', function () {
        row.classList.add('changing');

        _this7.rowSettings.classList.add('show');

        forEachArr(row.classList, function (el) {
          if (el !== 'changing' && el !== _this7.className + '-row') {
            _this7.rowSettings.querySelector('div.' + el).classList.add('active');
          }
        });
        _this7.rowSettings.querySelector('input').value = row.dataset.setCol ? row.dataset.setCol : row.dataset.col;
      });
    }
  }, {
    key: "_createCol",
    value: function _createCol(row) {
      var exists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var col = this._createEl('div', {
        'class': this.className + '-col'
      });

      this._addColFunc(col);

      var content = exists && row.querySelector('div.' + this.className + '-content') ? row.querySelector('div.' + this.className + '-content') : this._createEl('div', {
        'class': this.className + '-content'
      });
      col.appendChild(content);
      row.appendChild(col);
      var num = row.querySelectorAll('.' + this.className + '-col').length;
      row.dataset.col = num < 7 ? num : 6;
    }
  }, {
    key: "_addColFunc",
    value: function _addColFunc(col) {
      var del = this._createEl('div', {
        'class': this.className + '-col-del'
      }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].delete);

      var edit = this._createEl('div', {
        'class': this.className + '-col-edit'
      }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].edit);

      col.appendChild(del);
      col.appendChild(edit);

      this._removeCol(del, col);

      this._editContent(edit, col);
    }
  }, {
    key: "_addCol",
    value: function _addCol(el, row) {
      var _this8 = this;

      on(el, 'click', function () {
        _this8._createCol(row);
      });
    }
  }, {
    key: "_removeRow",
    value: function _removeRow(el, row) {
      on(el, 'click', function () {
        row.parentElement.removeChild(row);
      });
    }
  }, {
    key: "_removeCol",
    value: function _removeCol(el, column) {
      var _this9 = this;

      on(el, 'click', function () {
        var parent = column.parentElement;
        parent.removeChild(column);
        var num = parent.querySelectorAll('.' + _this9.className + '-col').length;
        parent.dataset.col = num < 7 ? num : 6;
      });
    }
  }, {
    key: "_editContent",
    value: function _editContent(el, col) {
      var _this10 = this;

      on(el, 'click', function () {
        _this10.editor.classList.add('show');

        var content = col.querySelector('div.' + _this10.className + '-content');

        var editor = _this10.editor.querySelector('div.' + _this10.textareaEditor);

        editor.innerHTML = content.innerHTML;

        _this10.options.tinymce.setContent(editor, content.innerHTML);

        content.classList.add('changing');
      });
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
  }, {
    key: "_getContent",
    value: function _getContent() {
      var _this11 = this;

      var html = this.body.cloneNode(true);
      var rows = html.querySelectorAll('div.' + this.className + '-row');
      forEachArr(rows, function (row) {
        var menu = row.querySelector('div.' + _this11.className + '-row-menu');
        row.removeChild(menu);
        var cols = row.querySelectorAll('div.' + _this11.className + '-col');

        if (cols.length > 1) {
          forEachArr(cols, function (col) {
            var del = col.querySelector('div.' + _this11.className + '-col-del');
            var edit = col.querySelector('div.' + _this11.className + '-col-edit');
            var content = col.querySelector('div.' + _this11.className + '-content');
            content.removeAttribute('id');
            content.removeAttribute('style');
            content.removeAttribute('aria-hidden');
            col.removeChild(del);
            col.removeChild(edit);
          });
        } else if (cols.length === 1) {
          cols = cols[0];
          var content = cols.querySelector('div.' + _this11.className + '-content');
          content.removeAttribute('id');
          content.removeAttribute('style');
          content.removeAttribute('aria-hidden');
          cols.parentNode.dataset.col = 0;
          cols.parentNode.insertBefore(content, cols);
          cols.parentNode.removeChild(cols);
        } else {
          row.parentNode.removeChild(row);
        }
      });
      return html.innerHTML;
    }
  }]);

  return PageBuilder;
}();

function addTiny(className) {
  defaults.tinymce.settings(className);
}

function checkSelector(selector) {
  if (typeof tinymce === 'undefined') {
    throw Error("PageBuilder: Didn't find tinymce. Please connect tinymce.");
  }

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
}

if (typeof window === 'undefined') {
  global.pageBuilder = pageBuilder;
} else {
  window.pageBuilder = pageBuilder;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

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

/***/ "./src/sass/pageBuilder.sass":
/*!***********************************!*\
  !*** ./src/sass/pageBuilder.sass ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*****************************************************************!*\
  !*** multi ./src/js/pageBuilder.js ./src/sass/pageBuilder.sass ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\Administrator\Desktop\111\Plugins\page-builder\src\js\pageBuilder.js */"./src/js/pageBuilder.js");
module.exports = __webpack_require__(/*! C:\Users\Administrator\Desktop\111\Plugins\page-builder\src\sass\pageBuilder.sass */"./src/sass/pageBuilder.sass");


/***/ })

/******/ });