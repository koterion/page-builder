import './pageBuilder'

pageBuilder.create(document.querySelector('textarea'))

$('.clicker').on('click', function () {
  console.dir(pageBuilder.getContent('pgBld_0'))
})