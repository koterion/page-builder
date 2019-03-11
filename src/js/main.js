import './editor'

let some = pageBuilder(document.querySelector('textarea'))

$('.clicker').on('click', function () {
  console.log(some.getContent())
})