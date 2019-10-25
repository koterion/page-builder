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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

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
    if (this.editors[id]) {
      return this.editors[id]._getContent();
    } else {
      console.error("Didn't find plugin with id '".concat(id, "'"));
    }
  },
  rebuild: function rebuild(id) {
    this.editors[id]._rebuild();
  }
};
var defaults = {
  height: 'auto',
  rowClasses: 'first, sec, third',
  colClasses: 'full',
  edit: true,
  draggable: true,
  tinymceSettings: function tinymceSettings(className) {
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
  setTinymceContent: function setTinymceContent(editor, content) {
    tinymce.get(editor.id).setContent(content);
  },
  getTinymceContent: function getTinymceContent(editor) {
    return tinymce.get(editor.id).getContent();
  }
};

var PageBuilder =
/*#__PURE__*/
function () {
  function PageBuilder(selector, options) {
    _classCallCheck(this, PageBuilder);

    this.selector = selector.length > 0 ? selector[0] : selector;
    this.className = 'pgBld';
    this.textareaEditor = this.className + '-editor-textarea';
    var customOptions = options || {};
    this.options = _objectSpread({}, defaults, {}, customOptions);
  }

  _createClass(PageBuilder, [{
    key: "_init",
    value: function _init() {
      this._changeSelector();

      this._createInterface();

      this._createBody();

      if (this.options.edit) {
        this._createMenu();
      }

      this._createEditor();

      this._createRow();

      this._clickDoc();
    }
  }, {
    key: "_changeSelector",
    value: function _changeSelector() {
      var _this2 = this;

      this.value = this.selector.value !== undefined ? this.selector.value : this.selector.innerHTML;
      this.selector.style.display = 'none';
      var trans = {
        rowclasses: 'rowClasses',
        colclasses: 'colClasses'
      };
      forEachObj(this.selector.dataset, function (key, value) {
        if (trans[key]) {
          _this2.options[trans[key]] = value;
        } else {
          _this2.options[key] = value;
        }
      });
    }
  }, {
    key: "_createInterface",
    value: function _createInterface() {
      this.wrapBlock = this._createEl('div', {
        id: this.className + '_' + id,
        "class": this.className
      });
      this.selector.parentNode.insertBefore(this.wrapBlock, this.selector);
      this.wrapBlock.style.height = this.options.height;
    }
  }, {
    key: "_createMenu",
    value: function _createMenu() {
      var _this3 = this;

      this.menu = this._createEl('div', {
        "class": this.className + '-menu'
      });
      this.menuItem = {
        add: this._getBtn('add', '-menu-item-add', 'Add row', 'Add block')
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
        "class": this.className + '-body'
      }, this.value);
      this.wrapBlock.appendChild(this.body);
    }
  }, {
    key: "_createEditor",
    value: function _createEditor() {
      var _this = this;

      var className = _this.className + '-editor';
      _this.editor = _this._createEl('div', {
        "class": className
      });
      var _ref = [_this._createEl('div', {
        "class": className + '-block'
      }), _this._createEl('div', {
        "class": className + '-footer'
      }), _this._createEl('h3', {
        "class": className + '-h3'
      }, "Edit content"), _this._getBtn('close', '-editor-close', 'Close', 'Exit (without saving changes)'), _this._getBtn('save', '-editor-save', 'Save', 'Save changes'), _this._createEl('div', {
        "class": _this.textareaEditor
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

      _this._addTiny('div.' + this.textareaEditor);

      on(close, 'click', function () {
        closeEditor();
      });
      on(save, 'click', function () {
        var content = closeEditor();
        content.innerHTML = _this.options.getTinymceContent(block.querySelector('div.' + _this.textareaEditor));
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
        "class": className
      });

      var _ref2 = [_this._createEl('div', {
        "class": className + '-bgRow'
      }), _this._createEl('div', {
        "class": className + '-column'
      }), _this._createEl('div', {
        "class": className + '-footer'
      }), _this._createEl('select', {
        "class": className + '-bgCol'
      }), _this._getBtn('close', '-settings-close', 'Close', 'Exit (without saving changes)'), _this._getBtn('save', '-editor-save', 'Save', 'Save changes'), _this._createEl('h3', {
        "class": className + '-h3'
      }, "Row class"), _this._createEl('h3', {
        "class": className + '-h3'
      }, "Number of columns in a row")],
          bgRow = _ref2[0],
          column = _ref2[1],
          footer = _ref2[2],
          select = _ref2[3],
          close = _ref2[4],
          save = _ref2[5],
          bgText = _ref2[6],
          colText = _ref2[7];
      bgRow.appendChild(bgText);
      bgRow.appendChild(select);
      column.appendChild(colText);
      footer.appendChild(close);
      footer.appendChild(save);
      forEachArr(('def, ' + _this.options.rowClasses).split(', '), function (el) {
        var option = _this._createEl('option', {
          value: el
        }, el);

        if (el === 'def') {
          option.innerText = "none";
        }

        select.appendChild(option);
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

        if (bgItem) {
          bgItem.classList.remove('active');
        }

        if (colItem) {
          colItem.classList.remove('active');
        }
      });
      on(save, 'click', function () {
        var row = closeSettings();
        var bg = select.value;
        var col = column.querySelector('.active');
        row.className = _this.className + '-row';

        if (bg !== 'def') {
          row.classList.add(bg);
        }

        if (col) {
          row.dataset.setCol = col.dataset.col;
        }
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
        "class": className
      });

      var settings = this._getBtn('setting', '-row-menu-settings', 'Settings for row', 'Settings', 'settingRow');

      var menu = {
        block: this._createEl('div', {
          "class": className + '-block'
        }),
        buttons: {
          edit: this._getBtn('edit', '', 'Edit row style', 'Edit', 'editRow'),
          column: this._getBtn('add', '', 'Add column', 'Add column', 'addCol'),
          "delete": this._getBtn('add', '', 'Remove this row', 'Remove', 'delRow')
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
      var create = false;

      if (this.rows.length < 1) {
        create = true;
        this.body.innerHTML = '';

        var row = this._createEl('div', {
          "class": this.className + '-row',
          'data-col': 0
        });

        this._createCol(row, true, this.value);

        this.body.appendChild(row);
        this.rows = this.body.querySelectorAll('div.' + this.className + '-row');
      }

      forEachArr(this.rows, function (el) {
        if (_this5.options.edit) {
          _this5._createRowMenu(el);

          _this5._connectMenuFunc(el);

          _this5._createRowSettings(el);
        }

        if (_this5.options.draggable) {
          _this5._drag(el, '.' + _this5.className + '-row', 'changing', '.' + _this5.className + '-col');
        }

        var num = el.dataset.col;

        if (num < 1) {
          _this5._createCol(el, true);
        } else if (!create) {
          forEachArr(el.querySelectorAll('div.' + _this5.className + '-col'), function (col) {
            _this5._addColFunc(col);
          });
        }
      });

      if (this.options.edit) {
        on(this.menuItem.add, 'click', function () {
          var row = _this5._createEl('div', {
            "class": _this5.className + '-row',
            'data-col': 0
          });

          _this5.body.appendChild(row);

          _this5._createRowMenu(row);

          _this5._createRowSettings(row);

          _this5._connectMenuFunc(row);

          if (_this5.options.draggable) {
            _this5._drag(row, '.' + _this5.className + '-row', 'changing', '.' + _this5.className + '-col');
          }

          _this5._createCol(row);

          _this5.rows = _this5.body.querySelectorAll('div.' + _this5.className + '-row');
        });
      }
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
        var select = settings.querySelector('select.' + _this8.className + '-settings-bgCol');
        var bgCol = false;
        forEachArr(settings.querySelectorAll('div.' + _this8.className + '-settings-bgCol, div[data-col]'), function (el) {
          el.classList.remove('active');
        });
        forEachArr(row.classList, function (el) {
          if (_this8.options.rowClasses.includes(el)) {
            select.value = el;
            bgCol = true;
          }
        });

        if (!bgCol) {
          select.value = 'def';
        }

        settings.querySelector('div[data-col = "' + col + '"]').classList.add('active');
      });
    }
  }, {
    key: "_createCol",
    value: function _createCol(row) {
      var exists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var inner = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var col = this._createEl('div', {
        "class": this.className + '-col'
      });

      this._addColFunc(col);

      var content = exists && row.querySelector('div.' + this.className + '-content') ? row.querySelector('div.' + this.className + '-content') : this._createEl('div', {
        "class": this.className + '-content'
      }, inner);
      col.appendChild(content);
      row.appendChild(col);

      this._updateColCount(row);
    }
  }, {
    key: "_updateColCount",
    value: function _updateColCount(row) {
      var num = row.querySelectorAll('.' + this.className + '-col').length;

      if (num > 0) {
        row.dataset.col = num < 7 ? num : 6;
      } else {
        row.parentNode.removeChild(row);
      }
    }
  }, {
    key: "_addColFunc",
    value: function _addColFunc(col) {
      var edit = this._getBtn('edit', '-col-edit', 'Edit column');

      col.appendChild(edit);

      this._editContent(edit, col);

      if (this.options.edit) {
        var del = this._getBtn('delete', '-col-del', 'Remove column');

        col.appendChild(del);

        this._removeCol(del, col);

        var setting = this._getBtn('setting', '-col-settings', 'Settings');

        col.appendChild(setting);

        this._openColSetting(setting, col);

        this._createColSettings(col);

        if (this.options.draggable) {
          this._drag(col, '.' + this.className + '-col', 'changingCol');
        }
      }
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

        _this11._updateColCount(parent);
      });
    }
  }, {
    key: "_createColSettings",
    value: function _createColSettings(column) {
      var className = this.className + '-colSettings';

      var _this = this;

      var _ref3 = [_this._createEl('div', {
        "class": className
      }), _this._createEl('div', {
        "class": className + '-classes'
      }), _this._createEl('div', {
        "class": className + '-footer'
      }), _this._createEl('h3', {
        "class": className + '-h3'
      }, "Col class"), _this._createEl('select', {
        "class": className + '-select'
      }), _this._getBtn('close', '-colSettings-close', 'Close', 'Exit'), _this._getBtn('save', '-colSettings-save', 'Save', 'Save changes')],
          setting = _ref3[0],
          classes = _ref3[1],
          footer = _ref3[2],
          text = _ref3[3],
          select = _ref3[4],
          close = _ref3[5],
          save = _ref3[6];
      forEachArr(('def, ' + _this.options.colClasses).split(', '), function (el) {
        var option = _this._createEl('option', {
          value: el
        }, el);

        if (el === 'def') {
          option.innerText = "none";
        }

        select.appendChild(option);
      });
      classes.appendChild(text);
      classes.appendChild(select);
      footer.appendChild(close);
      footer.appendChild(save);
      setting.appendChild(classes);
      setting.appendChild(footer);
      column.appendChild(setting);
      on(close, 'click', function () {
        column.classList.remove('changingCol');
      });
      on(save, 'click', function () {
        var val = select.value;

        if (val === 'def') {
          column.classList = _this.className + '-col';
        } else {
          column.classList = _this.className + '-col ' + val;
        }
      });
    }
  }, {
    key: "_openColSetting",
    value: function _openColSetting(el, column) {
      var _this12 = this;

      on(el, 'click', function () {
        var cols = _this12.body.querySelectorAll('.changingCol');

        var select = column.querySelector('.' + _this12.className + '-colSettings-select');
        forEachArr(cols, function (el) {
          el.classList.remove('changingCol');
        });
        column.classList.add('changingCol');
        var def = false;
        forEachArr(column.classList, function (el) {
          if (_this12.options.colClasses.includes(el)) {
            select.value = el;
            def = true;
          }
        });

        if (!def) {
          select.value = 'def';
        }
      });
    }
  }, {
    key: "_editContent",
    value: function _editContent(el, col) {
      var _this13 = this;

      on(el, 'click', function () {
        _this13.editor.classList.add('show');

        var content = col.querySelector('div.' + _this13.className + '-content');

        var editor = _this13.editor.querySelector('div.' + _this13.textareaEditor);

        editor.innerHTML = content.innerHTML;

        _this13.options.setTinymceContent(editor, content.innerHTML);

        content.classList.add('changing');
      });
    }
  }, {
    key: "_getBtn",
    value: function _getBtn(name, className, title, text) {
      var role = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
      var icons = {
        add: 'playlist_add',
        edit: 'edit',
        "delete": 'delete_forever',
        setting: 'settings_applications',
        save: 'save',
        close: 'close'
      };

      var button = this._createEl('button', {
        "class": className ? this.className + className : '',
        title: title,
        type: 'button'
      }, "<i class=\"svg\">".concat(icons[name], "</i>") + (text ? "<span>".concat(text, "</span>") : ''));

      if (role) {
        button.dataset.role = role;
      }

      return button;
    }
  }, {
    key: "_drag",
    value: function _drag(selector, closest) {
      var disabledClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var disabledClosest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

      var _this = this;

      on(selector, 'mousedown', dragged);
      on(selector, 'touchstart', dragged);

      function dragged() {
        var clone = selector.cloneNode(true);
        var coords = getCoords(selector);
        var shiftX = event.clientX - coords.left;
        var shiftY = event.clientY - coords.top;
        var moveClass = _this.className + '-move';
        var check = !event.target.closest(disabledClosest) && !selector.classList.contains(disabledClass) && !event.target.closest('button') && !_this.body.classList.contains('editing');
        var closestClassName = closest.replace('.', '');
        var row = selector.closest('.' + _this.className + '-row');
        var move = false;
        var touch = null;

        if (check) {
          clone.style.width = selector.scrollWidth + 'px';
          clone.style.height = selector.scrollHeight + 'px';
          clone.classList.add(_this.className + '-clone');
          var sec = 0;
          touch = setInterval(function () {
            if (sec === 1) {
              on(document, 'mousemove', draggedStart);
              on(document, 'touchmove', draggedStart);
            }

            sec++;
          }, 25);
          on(selector, 'mouseup', draggedStop);
          on(selector, 'touchend', draggedStop);
        }

        function draggedStart() {
          event.preventDefault();
          clearTouch();
          moveAt(event);

          if (!move) {
            move = true;

            _this.body.appendChild(clone);
          }

          on(clone, 'mouseup', draggedStop);
          on(clone, 'touchend', draggedStop);
        }

        function draggedStop() {
          clearTouch();
          document.removeEventListener('mousemove', draggedStart);
          document.removeEventListener('touchmove', draggedStart);

          if (move) {
            var el = getElBehind(clone, event.clientX, event.clientY);
            var parent = el ? el.closest(closest) : null;
            var parentRow = parent ? parent.closest('.' + _this.className + '-row') : null;

            if (selector.classList.contains(_this.className + '-col') && parentRow && row && parentRow !== row) {
              _this._updateColCount(row);

              _this._updateColCount(parentRow);
            }

            _this.body.removeChild(clone);
          }

          move = false;
          clone.removeEventListener('mouseup', draggedStop);
          clone.removeEventListener('touchend', draggedStop);
          selector.removeEventListener('mouseup', draggedStop);
          selector.removeEventListener('touchend', draggedStop);
          selector.classList.remove(moveClass);
        }

        function moveAt(event) {
          clone.style.left = event.clientX - shiftX + 'px';
          clone.style.top = event.clientY - shiftY + 'px';
          selector.classList.add(moveClass);
          var el = getElBehind(clone, event.clientX, event.clientY);
          var parent = el ? el.closest(closest) : null;

          if (parent && !parent.classList.contains(moveClass) && !parent.classList.contains(_this.className + '-clone')) {
            var behindElCoords = getCoords(parent);
            var behindElHeight = parent.scrollHeight;
            var top = behindElCoords.top + behindElHeight / 2;

            if (event.clientY > top) {
              if (parent.nextElementSibling && parent.nextElementSibling.classList.contains(closestClassName)) {
                parent.parentNode.insertBefore(selector, parent.nextElementSibling);
              } else {
                parent.parentNode.appendChild(selector);
              }
            } else {
              if (!parent.previousElementSibling || parent.previousElementSibling && !parent.previousElementSibling.classList.contains(moveClass)) {
                parent.parentNode.insertBefore(selector, parent);
              }
            }
          }
        }

        function clearTouch() {
          if (touch) {
            clearInterval(touch);
            touch = null;
          }
        }
      }

      function getElBehind() {
        var point = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var x = arguments.length > 1 ? arguments[1] : undefined;
        var y = arguments.length > 2 ? arguments[2] : undefined;
        var state = point.className;
        point.className += " ".concat(_this.className, "-hide");
        var el = document.elementFromPoint(x, y);
        point.className = state;
        return el;
      }

      function getCoords(elem) {
        var box = elem.getBoundingClientRect();
        return {
          top: box.top,
          left: box.left
        };
      }
    }
  }, {
    key: "_clickDoc",
    value: function _clickDoc() {
      var _this14 = this;

      on(document, 'mouseup', function (event) {
        var block = _this14.wrapBlock.querySelector('.editing');

        var col = _this14.body.querySelector('.changingCol');

        if (block) {
          var row = _this14.body.querySelector('.changing');

          if (row && !row.contains(event.target)) {
            row.classList.remove('changing');
            row.removeAttribute('data-action');
            block.classList.remove('editing');
          }
        }

        if (col && !col.contains(event.target)) {
          col.classList.remove('changingCol');
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
      var _this15 = this;

      var html = this.body.cloneNode(true);
      var rows = html.querySelectorAll('div.' + this.className + '-row');
      forEachArr(rows, function (row) {
        var menu = row.querySelector('div.' + _this15.className + '-row-menu');
        var settings = row.querySelector('div.' + _this15.className + '-settings');

        if (menu) {
          row.removeChild(menu);
        }

        if (settings) {
          row.removeChild(settings);
        }

        var cols = row.querySelectorAll('div.' + _this15.className + '-col');

        if (cols.length > 1) {
          forEachArr(cols, function (col) {
            var del = col.querySelector('.' + _this15.className + '-col-del');
            var edit = col.querySelector('.' + _this15.className + '-col-edit');
            var content = col.querySelector('.' + _this15.className + '-content');
            var settingsBtn = col.querySelector('.' + _this15.className + '-col-settings');
            var colSettings = col.querySelector('.' + _this15.className + '-colSettings');
            delAttr(content, ['id', 'style', 'aria-hidden']);

            if (del) {
              col.removeChild(del);
            }

            if (edit) {
              col.removeChild(edit);
            }

            if (settingsBtn) {
              col.removeChild(settingsBtn);
            }

            if (colSettings) {
              col.removeChild(colSettings);
            }
          });
        } else if (cols.length === 1) {
          cols = cols[0];
          var content = cols.querySelector('div.' + _this15.className + '-content');
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
  }, {
    key: "_addTiny",
    value: function _addTiny(className) {
      this.options.tinymceSettings(className);
    }
  }, {
    key: "_rebuild",
    value: function _rebuild() {
      if (this.wrapBlock.parentElement) {
        this.wrapBlock.parentElement.removeChild(this.wrapBlock);
        pageBuilder.create(this.selector, this.options);
      }
    }
  }]);

  return PageBuilder;
}();

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
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
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

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (el.matches(s)) {
        return el;
      }

      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/sass/main.sass":
/*!****************************!*\
  !*** ./src/sass/main.sass ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/sass/pageBuilder.sass":
/*!***********************************!*\
  !*** ./src/sass/pageBuilder.sass ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/sass/theme/voyager.sass":
/*!*************************************!*\
  !*** ./src/sass/theme/voyager.sass ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!********************************************************************************************************************!*\
  !*** multi ./src/js/pageBuilder.js ./src/sass/pageBuilder.sass ./src/sass/theme/voyager.sass ./src/sass/main.sass ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\Admin\Desktop\my\pageBuilder\src\js\pageBuilder.js */"./src/js/pageBuilder.js");
__webpack_require__(/*! C:\Users\Admin\Desktop\my\pageBuilder\src\sass\pageBuilder.sass */"./src/sass/pageBuilder.sass");
__webpack_require__(/*! C:\Users\Admin\Desktop\my\pageBuilder\src\sass\theme\voyager.sass */"./src/sass/theme/voyager.sass");
module.exports = __webpack_require__(/*! C:\Users\Admin\Desktop\my\pageBuilder\src\sass\main.sass */"./src/sass/main.sass");


/***/ })

/******/ });