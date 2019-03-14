'use strict'

import svg from './svg'

let id = 0

window.pageBuilder = {
  editors: {},
  create: function (selector, options) {
    try {
      checkSelector(selector)
    } catch (e) {
      console.error(e.message)
      return false
    }

    let list = new PageBuilder(selector, options)
    list._init()
    this.editors[list.className + '_' + id] = list
    id += id
    return list
  },
  getContent: function (id) {
    return this.editors[id]._getContent()
  }
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
    },
    setContent: (editor, content) => {
      tinymce.get(editor.id).setContent(content)
    },
    getContent: (editor) => {
      tinymce.get(editor.id).getContent()
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
      'id': this.className + '_' + id,
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
    let className = _this.className + '-editor'
    _this.editor = _this._createEl('div', {
      'class': className
    })

    let [block, close, save, textarea] = [
      _this._createEl('div', {
        'class': className + '-block'
      }),
      _this._createEl('div', {
        'class': className + '-close',
        'title': 'Close'
      }, svg.close),
      _this._createEl('div', {
        'class': className + '-save',
        'title': 'Save'
      }, svg.save),
      _this._createEl('div', { 'class': _this.textareaEditor })
    ]

    _this.editor.appendChild(block)
    forEachArr([close, save, textarea], (el) => {
      block.appendChild(el)
    })
    _this.wrapBlock.appendChild(_this.editor)

    addTiny('div.' + this.textareaEditor)

    on(close, 'click', () => {
      closeEditor()
    })

    on(save, 'click', () => {
      let content = closeEditor()

      content.innerHTML = _this.options.tinymce.get(block.querySelector('div.' + _this.textareaEditor).id)
    })

    function closeEditor () {
      let content = _this.wrapBlock.querySelector('div.' + _this.className + '-content.changing')
      _this.editor.classList.remove('show')
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

    let [block, close, save, bgRow, text, column] = [
      _this._createEl('div', {
        'class': className + '-block'
      }),
      _this._createEl('div', {
        'class': className + '-close',
        'title': 'Close'
      }, svg.close),
      _this._createEl('div', {
        'class': className + '-save',
        'title': 'Save'
      }, svg.save),
      _this._createEl('div', {
        'class': className + '-bgRow'
      }),
      _this._createEl('h3', {
        'class': className + '-h3'
      }, `Background style <span>clear formatting</span>`),
      _this._createEl('h3', {
        'class': className + '-h3'
      }, `Number of columns (1-6): <input type="text">`)
    ]

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
    forEachArr([close, save, text, bgRow, column], (el) => {
      block.appendChild(el)
    })
    _this.wrapBlock.appendChild(_this.rowSettings)

    let input = column.querySelector('input')

    on(input, 'keypress', function (event) {
      if (!(event.key.search(/[^1-6]/ig) === -1)) {
        event.preventDefault()
      } else {
        this.dataset.change = true

        if (this.value + '' + event.key > 6) {
          this.value = event.key
          event.preventDefault()
        }
      }
    })

    on(close, 'click', function () {
      closeSettings()
      removeActive()
    })

    on(save, 'click', function () {
      let row = closeSettings()
      let bg = bgRow.querySelector('div.active')

      row.className = _this.className + '-row'

      if (bg) row.classList.add(bg.dataset.class)

      if (input.dataset.change && input.value > 0) {
        row.dataset.setCol = input.value
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

      this.rowSettings.querySelector('input').value = row.dataset.setCol ? row.dataset.setCol : row.dataset.col
    })
  }

  _createCol (row, exists = false) {
    let col = this._createEl('div', { 'class': this.className + '-col' })

    this._addColFunc(col)

    let content = exists && row.querySelector('div.' + this.className + '-content') ? row.querySelector('div.' + this.className + '-content') : this._createEl('div', { 'class': this.className + '-content' })

    col.appendChild(content)
    row.appendChild(col)
    let num = row.querySelectorAll('.' + this.className + '-col').length
    row.dataset.col = num < 7 ? num : 6
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
      this._createCol(row)
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
      let num = parent.querySelectorAll('.' + this.className + '-col').length
      parent.dataset.col = num < 7 ? num : 6
    })
  }

  _editContent (el, col) {
    on(el, 'click', () => {
      this.editor.classList.add('show')
      let content = col.querySelector('div.' + this.className + '-content')
      let editor = this.editor.querySelector('div.' + this.textareaEditor)
      editor.innerHTML = content.innerHTML
      this.options.tinymce.setContent(editor, content.innerHTML)
      content.classList.add('changing')
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

  _getContent () {
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
        cols = cols[0]
        let content = cols.querySelector('div.' + this.className + '-content')

        content.removeAttribute('id')
        content.removeAttribute('style')
        content.removeAttribute('aria-hidden')
        cols.parentNode.dataset.col = 0
        cols.parentNode.insertBefore(content, cols)
        cols.parentNode.removeChild(cols)
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
  if (typeof tinymce === 'undefined') {
    throw Error(`PageBuilder: Didn't find tinymce. Please connect tinymce.`)
  }

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
