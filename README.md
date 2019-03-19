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
```