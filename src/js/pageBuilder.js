'use strict'

let id = 0
let pageBuilder = {
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
      return tinymce.get(editor.id).getContent()
    }
  },
  height: '500px',
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
    this._createRow()
    this._clickDoc()
  }

  _changeSelector () {
    this.value = this.selector.value !== undefined ? this.selector.value : this.selector.innerHTML
    this.selector.style.display = 'none'
  }

  _createInterface () {
    this.wrapBlock = this._createEl('div', {
      'id': this.className + '_' + id,
      'class': this.className
    })
    this.selector.parentNode.insertBefore(this.wrapBlock, this.selector)
    this.wrapBlock.style.height = this.options.height
  }

  _createMenu () {
    this.menu = this._createEl('div', {
      'class': this.className + '-menu'
    })

    this.menuItem = {
      'add': this._createEl('button', {
        'class': this.className + '-menu-item-add'
      }, `<i class="svg"></i> <span>Add block</span>`)
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

    let [block, footer, title, close, save, textarea] = [
      _this._createEl('div', {
        'class': className + '-block'
      }),
      _this._createEl('div', {
        'class': className + '-footer'
      }),
      _this._createEl('h3', {
        'class': className + '-h3'
      }, `Edit content`),
      _this._createEl('button', {
        'class': className + '-close',
        'title': 'Close'
      }, `<i class="svg"></i> <span>Exit (without saving changes)</span>`),
      _this._createEl('button', {
        'class': className + '-save',
        'title': 'Save'
      }, `<i class="svg"></i> <span>Save changes</span>`),
      _this._createEl('div', { 'class': _this.textareaEditor })
    ]

    _this.editor.appendChild(block)
    footer.appendChild(close)
    footer.appendChild(save)
    forEachArr([title, textarea, footer], (el) => {
      block.appendChild(el)
    })
    _this.wrapBlock.appendChild(_this.editor)

    addTiny('div.' + this.textareaEditor)

    on(close, 'click', () => {
      closeEditor()
    })

    on(save, 'click', () => {
      let content = closeEditor()

      content.innerHTML = _this.options.tinymce.getContent(block.querySelector('div.' + _this.textareaEditor))
    })

    function closeEditor () {
      let content = _this.wrapBlock.querySelector('div.' + _this.className + '-content.changing')
      _this.editor.classList.remove('show')
      content.classList.remove('changing')
      return content
    }
  }

  _createRowSettings (row) {
    let _this = this
    let className = _this.className + '-settings'
    let rowSettings = _this._createEl('div', {
      'class': className
    })

    let [bgRow, column, footer, close, save, bgText, colText] = [
      _this._createEl('div', {
        'class': className + '-bgRow'
      }),
      _this._createEl('div', {
        'class': className + '-column'
      }),
      _this._createEl('div', {
        'class': className + '-footer'
      }),
      _this._createEl('button', {
        'class': className + '-close',
        'title': 'Close'
      }, `<i class="svg"></i> <span>Exit (without saving changes)</span>`),
      _this._createEl('button', {
        'class': className + '-save',
        'title': 'Save'
      }, `<i class="svg"></i> <span>Save changes</span>`),
      _this._createEl('h3', {
        'class': className + '-h3'
      }, `Background style`),
      _this._createEl('h3', {
        'class': className + '-h3'
      }, `Number of columns in a row`)
    ]

    bgRow.appendChild(bgText)
    column.appendChild(colText)
    footer.appendChild(close)
    footer.appendChild(save)

    forEachArr(('def, ' + _this.options.bgClasses).split(', '), (el) => {
      let bg = _this._createEl('div', {
        'class': className + '-bgCol ' + el,
        'data-class': el
      })

      if (el === 'def') bg.innerHTML = `<i class="svg"></i>`

      bgRow.appendChild(bg)

      on(bg, 'click', function () {
        removeActive(bgRow.querySelector('.active'))

        bg.classList.add('active')
      })
    })

    forEachArr([bgRow, column, footer], (el) => {
      rowSettings.appendChild(el)
    })

    for (let i = 1; i <= 6; i++) {
      let col = this._createEl('div', {
        'data-col': i
      }, `<i class="svg"></i> <span>${i}</span>`)

      on(col, 'click', () => {
        removeActive(column.querySelector('.active'))

        col.classList.add('active')
      })

      column.appendChild(col)
    }

    row.appendChild(rowSettings)

    on(close, 'click', function () {
      let row = closeSettings()
      let bgItem = row.querySelector('div.' + className + '-bgCol.active')
      let colItem = row.querySelector('div[data-col].active')

      if (bgItem) bgItem.classList.remove('active')
      if (colItem) colItem.classList.remove('active')
    })

    on(save, 'click', function () {
      let row = closeSettings()
      let bg = bgRow.querySelector('.active')
      let col = column.querySelector('.active')

      row.className = _this.className + '-row'

      if (bg && bg.dataset.class !== 'def') row.classList.add(bg.dataset.class)
      if (col) row.dataset.col = col.dataset.col
    })

    function closeSettings () {
      let row = _this.wrapBlock.querySelector('div.' + _this.className + '-row.changing')

      row.classList.remove('changing')
      row.removeAttribute('data-action')
      _this.body.classList.remove('editing')

      return row
    }

    function removeActive (selector) {
      if (selector) {
        selector.classList.remove('active')
      }
    }
  }

  _createRowMenu (row) {
    let className = this.className + '-row-menu'
    this.rowMenu = this._createEl('div', {
      'class': className
    })

    let settings = this._createEl('button', {
      'class': className + '-settings',
      'title': 'Settings for row',
      'data-role': 'settingRow'
    }, `<i class="svg"></i> <span>Settings</span>`)

    let menu = {
      'block': this._createEl('div', { 'class': className + '-block' }),
      'buttons': {
        'edit': this._createEl('button', {
          'title': 'Edit row style',
          'data-role': 'editRow'
        }, `<i class="svg"></i> <span>Edit</span>`),
        'column': this._createEl('button', {
          'title': 'Add column',
          'data-role': 'addCol'
        }, `<i class="svg"></i> <span>Add column</span>`),
        'delete': this._createEl('button', {
          'title': 'Remove this row',
          'data-role': 'delRow'
        }, `<i class="svg"></i> <span>Remove</span>`)
      }
    }

    forEachObj(menu.buttons, (name, el) => {
      el.classList = className + '-' + name
      menu.block.appendChild(el)
    })

    this.rowMenu.appendChild(menu.block)
    this.rowMenu.appendChild(settings)

    row.firstChild ? row.insertBefore(this.rowMenu, row.firstChild) : row.appendChild(this.rowMenu)
  }

  _createRow () {
    this.rows = this.body.querySelectorAll('div.' + this.className + '-row')

    forEachArr(this.rows, (el) => {
      this._createRowMenu(el)
      let num = el.dataset.col
      this._connectMenuFunc(el)
      this._createRowSettings(el)

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
      this._createRowSettings(row)
      this._createCol(row)
      this.rows = this.body.querySelectorAll('div.' + this.className + '-row')
      this._connectMenuFunc(row)
    })
  }

  _connectMenuFunc (row) {
    forEachArr(row.querySelectorAll('div.' + this.className + '-row-menu button'), (el) => {
      if (el.dataset.role === 'delRow') {
        this._removeRow(el, row)
      } else if (el.dataset.role === 'addCol') {
        this._addCol(el, row)
      } else if (el.dataset.role === 'editRow') {
        this._editRow(el, row)
      } else if (el.dataset.role === 'settingRow') {
        this._openSetting(el, row)
      }
    })
  }

  _openSetting (el, row) {
    on(el, 'click', () => {
      this.body.classList.add('editing')
      forEachArr(this.rows, (el) => {
        el.classList.remove('changing')
      })

      row.classList.add('changing')
    })
  }

  _editRow (el, row) {
    on(el, 'click', () => {
      row.dataset.action = 'edit'
      let settings = row.querySelector('div.' + this.className + '-settings')
      let col = row.dataset.setCol ? row.dataset.setCol : row.dataset.col
      let bgCol = false

      forEachArr(settings.querySelectorAll('div.' + this.className + '-settings-bgCol, div[data-col]'), (el) => {
        el.classList.remove('active')
      })

      forEachArr(row.classList, (el) => {
        if (el !== 'changing' && el !== this.className + '-row') {
          settings.querySelector('div.' + el).classList.add('active')
          bgCol = true
        }
      })

      if (!bgCol) {
        settings.querySelector('div.' + this.className + '-settings-bgCol.def').classList.add('active')
      }

      settings.querySelector('div[data-col = "' + col + '"]').classList.add('active')
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
    let del = this._createEl('button', { 'class': this.className + '-col-del', 'title': 'Remove column' }, `<i class="svg"></i>`)
    let edit = this._createEl('button', { 'class': this.className + '-col-edit', 'title': 'Edit column' }, `<i class="svg"></i>`)

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
      this.body.classList.remove('editing')
      row.parentElement.removeChild(row)
    })
  }

  _removeCol (el, column) {
    on(el, 'click', () => {
      let parent = column.parentElement
      parent.removeChild(column)
      let num = parent.querySelectorAll('.' + this.className + '-col').length

      if (num >= 1) {
        parent.dataset.col = num < 7 ? num : 6
      } else {
        parent.parentNode.removeChild(parent)
      }
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

  _clickDoc () {
    on(document, 'mouseup', (event) => {
      let block = this.wrapBlock.querySelector('.editing')
      if (block) {
        let row = this.body.querySelector('.changing')
        if (!row.contains(event.target)) {
          row.classList.remove('changing')
          row.removeAttribute('data-action')
          block.classList.remove('editing')
        }
      }
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
      let settings = row.querySelector('div.' + this.className + '-settings')
      row.removeChild(menu)
      row.removeChild(settings)
      let cols = row.querySelectorAll('div.' + this.className + '-col')

      if (cols.length > 1) {
        forEachArr(cols, (col) => {
          let del = col.querySelector('.' + this.className + '-col-del')
          let edit = col.querySelector('.' + this.className + '-col-edit')
          let content = col.querySelector('.' + this.className + '-content')

          delAttr(content, ['id', 'style', 'aria-hidden'])

          col.removeChild(del)
          col.removeChild(edit)
        })
      } else if (cols.length === 1) {
        cols = cols[0]
        let content = cols.querySelector('div.' + this.className + '-content')

        delAttr(content, ['id', 'style', 'aria-hidden'])

        cols.parentNode.dataset.col = 0
        cols.parentNode.insertBefore(content, cols)
        cols.parentNode.removeChild(cols)
      } else {
        row.parentNode.removeChild(row)
      }
    })

    function delAttr (el, attr) {
      forEachArr(attr, (value) => {
        el.removeAttribute(value)
      })
    }

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

if (typeof window === 'undefined') {
  global.pageBuilder = pageBuilder
} else {
  window.pageBuilder = pageBuilder
}
