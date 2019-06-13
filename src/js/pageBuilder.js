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
    if (this.editors[id]) {
      return this.editors[id]._getContent()
    } else {
      console.error(`Didn't find plugin with id '${id}'`)
    }
  },
  rebuild: function (id) {
    this.editors[id]._rebuild()
  }
}

let defaults = {
  height: '500px',
  rowClasses: 'first, sec, third',
  colClasses: 'full',
  edit: true,
  tinymceSettings: (className) => {
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
  setTinymceContent: (editor, content) => {
    tinymce.get(editor.id).setContent(content)
  },
  getTinymceContent: (editor) => {
    return tinymce.get(editor.id).getContent()
  }
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
    if (this.options.edit) this._createMenu()
    this._createEditor()
    this._createRow()
    this._clickDoc()
  }

  _changeSelector () {
    this.value = this.selector.value !== undefined ? this.selector.value : this.selector.innerHTML
    this.selector.style.display = 'none'

    if (this.selector.dataset.edit) {
      this.options.edit = this.selector.dataset.edit === 'true'
    }

    if (this.selector.dataset.rowClasses) {
      this.options.rowClasses = this.selector.dataset.rowClasses
    }

    if (this.selector.dataset.colClasses) {
      this.options.colClasses = this.selector.dataset.colClasses
    }
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
        'class': this.className + '-menu-item-add',
        'type': 'button'
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
        'title': 'Close',
        'type': 'button'
      }, `<i class="svg"></i> <span>Exit (without saving changes)</span>`),
      _this._createEl('button', {
        'class': className + '-save',
        'title': 'Save',
        'type': 'button'
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

    _this._addTiny('div.' + this.textareaEditor)

    on(close, 'click', () => {
      closeEditor()
    })

    on(save, 'click', () => {
      let content = closeEditor()

      content.innerHTML = _this.options.getTinymceContent(block.querySelector('div.' + _this.textareaEditor))
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

    let [bgRow, column, footer, select, close, save, bgText, colText] = [
      _this._createEl('div', {
        'class': className + '-bgRow'
      }),
      _this._createEl('div', {
        'class': className + '-column'
      }),
      _this._createEl('div', {
        'class': className + '-footer'
      }),
      _this._createEl('select', {
        'class': className + '-bgCol'
      }),
      _this._createEl('button', {
        'class': className + '-close',
        'title': 'Close',
        'type': 'button'
      }, `<i class="svg"></i> <span>Exit (without saving changes)</span>`),
      _this._createEl('button', {
        'class': className + '-save',
        'title': 'Save',
        'type': 'button'
      }, `<i class="svg"></i> <span>Save changes</span>`),
      _this._createEl('h3', {
        'class': className + '-h3'
      }, `Row class`),
      _this._createEl('h3', {
        'class': className + '-h3'
      }, `Number of columns in a row`)
    ]

    bgRow.appendChild(bgText)
    bgRow.appendChild(select)
    column.appendChild(colText)
    footer.appendChild(close)
    footer.appendChild(save)

    forEachArr(('def, ' + _this.options.rowClasses).split(', '), (el) => {
      let option = _this._createEl('option', {
        'value': el
      }, el)

      if (el === 'def') option.innerText = `none`

      select.appendChild(option)
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
      let bg = select.value
      let col = column.querySelector('.active')

      row.className = _this.className + '-row'

      if (bg !== 'def') row.classList.add(bg)
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
      'data-role': 'settingRow',
      'type': 'button'
    }, `<i class="svg"></i> <span>Settings</span>`)

    let menu = {
      'block': this._createEl('div', { 'class': className + '-block' }),
      'buttons': {
        'edit': this._createEl('button', {
          'title': 'Edit row style',
          'data-role': 'editRow',
          'type': 'button'
        }, `<i class="svg"></i> <span>Edit</span>`),
        'column': this._createEl('button', {
          'title': 'Add column',
          'data-role': 'addCol',
          'type': 'button'
        }, `<i class="svg"></i> <span>Add column</span>`),
        'delete': this._createEl('button', {
          'title': 'Remove this row',
          'data-role': 'delRow',
          'type': 'button'
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
    let create = false

    if (this.rows.length < 1) {
      create = true
      this.body.innerHTML = ''
      let row = this._createEl('div', {
        'class': this.className + '-row',
        'data-col': 0
      })

      this._createCol(row, true, this.value)

      this.body.appendChild(row)
      this.rows = this.body.querySelectorAll('div.' + this.className + '-row')
    }

    forEachArr(this.rows, (el) => {
      if (this.options.edit) {
        this._createRowMenu(el)
        this._connectMenuFunc(el)
        this._createRowSettings(el)
      }

      let num = el.dataset.col

      if (num < 1) {
        this._createCol(el, true)
      } else if (!create) {
        forEachArr(el.querySelectorAll('div.' + this.className + '-col'), (col) => {
          this._addColFunc(col)
        })
      }
    })

    if (this.options.edit) {
      on(this.menuItem.add, 'click', () => {
        let row = this._createEl('div', {
          'class': this.className + '-row',
          'data-col': 0
        })

        this.body.appendChild(row)

        if (this.options.edit) {
          this._createRowMenu(row)
          this._createRowSettings(row)
          this._connectMenuFunc(row)
        }

        this._createCol(row)
        this.rows = this.body.querySelectorAll('div.' + this.className + '-row')
      })
    }
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
      let select = settings.querySelector('select.' + this.className + '-settings-bgCol')

      forEachArr(settings.querySelectorAll('div.' + this.className + '-settings-bgCol, div[data-col]'), (el) => {
        el.classList.remove('active')
      })

      forEachArr(row.classList, (el) => {
        if (this.options.rowClasses.includes(el)) {
          select.value = el
          bgCol = true
        }
      })

      if (!bgCol) {
        select.value = 'def'
      }

      settings.querySelector('div[data-col = "' + col + '"]').classList.add('active')
    })
  }

  _createCol (row, exists = false, inner = '') {
    let col = this._createEl('div', { 'class': this.className + '-col' })

    this._addColFunc(col)

    let content = exists && row.querySelector('div.' + this.className + '-content') ? row.querySelector('div.' + this.className + '-content') : this._createEl('div', { 'class': this.className + '-content' }, inner)

    col.appendChild(content)
    row.appendChild(col)
    let num = row.querySelectorAll('.' + this.className + '-col').length
    row.dataset.col = num < 7 ? num : 6
  }

  _addColFunc (col) {
    let edit = this._createEl('button', {
      'class': this.className + '-col-edit',
      'title': 'Edit column',
      'type': 'button'
    }, `<i class="svg"></i>`)
    col.appendChild(edit)
    this._editContent(edit, col)

    if (this.options.edit) {
      let del = this._createEl('button', {
        'class': this.className + '-col-del',
        'title': 'Remove column',
        'type': 'button'
      }, `<i class="svg"></i>`)
      col.appendChild(del)
      this._removeCol(del, col)

      let setting = this._createEl('button', {
        'class': this.className + '-col-settings',
        'title': 'Settings',
        'type': 'button'
      }, `<i class="svg"></i>`)
      col.appendChild(setting)
      this._openColSetting(setting, col)
      this._createColSettings(col)
    }
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

  _createColSettings (column) {
    let className = this.className + '-colSettings'
    let _this = this
    let [setting, classes, footer, text, select, close, save] = [
      _this._createEl('div', {
        'class': className
      }),
      _this._createEl('div', {
        'class': className + '-classes'
      }),
      _this._createEl('div', {
        'class': className + '-footer'
      }),
      _this._createEl('h3', {
        'class': className + '-h3'
      }, `Col class`),
      _this._createEl('select', {
        'class': className + '-select'
      }),
      _this._createEl('button', {
        'class': className + '-close',
        'title': 'Close',
        'type': 'button'
      }, `<i class="svg"></i> <span>Exit</span>`),
      _this._createEl('button', {
        'class': className + '-save',
        'title': 'Save',
        'type': 'button'
      }, `<i class="svg"></i> <span>Save changes</span>`)
    ]

    forEachArr(('def, ' + _this.options.colClasses).split(', '), (el) => {
      let option = _this._createEl('option', {
        'value': el
      }, el)

      if (el === 'def') option.innerText = `none`

      select.appendChild(option)
    })

    classes.appendChild(text)
    classes.appendChild(select)
    footer.appendChild(close)
    footer.appendChild(save)
    setting.appendChild(classes)
    setting.appendChild(footer)

    column.appendChild(setting)

    on(close, 'click', function () {
      column.classList.remove('changingCol')
    })

    on(save, 'click', function () {
      let val = select.value
      if (val === 'def') {
        column.classList = _this.className + '-col'
      } else {
        column.classList = _this.className + '-col ' + val
      }
    })
  }

  _openColSetting (el, column) {
    on(el, 'click', () => {
      let cols = this.body.querySelectorAll('.changingCol')
      let select = column.querySelector('.' + this.className + '-colSettings-select')
      forEachArr(cols, (el) => {
        el.classList.remove('changingCol')
      })

      column.classList.add('changingCol')

      let def = false

      forEachArr(column.classList, (el) => {
        if (this.options.colClasses.includes(el)) {
          select.value = el
          def = true
        }
      })

      if (!def) {
        select.value = 'def'
      }
    })
  }

  _editContent (el, col) {
    on(el, 'click', () => {
      this.editor.classList.add('show')
      let content = col.querySelector('div.' + this.className + '-content')
      let editor = this.editor.querySelector('div.' + this.textareaEditor)
      editor.innerHTML = content.innerHTML
      this.options.setTinymceContent(editor, content.innerHTML)
      content.classList.add('changing')
    })
  }

  _clickDoc () {
    on(document, 'mouseup', (event) => {
      let block = this.wrapBlock.querySelector('.editing')
      let col = this.body.querySelector('.changingCol')
      if (block) {
        let row = this.body.querySelector('.changing')

        if (row && !row.contains(event.target)) {
          row.classList.remove('changing')
          row.removeAttribute('data-action')
          block.classList.remove('editing')
        }
      }

      if (col && !col.contains(event.target)) {
        col.classList.remove('changingCol')
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

      if (menu) row.removeChild(menu)
      if (settings) row.removeChild(settings)

      let cols = row.querySelectorAll('div.' + this.className + '-col')

      if (cols.length > 1) {
        forEachArr(cols, (col) => {
          let del = col.querySelector('.' + this.className + '-col-del')
          let edit = col.querySelector('.' + this.className + '-col-edit')
          let content = col.querySelector('.' + this.className + '-content')
          let settingsBtn = col.querySelector('.' + this.className + '-col-settings')
          let colSettings = col.querySelector('.' + this.className + '-colSettings')

          delAttr(content, ['id', 'style', 'aria-hidden'])

          if (del) col.removeChild(del)
          if (edit) col.removeChild(edit)
          if (settingsBtn) col.removeChild(settingsBtn)
          if (colSettings) col.removeChild(colSettings)
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

  _addTiny (className) {
    this.options.tinymceSettings(className)
  }

  _rebuild () {
    if (this.wrapBlock.parentElement) {
      this.wrapBlock.parentElement.removeChild(this.wrapBlock)
      pageBuilder.create(this.selector, this.options)
    }
  }
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
