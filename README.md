# Page Builder
plugin for create pages structure using wysiwyg (TinyMCE)

## install

```shell
npm install @koterion/page_builder
```

## use

Include [TinyMCE](https://www.tiny.cloud/docs/quick-start/#step1includethetinymcescript)

```html
<script src="https://cloud.tinymce.com/5/tinymce.min.js?apiKey=your_API_key"></script>
```

### css
```css
@import url('~@koterion/page_builder/dist/css/pageBuilder.css');
```

or (if use Postcss)

```css
@import url('~@koterion/page_builder');
```

### js
```js
import "@koterion/page_builder"

pageBuilder.create(selector, options)
```

##Options

option | type | desc |
:--- | :---: | :--- |
[tinymce](#tinymce) | object | TinyMCE settings |
[height](#height)| string | Workplace height|
[bgClasses](#bgclasses) | string | Backgrounds class names.|

##Methods

method | params | desc |
:--- | :---: | :--- |
`pageBuilder.create()` | `selector, options` | Create workplace |
`pageBuilder.getContent()` | `id` | Get content of current by `id` field |

##Examples:

###use:

```js
import './pageBuilder'

pageBuilder.create(document.querySelector('.textarea'),{})
```
### tinymce
Initialize TinyMCE. Use `className` for selector
```js
{
  tinymce.settings: (className) => {
    tinymce.init({selector: className})
  }
}
```

### height
{
  height: '500px'
}

### bgClasses
{
  bgClasses: 'first, second, third'
}