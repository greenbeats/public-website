$(document).ready(function(){

	function getHttp(){
		var xml_http = null;
		var url = "http://54.69.71.254:8080/timestamp/";

		xml_http = new XMLHttpRequest();
		xml_http.open( "GET", url, false );
		xml_http.send( null );
		
		return json = JSON.parse(JSON.parse(xml_http.responseText));
	};


function getSeconds(json){

  console.log(json);
};
         
function getLatency()
{
	return null;
};

function hearbeat()
{
	return null; 
};

});