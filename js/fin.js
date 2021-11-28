$(document).ready(function()
{
  var fini = window.localStorage.getItem("nbtacos");
	console.log('le score final est ' + fini);
  $("#nbtextetacos").html(fini)
})
