import './pageBuilder'

pageBuilder.create(document.querySelector('.textarea'), {
  height: 'auto'
})

$('.clicker').on('click', function () {
  console.dir(pageBuilder.getContent('pgBld_0'))
})