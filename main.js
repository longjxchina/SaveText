//Shift+A：中文，Shift+Z：译文

var Z = 90,
	A = 65,
	st_original = "st_original",
	st_all = "st_all";
	
$(function(){
	
});	
	
$(document).keypress(function(e){  
	if(e.shiftKey && e.which == A) {   
        window.localStorage.setItem(st_original,getWords());
    } else if(e.shiftKey && e.which == Z) {   
        var original = getLocalStorage(st_original),
			translate = getWords(),
			all = getLocalStorage(st_all),
			result = "";
		
		result = original + "\t" + translate + "\n";
		all += result;
		
		window.localStorage.setItem(st_all, all);
    }
 }) 
 
 function getWords(){  
    return window.getSelection();
}  

function getLocalStorage(key){
	var text = window.localStorage.getItem(key);
	
	if (text){
		return text;
	}
	
	return "";
}

function showSavedData(){
	var data = getLocalStorage(st_all);
	var doc = $(document.body);
	
	if ($(".st_all_data").length > 0){
		$(".st_all_data").remove();
		return;
	}
	
	var html = "<div class='st_all_data'><div class='header'>您的文本</div><textarea rows='20' cols='100' id='data'>" + data + "</textarea>";
	html += "<div class='buttons'><input type='button' value='复制' class='copy' /><input type='button' value='关闭' class='close' /></div>";
	html += "</div>";
	
	doc.append(html);
}

$(document).on("click", ".st_all_data .close",function(){
	$(".st_all_data").fadeOut().remove();
})

$(document).on("click", ".st_all_data .copy", function(){
	copyToClipBoard($("#data").val());
})

function copyToClipBoard(text){       
	var clip = new ZeroClipboard($(".copy"), {
	  moviePath: chrome.extension.getURL("ZeroClipboard.swf")
	} );   
	
	clip.on( 'complete', function(client, args) {
	  this.style.display = 'none'; // "this" is the element that was clicked
	  alert("Copied text to clipboard: " + args.text );
	} );
}   
 
 