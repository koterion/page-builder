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

      this._createRow();

      this._clickDoc();
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
        'add': this._createEl('button', {
          'class': this.className + '-menu-item-add'
        }, "".concat(_svg__WEBPACK_IMPORTED_MODULE_0__["default"].plus, " <span>Add block</span>"))
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
        'class': className + '-footer'
      }), _this._createEl('h3', {
        'class': className + '-h3'
      }, "Edit content"), _this._createEl('button', {
        'class': className + '-close',
        'title': 'Close'
      }, "".concat(_svg__WEBPACK_IMPORTED_MODULE_0__["default"].close, " <span>Exit (without saving changes)</span>")), _this._createEl('button', {
        'class': className + '-save',
        'title': 'Save'
      }, "".concat(_svg__WEBPACK_IMPORTED_MODULE_0__["default"].save, " <span>Save changes</span>")), _this._createEl('div', {
        'class': _this.textareaEditor
      })],
          block = _ref[0],
          footer = _ref[1],
          title = _ref[2],
          close = _ref[3],
          save = _ref[4],
          textarea = _ref[5];

      _this.editor.appendChild(block);

      footer.appendChild(close);
      footer.appendChild(save);
      forEachArr([title, textarea, footer], function (el) {
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
    value: function _createRowSettings(row) {
      var _this4 = this;

      var _this = this;

      var className = _this.className + '-settings';

      var rowSettings = _this._createEl('div', {
        'class': className
      });

      var _ref2 = [_this._createEl('div', {
        'class': className + '-bgRow'
      }), _this._createEl('div', {
        'class': className + '-column'
      }), _this._createEl('div', {
        'class': className + '-footer'
      }), _this._createEl('button', {
        'class': className + '-close',
        'title': 'Close'
      }, "".concat(_svg__WEBPACK_IMPORTED_MODULE_0__["default"].close, " <span>Exit (without saving changes)</span>")), _this._createEl('button', {
        'class': className + '-save',
        'title': 'Save'
      }, "".concat(_svg__WEBPACK_IMPORTED_MODULE_0__["default"].save, " <span>Save changes</span>")), _this._createEl('h3', {
        'class': className + '-h3'
      }, "Background style"), _this._createEl('h3', {
        'class': className + '-h3'
      }, "Number of columns in a row")],
          bgRow = _ref2[0],
          column = _ref2[1],
          footer = _ref2[2],
          close = _ref2[3],
          save = _ref2[4],
          bgText = _ref2[5],
          colText = _ref2[6];
      bgRow.appendChild(bgText);
      column.appendChild(colText);
      footer.appendChild(close);
      footer.appendChild(save);
      forEachArr(('def, ' + _this.options.bgClasses).split(', '), function (el) {
        var bg = _this._createEl('div', {
          'class': className + '-bgCol ' + el,
          'data-class': el
        });

        if (el === 'def') bg.innerHTML = _svg__WEBPACK_IMPORTED_MODULE_0__["default"].close;
        bgRow.appendChild(bg);
        on(bg, 'click', function () {
          removeActive(bgRow.querySelector('.active'));
          bg.classList.add('active');
        });
      });
      forEachArr([bgRow, column, footer], function (el) {
        rowSettings.appendChild(el);
      });
      forEachObj(_svg__WEBPACK_IMPORTED_MODULE_0__["default"].columns, function (key, value) {
        var col = _this4._createEl('div', {
          'data-col': +key + 1
        }, "".concat(value, " <span>").concat(+key + 1, "</span>"));

        on(col, 'click', function () {
          removeActive(column.querySelector('.active'));
          col.classList.add('active');
        });
        column.appendChild(col);
      });
      row.appendChild(rowSettings);
      on(close, 'click', function () {
        var row = closeSettings();
        var bgItem = row.querySelector('div.' + className + '-bgCol.active');
        var colItem = row.querySelector('div[data-col].active');
        if (bgItem) bgItem.classList.remove('active');
        if (colItem) colItem.classList.remove('active');
      });
      on(save, 'click', function () {
        var row = closeSettings();
        var bg = bgRow.querySelector('.active');
        var col = column.querySelector('.active');
        row.className = _this.className + '-row';
        if (bg && bg.dataset.class !== 'def') row.classList.add(bg.dataset.class);
        if (col) row.dataset.col = col.dataset.col;
      });

      function closeSettings() {
        var row = _this.wrapBlock.querySelector('div.' + _this.className + '-row.changing');

        row.classList.remove('changing');
        row.removeAttribute('data-action');

        _this.body.classList.remove('editing');

        return row;
      }

      function removeActive(selector) {
        if (selector) {
          selector.classList.remove('active');
        }
      }
    }
  }, {
    key: "_createRowMenu",
    value: function _createRowMenu(row) {
      var className = this.className + '-row-menu';
      this.rowMenu = this._createEl('div', {
        'class': className
      });

      var settings = this._createEl('button', {
        'class': className + '-settings',
        'title': 'Settings for row',
        'data-role': 'settingRow'
      }, "".concat(_svg__WEBPACK_IMPORTED_MODULE_0__["default"].setting, " <span>Settings</span>"));

      var menu = {
        'block': this._createEl('div', {
          'class': className + '-block'
        }),
        'buttons': {
          'edit': this._createEl('button', {
            'title': 'Edit row style',
            'data-role': 'editRow'
          }, "".concat(_svg__WEBPACK_IMPORTED_MODULE_0__["default"].edit, " <span>Edit</span>")),
          'column': this._createEl('button', {
            'title': 'Add column',
            'data-role': 'addCol'
          }, "".concat(_svg__WEBPACK_IMPORTED_MODULE_0__["default"].column, " <span>Add column</span>")),
          'delete': this._createEl('button', {
            'title': 'Remove this row',
            'data-role': 'delRow'
          }, "".concat(_svg__WEBPACK_IMPORTED_MODULE_0__["default"].delete, " <span>Remove</span>"))
        }
      };
      forEachObj(menu.buttons, function (name, el) {
        el.classList = className + '-' + name;
        menu.block.appendChild(el);
      });
      this.rowMenu.appendChild(menu.block);
      this.rowMenu.appendChild(settings);
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

        _this5._createRowSettings(el);

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

        _this5._createRowSettings(row);

        _this5._createCol(row);

        _this5.rows = _this5.body.querySelectorAll('div.' + _this5.className + '-row');

        _this5._connectMenuFunc(row);
      });
    }
  }, {
    key: "_connectMenuFunc",
    value: function _connectMenuFunc(row) {
      var _this6 = this;

      forEachArr(row.querySelectorAll('div.' + this.className + '-row-menu button'), function (el) {
        if (el.dataset.role === 'delRow') {
          _this6._removeRow(el, row);
        } else if (el.dataset.role === 'addCol') {
          _this6._addCol(el, row);
        } else if (el.dataset.role === 'editRow') {
          _this6._editRow(el, row);
        } else if (el.dataset.role === 'settingRow') {
          _this6._openSetting(el, row);
        }
      });
    }
  }, {
    key: "_openSetting",
    value: function _openSetting(el, row) {
      var _this7 = this;

      on(el, 'click', function () {
        _this7.body.classList.add('editing');

        forEachArr(_this7.rows, function (el) {
          el.classList.remove('changing');
        });
        row.classList.add('changing');
      });
    }
  }, {
    key: "_editRow",
    value: function _editRow(el, row) {
      var _this8 = this;

      on(el, 'click', function () {
        row.dataset.action = 'edit';
        var settings = row.querySelector('div.' + _this8.className + '-settings');
        var col = row.dataset.setCol ? row.dataset.setCol : row.dataset.col;
        var bgCol = false;
        forEachArr(settings.querySelectorAll('div.' + _this8.className + '-settings-bgCol, div[data-col]'), function (el) {
          el.classList.remove('active');
        });
        forEachArr(row.classList, function (el) {
          if (el !== 'changing' && el !== _this8.className + '-row') {
            settings.querySelector('div.' + el).classList.add('active');
            bgCol = true;
          }
        });

        if (!bgCol) {
          settings.querySelector('div.' + _this8.className + '-settings-bgCol.def').classList.add('active');
        }

        settings.querySelector('div[data-col = "' + col + '"]').classList.add('active');
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
      var del = this._createEl('button', {
        'class': this.className + '-col-del',
        'title': 'Remove column'
      }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].delete);

      var edit = this._createEl('button', {
        'class': this.className + '-col-edit',
        'title': 'Edit column'
      }, _svg__WEBPACK_IMPORTED_MODULE_0__["default"].edit);

      col.appendChild(del);
      col.appendChild(edit);

      this._removeCol(del, col);

      this._editContent(edit, col);
    }
  }, {
    key: "_addCol",
    value: function _addCol(el, row) {
      var _this9 = this;

      on(el, 'click', function () {
        _this9._createCol(row);
      });
    }
  }, {
    key: "_removeRow",
    value: function _removeRow(el, row) {
      var _this10 = this;

      on(el, 'click', function () {
        _this10.body.classList.remove('editing');

        row.parentElement.removeChild(row);
      });
    }
  }, {
    key: "_removeCol",
    value: function _removeCol(el, column) {
      var _this11 = this;

      on(el, 'click', function () {
        var parent = column.parentElement;
        parent.removeChild(column);
        var num = parent.querySelectorAll('.' + _this11.className + '-col').length;
        parent.dataset.col = num < 7 ? num : 6;
      });
    }
  }, {
    key: "_editContent",
    value: function _editContent(el, col) {
      var _this12 = this;

      on(el, 'click', function () {
        _this12.editor.classList.add('show');

        var content = col.querySelector('div.' + _this12.className + '-content');

        var editor = _this12.editor.querySelector('div.' + _this12.textareaEditor);

        editor.innerHTML = content.innerHTML;

        _this12.options.tinymce.setContent(editor, content.innerHTML);

        content.classList.add('changing');
      });
    }
  }, {
    key: "_clickDoc",
    value: function _clickDoc() {
      var _this13 = this;

      on(document, 'mouseup', function (event) {
        var block = _this13.wrapBlock.querySelector('.editing');

        if (block) {
          var row = _this13.body.querySelector('.changing');

          if (!row.contains(event.target)) {
            row.classList.remove('changing');
            row.removeAttribute('data-action');
            block.classList.remove('editing');
          }
        }
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
      var _this14 = this;

      var html = this.body.cloneNode(true);
      var rows = html.querySelectorAll('div.' + this.className + '-row');
      forEachArr(rows, function (row) {
        var menu = row.querySelector('div.' + _this14.className + '-row-menu');
        var settings = row.querySelector('div.' + _this14.className + '-settings');
        row.removeChild(menu);
        row.removeChild(settings);
        var cols = row.querySelectorAll('div.' + _this14.className + '-col');

        if (cols.length > 1) {
          forEachArr(cols, function (col) {
            var del = col.querySelector('.' + _this14.className + '-col-del');
            var edit = col.querySelector('.' + _this14.className + '-col-edit');
            var content = col.querySelector('.' + _this14.className + '-content');
            delAttr(content, ['id', 'style', 'aria-hidden']);
            col.removeChild(del);
            col.removeChild(edit);
          });
        } else if (cols.length === 1) {
          cols = cols[0];
          var content = cols.querySelector('div.' + _this14.className + '-content');
          delAttr(content, ['id', 'style', 'aria-hidden']);
          cols.parentNode.dataset.col = 0;
          cols.parentNode.insertBefore(content, cols);
          cols.parentNode.removeChild(cols);
        } else {
          row.parentNode.removeChild(row);
        }
      });

      function delAttr(el, attr) {
        forEachArr(attr, function (value) {
          el.removeAttribute(value);
        });
      }

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
  'plus': "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 52 52\"><path d=\"M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26 S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z\"/><path d=\"M38.5,25H27V14c0-0.553-0.448-1-1-1s-1,0.447-1,1v11H13.5c-0.552,0-1,0.447-1,1s0.448,1,1,1H25v12c0,0.553,0.448,1,1,1 s1-0.447,1-1V27h11.5c0.552,0,1-0.447,1-1S39.052,25,38.5,25z\"/></svg>",
  'setting': "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 54 54\"><path d=\"M53.188,23.518l-3.128-0.602c-1.842-0.354-3.351-1.607-4.035-3.354c-0.686-1.745-0.433-3.69,0.677-5.203l1.964-2.679 c0.292-0.397,0.249-0.949-0.1-1.298l-4.242-4.242c-0.339-0.339-0.871-0.39-1.268-0.121l-2.638,1.786 c-1.552,1.052-3.505,1.231-5.224,0.482c-1.719-0.75-2.916-2.305-3.201-4.158l-0.505-3.282C31.413,0.36,30.994,0,30.5,0h-6 c-0.479,0-0.892,0.34-0.982,0.812l-0.777,4.04c-0.347,1.801-1.565,3.296-3.26,3.997c-1.694,0.704-3.613,0.507-5.131-0.521 L10.944,6.02c-0.397-0.268-0.929-0.218-1.268,0.121l-4.243,4.242c-0.349,0.349-0.391,0.9-0.1,1.299l1.964,2.679 c1.109,1.512,1.362,3.457,0.677,5.203c-0.686,1.745-2.194,2.999-4.036,3.353l-3.128,0.602C0.34,23.608,0,24.021,0,24.5v6 c0,0.493,0.36,0.913,0.848,0.988l3.283,0.505c1.853,0.285,3.408,1.481,4.157,3.2c0.75,1.72,0.57,3.673-0.482,5.226L6.02,43.057 c-0.269,0.396-0.218,0.929,0.121,1.268l4.242,4.242c0.349,0.348,0.899,0.393,1.298,0.1l2.679-1.964 c1.512-1.109,3.457-1.365,5.202-0.677c1.746,0.685,3,2.193,3.354,4.035l0.602,3.128C23.608,53.66,24.021,54,24.5,54h6 c0.494,0,0.914-0.36,0.988-0.848l0.355-2.309c0.292-1.896,1.523-3.465,3.294-4.198c1.771-0.73,3.751-0.495,5.297,0.64l1.884,1.381 c0.399,0.293,0.95,0.248,1.298-0.1l4.242-4.242c0.339-0.339,0.39-0.871,0.121-1.268l-1.786-2.638 c-1.052-1.553-1.232-3.506-0.482-5.225c0.75-1.72,2.304-2.916,4.158-3.201l3.282-0.505C53.64,31.413,54,30.993,54,30.5v-6 C54,24.021,53.66,23.608,53.188,23.518z M52,29.642l-2.435,0.375c-2.535,0.39-4.661,2.026-5.687,4.378 c-1.025,2.351-0.779,5.022,0.66,7.146l1.323,1.954l-3.052,3.052l-1.192-0.874c-2.115-1.551-4.822-1.875-7.246-0.874 c-2.422,1.004-4.107,3.149-4.505,5.741L29.642,52h-4.316l-0.446-2.316c-0.484-2.52-2.2-4.583-4.588-5.521 c-2.385-0.937-5.047-0.589-7.115,0.926l-1.987,1.457l-3.052-3.052l1.324-1.954c1.438-2.123,1.685-4.795,0.659-7.146 c-1.026-2.351-3.152-3.987-5.687-4.377L2,29.642v-4.315l2.317-0.445c2.519-0.484,4.582-2.199,5.52-4.587 c0.937-2.388,0.591-5.048-0.926-7.117L7.454,11.19l3.052-3.052l2.723,1.845c2.077,1.407,4.701,1.675,7.018,0.713 c2.317-0.96,3.984-3.004,4.458-5.468L25.326,2h4.316l0.375,2.435c0.39,2.535,2.027,4.661,4.378,5.687 c2.351,1.026,5.022,0.778,7.146-0.659l1.954-1.323l3.052,3.052l-1.457,1.986c-1.517,2.068-1.863,4.729-0.925,7.117 c0.937,2.388,3,4.103,5.52,4.587L52,25.326V29.642z\"/><path d=\"M27.5,17C21.71,17,17,21.71,17,27.5S21.71,38,27.5,38S38,33.29,38,27.5S33.29,17,27.5,17z M27.5,36 c-4.687,0-8.5-3.813-8.5-8.5s3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5S32.187,36,27.5,36z\"/><path d=\"M27.5,22c-3.033,0-5.5,2.468-5.5,5.5s2.467,5.5,5.5,5.5s5.5-2.468,5.5-5.5S30.533,22,27.5,22z M27.5,31 c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S29.43,31,27.5,31z\"/></svg>",
  'column': "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 384\"><path d=\"M0,0v80v32v272h176h32h176V112V80V0H0z M184,366H21.5V100.5H184V366z M362.5,366H203V100.5h159.5V366z M362.5,80H208h-32 H21.5V21.5h341V80z\"/><line x1=\"280.1\" y1=\"165.3\" x2=\"280.1\" y2=\"275.8\"/><line x1=\"335.3\" y1=\"220.5\" x2=\"224.8\" y2=\"220.5\"/></svg>",
  'delete': "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M465.423,48.241h-137.61V23.955C327.813,10.746,317.082,0,303.893,0h-95.785c-13.19,0-23.92,10.746-23.92,23.955V48.24 H46.577c-6.655,0-12.049,5.394-12.049,12.049c0,6.655,5.394,12.049,12.049,12.049h22.332l15.228,396.396 C85.069,492.995,104.818,512,129.099,512h253.804c24.281,0,44.03-19.006,44.96-43.267l15.228-396.396h22.332 c6.653,0,12.049-5.394,12.049-12.049C477.472,53.635,472.078,48.241,465.423,48.241z M208.285,24.097h95.43v24.143h-95.43V24.097z M403.784,467.809c-0.433,11.268-9.605,20.094-20.882,20.094H129.099c-11.276,0-20.448-8.827-20.882-20.095L93.025,72.338h325.952 L403.784,467.809z\"/><path d=\"M182.63,181.571c-0.127-6.575-5.494-11.817-12.042-11.817c-0.078,0-0.158,0-0.236,0.002 c-6.652,0.128-11.943,5.626-11.815,12.278l3.781,196.634c0.126,6.575,5.495,11.817,12.042,11.817c0.078,0,0.158,0,0.236-0.002 c6.653-0.128,11.943-5.624,11.815-12.278L182.63,181.571z\"/><path d=\"M255.998,169.753c-6.654,0-12.049,5.394-12.049,12.049v196.634c0,6.654,5.394,12.049,12.049,12.049 c6.655,0,12.049-5.394,12.049-12.049V181.802C268.047,175.148,262.653,169.753,255.998,169.753z\"/><path d=\"M341.645,169.756c-6.628-0.147-12.151,5.162-12.278,11.815l-3.781,196.634c-0.129,6.653,5.162,12.15,11.815,12.278 c0.078,0.001,0.158,0.002,0.236,0.002c6.546,0,11.916-5.244,12.042-11.817l3.781-196.634 C353.588,175.38,348.299,169.883,341.645,169.756z\"/></svg>",
  'close': "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"55 50 180 180\"><line class=\"st0\" x1=\"59.8\" y1=\"53.5\" x2=\"231.3\" y2=\"225\"/><line class=\"st0\" x1=\"231.3\" y1=\"53.5\" x2=\"59.8\" y2=\"225\"/></svg>",
  'save': "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 49 49\"><path d=\"M39.914,0H37.5h-28h-9v49h7h33h8V8.586L39.914,0z M35.5,2v14h-24V2H35.5z M9.5,47V28h29v19H9.5z M46.5,47h-6V26h-33v21h-5 V2h7v16h28V2h1.586L46.5,9.414V47z\"/><path d=\"M13.5,33h7c0.553,0,1-0.447,1-1s-0.447-1-1-1h-7c-0.553,0-1,0.447-1,1S12.947,33,13.5,33z\"/><path d=\"M23.5,35h-10c-0.553,0-1,0.447-1,1s0.447,1,1,1h10c0.553,0,1-0.447,1-1S24.053,35,23.5,35z\"/><path d=\"M25.79,35.29c-0.181,0.189-0.29,0.45-0.29,0.71s0.109,0.52,0.29,0.71C25.979,36.89,26.229,37,26.5,37 c0.26,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71s-0.11-0.521-0.29-0.71C26.84,34.92,26.16,34.92,25.79,35.29z\"/><path d=\"M33.5,4h-6v10h6V4z M31.5,12h-2V6h2V12z\"/></svg>",
  'edit': "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 55.25 55.25\" ><path d=\"M52.618,2.631c-3.51-3.508-9.219-3.508-12.729,0L3.827,38.693C3.81,38.71,3.8,38.731,3.785,38.749 c-0.021,0.024-0.039,0.05-0.058,0.076c-0.053,0.074-0.094,0.153-0.125,0.239c-0.009,0.026-0.022,0.049-0.029,0.075 c-0.003,0.01-0.009,0.02-0.012,0.03l-3.535,14.85c-0.016,0.067-0.02,0.135-0.022,0.202C0.004,54.234,0,54.246,0,54.259 c0.001,0.114,0.026,0.225,0.065,0.332c0.009,0.025,0.019,0.047,0.03,0.071c0.049,0.107,0.11,0.21,0.196,0.296 c0.095,0.095,0.207,0.168,0.328,0.218c0.121,0.05,0.25,0.075,0.379,0.075c0.077,0,0.155-0.009,0.231-0.027l14.85-3.535 c0.027-0.006,0.051-0.021,0.077-0.03c0.034-0.011,0.066-0.024,0.099-0.039c0.072-0.033,0.139-0.074,0.201-0.123 c0.024-0.019,0.049-0.033,0.072-0.054c0.008-0.008,0.018-0.012,0.026-0.02l36.063-36.063C56.127,11.85,56.127,6.14,52.618,2.631z M51.204,4.045c2.488,2.489,2.7,6.397,0.65,9.137l-9.787-9.787C44.808,1.345,48.716,1.557,51.204,4.045z M46.254,18.895l-9.9-9.9 l1.414-1.414l9.9,9.9L46.254,18.895z M4.961,50.288c-0.391-0.391-1.023-0.391-1.414,0L2.79,51.045l2.554-10.728l4.422-0.491 l-0.569,5.122c-0.004,0.038,0.01,0.073,0.01,0.11c0,0.038-0.014,0.072-0.01,0.11c0.004,0.033,0.021,0.06,0.028,0.092 c0.012,0.058,0.029,0.111,0.05,0.165c0.026,0.065,0.057,0.124,0.095,0.181c0.031,0.046,0.062,0.087,0.1,0.127 c0.048,0.051,0.1,0.094,0.157,0.134c0.045,0.031,0.088,0.06,0.138,0.084C9.831,45.982,9.9,46,9.972,46.017 c0.038,0.009,0.069,0.03,0.108,0.035c0.036,0.004,0.072,0.006,0.109,0.006c0,0,0.001,0,0.001,0c0,0,0.001,0,0.001,0h0.001 c0,0,0.001,0,0.001,0c0.036,0,0.073-0.002,0.109-0.006l5.122-0.569l-0.491,4.422L4.204,52.459l0.757-0.757 C5.351,51.312,5.351,50.679,4.961,50.288z M17.511,44.809L39.889,22.43c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0 L16.097,43.395l-4.773,0.53l0.53-4.773l22.38-22.378c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0L10.44,37.738 l-3.183,0.354L34.94,10.409l9.9,9.9L17.157,47.992L17.511,44.809z M49.082,16.067l-9.9-9.9l1.415-1.415l9.9,9.9L49.082,16.067z\"/></svg>",
  'columns': ["<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 31\"><g><rect x=\"0.5\" y=\"0.5\" width=\"47\" height=\"30\"/><path d=\"M47,1v29H1V1H47 M48,0H0v31h48V0L48,0z\"/></g><g><rect x=\"4\" y=\"4\" width=\"40\" height=\"23\"/></g></svg>", "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 31\"><g><rect x=\"0.5\" y=\"0.5\" width=\"47\" height=\"30\"/><path d=\"M47,1v29H1V1H47 M48,0H0v31h48V0L48,0z\"/></g><g><rect x=\"4\" y=\"4\" class=\"st1\" width=\"40\" height=\"23\"/></g><rect x=\"22.5\" y=\"3\" width=\"3\" height=\"25\"/></svg>", "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 31\"><g><rect x=\"0.5\" y=\"0.5\" width=\"47\" height=\"30\"/><path d=\"M47,1v29H1V1H47 M48,0H0v31h48V0L48,0z\"/></g><g><rect x=\"4\" y=\"4\" class=\"st1\" width=\"40\" height=\"23\"/></g><rect x=\"29.8\" y=\"3\" width=\"3\" height=\"25\"/><rect x=\"15.1\" y=\"3\" width=\"3\" height=\"25\"/></svg>", "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 31\"><g><rect x=\"0.5\" y=\"0.5\" width=\"47\" height=\"30\"/><path d=\"M47,1v29H1V1H47 M48,0H0v31h48V0L48,0z\"/></g><g><rect x=\"4\" y=\"4\" class=\"st1\" width=\"40\" height=\"23\"/></g><rect x=\"33.3\" y=\"2.9\" width=\"3\" height=\"25\"/><rect x=\"12.1\" y=\"2.8\" width=\"3\" height=\"25\"/><rect x=\"22.7\" y=\"3\" width=\"3\" height=\"25\"/></svg>", "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 31\"><g><rect x=\"0.5\" y=\"0.5\" width=\"47\" height=\"30\"/><path d=\"M47,1v29H1V1H47 M48,0H0v31h48V0L48,0z\"/></g><g><rect x=\"4\" y=\"4\" class=\"st1\" width=\"40\" height=\"23\"/></g><rect x=\"26.9\" y=\"2.9\" width=\"2.9\" height=\"25\"/><rect x=\"35.4\" y=\"3.4\" width=\"2.9\" height=\"25\"/><rect x=\"9.8\" y=\"2.8\" width=\"2.9\" height=\"25\"/><rect x=\"18.4\" y=\"3\" width=\"2.9\" height=\"25\"/></svg>", "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 31\"><g><rect x=\"0.5\" y=\"0.5\" width=\"47\" height=\"30\"/><path d=\"M47,1v29H1V1H47 M48,0H0v31h48V0L48,0z\"/></g><g><rect x=\"4\" y=\"4\" class=\"st1\" width=\"40\" height=\"23\"/></g><rect x=\"29.8\" y=\"2.9\" width=\"2.9\" height=\"25\"/><rect x=\"37\" y=\"3.3\" width=\"2.9\" height=\"25\"/><rect x=\"8.1\" y=\"2.8\" width=\"2.9\" height=\"25\"/><rect x=\"15.4\" y=\"2.5\" width=\"2.9\" height=\"25\"/><rect x=\"22.6\" y=\"3\" width=\"2.9\" height=\"25\"/></svg>"]
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