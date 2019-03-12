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
  },
  bgClasses: 'first, sec, third'
}

class PageBuilder {
  constructor (selector, options) {
    this.selector = selector.length > 0 ? selector[0] : selector
    this.className = 'pgBld'
    this.textareaEditor = this.className + '-editor-textarea'

    let customOptions = options || {}
    this.options = {}
    forEachObj(defaults, (key, value) => {
      this.options[key] = (customOptions.hasOwnProperty(key)) ? customOptions[key] : value
    })
  }

  _init () {
    this._changeSelector()
    this._createInterface()
    this._createBody()
    this._createMenu()
    this._createEditor()
    this._createRowSettings()
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
    this.menu = this._createEl('div', {
      'class': this.className + '-menu'
    })

    this.menuItem = {
      'add': this._createEl('div', {
        'class': this.className + '-menu-item-add'
      }, svg.plus)
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

    let textarea = this._createEl('div', { 'class': _this.textareaEditor })

    _this.editor.appendChild(block)
    block.appendChild(close)
    block.appendChild(save)
    block.appendChild(textarea)

    _this.wrapBlock.appendChild(_this.editor)

    on(close, 'click', function () {
      closeEditor()
    })

    on(save, 'click', function () {
      let content = closeEditor()

      content.innerHTML = block.querySelector('div.' + _this.textareaEditor).innerHTML
    })

    function closeEditor () {
      let content = _this.wrapBlock.querySelector('div.' + _this.className + '-content.changing')
      _this.editor.classList.remove('show')
      tinymce.remove('div#' + block.querySelector('div.' + _this.textareaEditor).id)
      content.classList.remove('changing')
      return content
    }
  }

  _createRowSettings () {
    let _this = this
    let className = _this.className + '-settings'
    _this.rowSettings = _this._createEl('div', {
      'class': className
    })

    let block = _this._createEl('div', {
      'class': className + '-block'
    })

    let close = _this._createEl('div', {
      'class': className + '-close',
      'title': 'Close'
    }, svg.close)

    let save = _this._createEl('div', {
      'class': className + '-save',
      'title': 'Save'
    }, svg.save)

    let bgRow = _this._createEl('div', {
      'class': className + '-bgRow'
    })

    let text = _this._createEl('h3', {
      'class': className + '-h3'
    }, `Background style <span>clear formatting</span>`)

    on(text.lastChild, 'click', function () {
      removeActive()
    })

    forEachArr(_this.options.bgClasses.split(', '), (el) => {
      let bg = _this._createEl('div', {
        'class': className + '-bgCol ' + el,
        'data-class': el
      })
      bgRow.appendChild(bg)

      on(bg, 'click', function () {
        removeActive()
        bg.classList.add('active')
      })
    })

    _this.rowSettings.appendChild(block)
    block.appendChild(close)
    block.appendChild(save)
    block.appendChild(text)
    block.appendChild(bgRow)
    _this.wrapBlock.appendChild(_this.rowSettings)

    on(close, 'click', function () {
      closeSettings()
      removeActive()
    })

    on(save, 'click', function () {
      let row = closeSettings()
      let bg = bgRow.querySelector('div.active')

      if (bg) {
        row.className = _this.className + '-row ' + bg.dataset.class
      } else {
        row.className = _this.className + '-row'
      }

      removeActive()
    })

    function closeSettings () {
      let row = _this.wrapBlock.querySelector('div.' + _this.className + '-row.changing')
      row.classList.remove('changing')
      _this.rowSettings.classList.remove('show')

      return row
    }

    function removeActive () {
      forEachArr(bgRow.querySelectorAll('div.' + className + '-bgCol'), (el) => {
        el.classList.remove('active')
      })
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
          'edit': this._createEl('li', {
            'title': 'Edit row style',
            'data-role': 'editRow'
          }, svg.edit),
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
      let num = el.dataset.col
      this._connectMenuFunc(el)

      if (num < 1) {
        this._createCol(el, true)
      } else {
        forEachArr(el.querySelectorAll('div.' + this.className + '-col'), (col) => {
          this._addColFunc(col)
        })
      }
    })

    on(this.menuItem.add, 'click', () => {
      let row = this._createEl('div', {
        'class': this.className + '-row',
        'data-col': 0
      })

      this.body.appendChild(row)
      this._createRowMenu(row)
      this._createCol(row)
      this.rows = this.body.querySelectorAll('div.' + this.className + '-row')
      this._connectMenuFunc(row)
    })
  }

