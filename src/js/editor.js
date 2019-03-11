'use strict'

import svg from './svg'

window.pageBuilder = function (selector, options) {
  try {
    checkSelector(selector)
  } catch (e) {
    console.error(e.message)
    return false
  }

  let list = new PageBuilder(selector, options)
  list._init()
  return list
}

let defaults = {
  tinymce: {
    settings: (className) => {
      tinymce.init({
        menubar: false,
        selector: className,
        height: 400,
        plugins: 'link table lists paste',
        toolbar: 'formatselect | table',
        setup: function (editor) {
          editor.ui.registry.addContextToolbar('textselection', {
            predicate: function (node) {
              return !editor.selection.isCollapsed()
            },
            items: 'bold italic underline | bullist numlist | alignleft aligncenter alignright',
            position: 'selection',
            scope: 'node'
          })
        }
      })
    }
  }
}

class PageBuilder {
  constructor (selector, options) {
    this.selector = selector.length > 0 ? selector[0] : selector
    this.className = 'pgBld'
    this.textareaClass = this.className + '-textarea'
    this.textareaEditor = this.className + '-editor-textarea'
    this.textarea = 'div.' + this.textareaClass

    let customOptions = options || {}
    this.options = {}
    forEachObj(defaults, (key, value) => {
      this.options[key] = (customOptions.hasOwnProperty(key)) ? customOptions[key] : value
    })
  }

  _init () {
    this._changeSelector()
    this._createInterface()
    this._createMenu()
    this._createBody()
    this._createEditor()
    this._createRow()
  }

  _changeSelector () {
    this.value = this.selector.value
    this.selector.style.display = 'none'
  }

  _createInterface () {
    this.wrapBlock = this._createEl('div', {
      'class': this.className
    })
    this.selector.parentNode.insertBefore(this.wrapBlock, this.selector)
  }

  _createMenu () {
    this.menu = this._createEl('ul', {
      'class': this.className + '-menu'
    })

    this.menuItem = {
      'add': this._createEl('li', {
        'class': this.className + '-menu-item-add'
      }, `${svg.plus} Add row`)
    }

    this.wrapBlock.appendChild(this.menu)

    forEachObj(this.menuItem, (key, value) => {
      this.menu.appendChild(value)
    })
  }

  _createBody () {
    this.body = this._createEl('div', {
      'class': this.className + '-body'
    }, this.value)

    this.wrapBlock.appendChild(this.body)
  }

  _createEditor () {
    let _this = this
    _this.editor = _this._createEl('div', {
      'class': _this.className + '-editor'
    })

    let block = _this._createEl('div', {
      'class': _this.className + '-editor-block'
    })

    let close = _this._createEl('div', {
      'class': _this.className + '-editor-close',
      'title': 'Close'
    }, svg.close)

    let save = _this._createEl('div', {
      'class': _this.className + '-editor-save',
      'title': 'Save'
    }, svg.save)

    _this.editor.appendChild(block)
    block.appendChild(close)
    block.appendChild(save)
    _this._createTextarea(block, _this.textareaEditor)

    _this.wrapBlock.appendChild(_this.editor)

    on(close, 'click', function () {
      closeEditor()
    })

    on(save, 'click', function () {
      let content = closeEditor()

      content.innerHTML = block.querySelector('div.' + _this.textareaEditor).innerHTML
    })

    function closeEditor () {
      let content = _this.wrapBlock.querySelector('.changing')
      _this.editor.classList.remove('show')
      tinymce.remove('div#' + block.querySelector('div.' + _this.textareaEditor).id)

      return content
    }
  }

  _createRowMenu (row) {
    this.rowMenu = this._createEl('div', {
      'class': this.className + '-row-menu'
    })

    let menuItems = {
      'left': {
        'menu': this._createEl('ul'),
        'items': {
          'column': this._createEl('li', {
            'title': 'Add column',
            'data-role': 'addCol'
          }, svg.column)
        }
      },
      'right': {
        'menu': this._createEl('ul'),
        'items': {
          'delete': this._createEl('li', {
            'title': 'Remove this row',
            'data-role': 'delRow'
          }, svg.delete)
        }
      }
    }

    forEachObj(menuItems, (key, value) => {
      forEachObj(value.items, (name, el) => {
        el.classList = this.className + '-row-menu-' + name
        value.menu.appendChild(el)
      })

      value.menu.classList = this.className + '-row-menu-' + key

      this.rowMenu.appendChild(value.menu)
    })

    row.firstChild ? row.insertBefore(this.rowMenu, row.firstChild) : row.appendChild(this.rowMenu)
  }

