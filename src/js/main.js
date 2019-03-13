import './editor'

pageBuilder.create(document.querySelector('textarea'))

$('.clicker').on('click', function () {
  console.log(pageBuilder.getContent('pgBld_0'))
})