  _connectMenuFunc (row) {
    forEachArr(row.querySelectorAll('div.' + this.className + '-row-menu li'), (el) => {
      if (el.dataset.role === 'delRow') {
        this._removeRow(el, row)
      } else if (el.dataset.role === 'addCol') {
        this._addCol(el, row)
      } else if (el.dataset.role === 'editRow') {
        this._showSetting(el, row)
      }
    })
  }

  _showSetting (el, row) {
    on(el, 'click', () => {
      row.classList.add('changing')
      this.rowSettings.classList.add('show')

      forEachArr(row.classList, (el) => {
        if (el !== 'changing' && el !== this.className + '-row') {
          this.rowSettings.querySelector('div.' + el).classList.add('active')
        }
      })
    })
  }

  _createCol (row, exists = false) {
    let col = this._createEl('div', { 'class': this.className + '-col' })

    this._addColFunc(col)

    let content = exists && row.querySelector('div.' + this.className + '-content') ? row.querySelector('div.' + this.className + '-content') : this._createEl('div', { 'class': this.className + '-content' })

    col.appendChild(content)
    row.appendChild(col)
    row.dataset.col = row.querySelectorAll('.' + this.className + '-col').length
  }

  _addColFunc (col) {
    let del = this._createEl('div', { 'class': this.className + '-col-del' }, svg.delete)
    let edit = this._createEl('div', { 'class': this.className + '-col-edit' }, svg.edit)

    col.appendChild(del)
    col.appendChild(edit)

    this._removeCol(del, col)
    this._editContent(edit, col)
  }

  _addCol (el, row) {
    on(el, 'click', () => {
      let num = row.dataset.col

      if (num < 6) {
        this._createCol(row)
      }
    })
  }

  _removeRow (el, row) {
    on(el, 'click', () => {
      row.parentElement.removeChild(row)
    })
  }

  _removeCol (el, column) {
    on(el, 'click', () => {
      let parent = column.parentElement
      parent.removeChild(column)
      parent.dataset.col = parent.querySelectorAll('.' + this.className + '-col').length
    })
  }

  _editContent (el, col) {
    on(el, 'click', () => {
      this.editor.classList.add('show')
      let content = col.querySelector('div.' + this.className + '-content')
      let editor = this.editor.querySelector('div.' + this.textareaEditor)
      editor.innerHTML = content.innerHTML
      content.classList.add('changing')
      addTiny('div.' + this.textareaEditor)
    })
  }

  _createEl (el, options = {}, inner = '') {
    let elem = document.createElement(el)
    forEachObj(options, (key, value) => {
      elem.setAttribute(key, value)
    })

    elem.innerHTML = inner

    return elem
  }

  getContent () {
    let html = this.body.cloneNode(true)
    let rows = html.querySelectorAll('div.' + this.className + '-row')

    forEachArr(rows, (row) => {
      let menu = row.querySelector('div.' + this.className + '-row-menu')
      row.removeChild(menu)
      let cols = row.querySelectorAll('div.' + this.className + '-col')

      if (cols.length > 1) {
        forEachArr(cols, (col) => {
          let del = col.querySelector('div.' + this.className + '-col-del')
          let edit = col.querySelector('div.' + this.className + '-col-edit')
          let content = col.querySelector('div.' + this.className + '-content')

          content.removeAttribute('id')
          content.removeAttribute('style')
          content.removeAttribute('aria-hidden')

          col.removeChild(del)
          col.removeChild(edit)
        })
      } else if (cols.length === 1) {
        let content = cols[0].querySelector('div.' + this.className + '-content')

        content.removeAttribute('id')
        content.removeAttribute('style')
        content.removeAttribute('aria-hidden')
        cols[0].parentNode.dataset.col = 0
        cols[0].parentNode.insertBefore(content, cols[0])
        cols[0].parentNode.removeChild(cols[0])
      } else {
        row.parentNode.removeChild(row)
      }
    })

    return html.innerHTML
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
