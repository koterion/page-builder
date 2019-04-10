import './pageBuilder'

pageBuilder.create(document.querySelector('.textarea'), {
  height: 'auto'
})

$('.clicker').on('click', function () {
  pageBuilder.rebuild('pgBld_0')
  // console.dir(pageBuilder.getContent('pgBld_0'))
})