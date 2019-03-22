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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pageBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pageBuilder */ "./src/js/pageBuilder.js");
/* harmony import */ var _pageBuilder__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pageBuilder__WEBPACK_IMPORTED_MODULE_0__);

pageBuilder.create(document.querySelector('.textarea'), {
  height: 'auto'
});
$('.clicker').on('click', function () {
  console.dir(pageBuilder.getContent('pgBld_0'));
});

/***/ }),

/***/ "./src/js/pageBuilder.js":
/*!*******************************!*\
  !*** ./src/js/pageBuilder.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

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
  height: '500px',
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
      this.value = this.selector.value !== undefined ? this.selector.value : this.selector.innerHTML;
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
      this.wrapBlock.style.height = this.options.height;
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
        }, "<i class=\"svg\"></i> <span>Add block</span>")
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
      }, "<i class=\"svg\"></i> <span>Exit (without saving changes)</span>"), _this._createEl('button', {
        'class': className + '-save',
        'title': 'Save'
      }, "<i class=\"svg\"></i> <span>Save changes</span>"), _this._createEl('div', {
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
      }, "<i class=\"svg\"></i> <span>Exit (without saving changes)</span>"), _this._createEl('button', {
        'class': className + '-save',
        'title': 'Save'
      }, "<i class=\"svg\"></i> <span>Save changes</span>"), _this._createEl('h3', {
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

        if (el === 'def') bg.innerHTML = "<i class=\"svg\"></i>";
        bgRow.appendChild(bg);
        on(bg, 'click', function () {
          removeActive(bgRow.querySelector('.active'));
          bg.classList.add('active');
        });
      });
      forEachArr([bgRow, column, footer], function (el) {
        rowSettings.appendChild(el);
      });

      var _loop = function _loop(i) {
        var col = _this4._createEl('div', {
          'data-col': i
        }, "<i class=\"svg\"></i> <span>".concat(i, "</span>"));

        on(col, 'click', function () {
          removeActive(column.querySelector('.active'));
          col.classList.add('active');
        });
        column.appendChild(col);
      };

      for (var i = 1; i <= 6; i++) {
        _loop(i);
      }

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
      }, "<i class=\"svg\"></i> <span>Settings</span>");

      var menu = {
        'block': this._createEl('div', {
          'class': className + '-block'
        }),
        'buttons': {
          'edit': this._createEl('button', {
            'title': 'Edit row style',
            'data-role': 'editRow'
          }, "<i class=\"svg\"></i> <span>Edit</span>"),
          'column': this._createEl('button', {
            'title': 'Add column',
            'data-role': 'addCol'
          }, "<i class=\"svg\"></i> <span>Add column</span>"),
          'delete': this._createEl('button', {
            'title': 'Remove this row',
            'data-role': 'delRow'
          }, "<i class=\"svg\"></i> <span>Remove</span>")
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
      }, "<i class=\"svg\"></i>");

      var edit = this._createEl('button', {
        'class': this.className + '-col-edit',
        'title': 'Edit column'
      }, "<i class=\"svg\"></i>");

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

        if (num >= 1) {
          parent.dataset.col = num < 7 ? num : 6;
        } else {
          parent.parentNode.removeChild(parent);
        }
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

/***/ 1:
/*!******************************!*\
  !*** multi ./src/js/main.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Administrator\Desktop\111\Plugins\pageBuilder\src\js\main.js */"./src/js/main.js");


/***/ })

/******/ });