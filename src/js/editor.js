window.TinyMCE = window.tinymce = require('tinymce')

tinymce.init({
  selector: 'div.textarea',
  inline: true,
  menubar: false,
  resize: 'vertical',
  external_plugins: {
    'link': '/js/plugins/link/plugin.min.js',
    'image': '/js/plugins/image/plugin.min.js',
    'code': '/js/plugins/code/plugin.min.js',
    'table': '/js/plugins/table/plugin.min.js',
    'lists': '/js/plugins/lists/plugin.min.js',
    'paste': '/js/plugins/paste/plugin.min.js'
  },
  extended_valid_elements: 'input[id|name|value|type|class|style|required|placeholder|autocomplete|onclick]',
  toolbar: 'styleselect bold italic underline | forecolor backcolor | alignleft aligncenter alignright | bullist numlist outdent indent | link image table | code',
  convert_urls: false,
  image_caption: true,
  image_title: true
})

let block = $('div.editor-body')

$('.editorAdd').on('click', function () {
  block.append('<div class="editor-row"></div>')
  clicker()
})

function clicker () {
  $('.editor-row').on('click', function () {
    $('.editor-row').removeClass('active')
    $(this).addClass('active')
  })
}
