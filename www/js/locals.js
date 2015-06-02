var locals;
$.ajax({
  url: "/modules/locals/locals.php?func=getLocal",
  success: function(data){
    locals = $.parseJSON(data);
  }
});

function initLocals(){
	$.ajax({
	  url: "/modules/locals/locals.php?func=getLocal",
	  success: function(data){
	    locals = $.parseJSON(data);
	  }
	});
}