$(document).ready(function()
{
  var finito = window.localStorage.getItem("nbtacos");
	console.log('le score final est ' + finito);
  $("#nbtextetacos").html(finito)
})
