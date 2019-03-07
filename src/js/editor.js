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

let defaults = {}

class PageBuilder {
  constructor (selector, options) {
    this.selector = selector.length > 0 ? selector[0] : selector
    this.className = 'pgBld'

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
    this._crudRow()
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

  _createEl (el, options = {}, inner = '') {
    let elem = document.createElement(el)
    forEachObj(options, (key, value) => {
      elem.setAttribute(key, value)
    })

    elem.innerHTML = inner

    return elem
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

  _crudRow () {
    let _this = this
    _this.rows = _this.body.querySelectorAll('div.' + _this.className + '-row')

    forEachArr(_this.rows, (el) => {
      this._createRowMenu(el)
      reloadFunc(el)
    })

    on(_this.menuItem.add, 'click', function () {
      let row = _this._createEl('div', {
        'class': _this.className + '-row'
      })

      _this.body.appendChild(row)
      _this._createRowMenu(row)
      _this.rows = _this.body.querySelectorAll('div.' + _this.className + '-row')
      reloadFunc(row)
    })

    function reloadFunc (row) {
      forEachArr(row.querySelectorAll('div.' + _this.className + '-row-menu li'), (el) => {
        if (el.dataset.role === 'delRow') {
          _this._removeRow(el)
        } else if (el.dataset.role === 'addCol') {
          _this._crudCol(el)
        }
      })
    }
  }

  _crudCol (el) {
    let _this = this

    on(el, 'click', function () {
      let col = _this._createEl('div', { 'class': _this.className + '-col' })
      let textarea = _this._createEl('div', { 'class': 'textarea' })
      let del = _this._createEl('div', { 'class': _this.className + '-col-del' }, svg.delete)

      col.appendChild(del)
      col.appendChild(textarea)
      this.parentElement.parentElement.parentElement.appendChild(col)

      _this._removeCol(del)
    })
  }

  _removeRow (el) {
    this._remove(el, this.body, el.offsetParent.offsetParent)
  }

  _removeCol (el) {
    this._remove(el, el.offsetParent.offsetParent, el.offsetParent)
  }

  _remove (el, parent, child) {
    on(el, 'click', function () {
      parent.removeChild(child)
    })
  }
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

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2
  if (t < 1) return c / 2 * t * t + b
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
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