  _createRow () {
    this.rows = this.body.querySelectorAll('div.' + this.className + '-row')

    forEachArr(this.rows, (el) => {
      this._createRowMenu(el)
      this._connectMenuFunc(el)

      let col = el.querySelector('div.' + this.className + '-col')

      if (!el.contains(col)) {
        el.querySelector('div.' + this.className + '-content').classList.add(this.textareaClass)
      }

      addTiny(this.textarea)
    })

    on(this.menuItem.add, 'click', () => {
      let row = this._createEl('div', {
        'class': this.className + '-row',
        'data-col': 0
      })

      this.body.appendChild(row)
      this._createRowMenu(row)
      this.rows = this.body.querySelectorAll('div.' + this.className + '-row')
      this._connectMenuFunc(row)
      this._createTextarea(row, this.className + '-content ' + this.textareaClass)
    })
  }

  _createCol (el, row) {
    let _this = this

    on(el, 'click', () => {
      let num = row.dataset.col

      if (num < 6) {
        let col = this._createEl('div', { 'class': this.className + '-col' })
        let del = this._createEl('div', { 'class': this.className + '-col-del' }, svg.delete)
        let edit = this._createEl('div', { 'class': this.className + '-col-edit' }, svg.edit)
        let content = this._createEl('div', { 'class': this.className + '-content' })
        col.appendChild(del)
        col.appendChild(edit)
        row.appendChild(col)

        row.dataset.col = row.querySelectorAll('.' + this.className + '-col').length

        if (num === '0') {
          content = row.querySelector(_this.textarea)
          tinymce.remove('div#' + content.id)
          content.classList.remove(_this.textareaClass)
          col.appendChild(content)
          el.click()
        } else {
          col.appendChild(content)
        }

        this._removeCol(del, col)
        this._editContent(edit, col)
      }
    })
  }

  _connectMenuFunc (row) {
    forEachArr(row.querySelectorAll('div.' + this.className + '-row-menu li'), (el) => {
      if (el.dataset.role === 'delRow') {
        this._removeRow(el, row)
      } else if (el.dataset.role === 'addCol') {
        this._createCol(el, row)
      }
    })
  }

  _removeRow (el, row) {
    on(el, 'click', () => {
      forEachArr(row.querySelectorAll(this.textarea), (el) => {
        tinymce.remove('div#' + el.id)
      })

      row.parentElement.removeChild(row)
    })
  }

  _removeCol (el, column) {
    let _this = this
    on(el, 'click', function () {
      let parent = column.parentElement
      parent.removeChild(column)

      if (parent.dataset.col === '2') {
        let col = parent.querySelector('div.' + _this.className + '-col')
        let content = col.querySelector('div.' + _this.className + '-content')
        content.classList.add(_this.textareaClass)
        parent.appendChild(content)
        parent.removeChild(col)
        addTiny(_this.textarea)
      }

      parent.dataset.col = parent.querySelectorAll('.' + this.className).length
    })
  }

  _editContent (el, col) {
    let _this = this

    on(el, 'click', function () {
      _this.editor.classList.add('show')
      let content = col.querySelector('div.' + _this.className + '-content')
      let editor = _this.editor.querySelector('div.' + _this.textareaEditor)
      editor.innerHTML = content.innerHTML
      content.classList.add('changing')
      addTiny('div.' + _this.textareaEditor)
    })
  }

  _createTextarea (parent, className = this.textareaClass) {
    let textarea = this._createEl('div', { 'class': className })
    parent.appendChild(textarea)
    addTiny(this.textarea)
  }

  _createEl (el, options = {}, inner = '') {
    let elem = document.createElement(el)
    forEachObj(options, (key, value) => {
      elem.setAttribute(key, value)
    })

    elem.innerHTML = inner

    return elem
  }
}

function addTiny (className) {
  defaults.tinymce.settings(className)
}

function checkSelector (selector) {
  if (selector === undefined || selector.length === 0) {
    throw Error(`PageBuilder: Didn't find selector`)
  } else if (selector.length > 1) {
    throw Error(`PageBuilder: Please use individual selector, not more.
        You use ` + selector.length + ` selectors`)
  }
}

function forEachObj (obj, callback) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      callback(prop, obj[prop])
    }
  }
}

function forEachArr (arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], arr)
  }
}

function on (elem, event, func) {
  if (elem.addEventListener) {
    elem.addEventListener(event, func)
  } else {
    elem.attachEvent('on' + event, func)
  }
}

// For IE function closest https://developer.mozilla.org/en-US/docs/Web/API/Element/closest

if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    let matches = (this.document || this.ownerDocument).querySelectorAll(s)
    let i
    let el = this
    do {
      i = matches.length
      while (--i >= 0 && matches.item(i) !== el) {
      }
    } while ((i < 0) && (el = el.parentElement))
    return el
  }
}
