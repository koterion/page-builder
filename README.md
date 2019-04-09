# Page Builder
plugin for create pages structure using wysiwyg (TinyMCE). [Examples](https://koterion.github.io/pageBuilder/)

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

### html
```html
<div class="YourUniqueClass" data-yourData="dataInfo">HTML</div>
```

or

```html
<textarea class="YourUniqueClass" name="YourUniqueName" data-yourData="dataInfo">HTML</textarea>
```

##Options

option | type | desc |
:--- | :---: | :--- |
[tinymce](#tinymce) | object | TinyMCE settings |
[height](#height)| string | Workplace height|
[bgClasses](#bgclasses) | string | Backgrounds class names. Can use from html data.|
[edit](#edit) | boolean | Turn on/off editing blocks. Can use from html data.|

##Methods

method | desc |
:--- | :--- |
`pageBuilder.create(selector, options)` | Create workplace |
`pageBuilder.getContent(id)` | Get content of current by `id` field |

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
```js
{
  height: '500px'
}
```

### bgClasses
```js
{
  bgClasses: 'first, second, third'
}
```

or

```html
<div data-bg="first, second, third">HTML</div>
```

### edit
```js
{
  edit: true
}
```

or

```html
<div data-edit="true">HTML</div>
```