function getSeconds(json){

	var time = json.time; 
	var seconds = time.toFixed(2) / 1000000000

  return (seconds % 10);

};

function getHttp(){
		var xml_http = null;
		var url = "http://54.69.71.254:8080/timestamp/";

		xml_http = new XMLHttpRequest();
		xml_http.open( "GET", url, false );
		xml_http.send( null );
		
		var json = JSON.parse(xml_http.responseText);
		
		seconds = getSeconds(json);
		
		console.log(seconds);

	};


// TODO
         
function getLatency()
{
	return null;
};

// TODO

function hearbeat()
{
	return null; 
};


window.onload = getHttp;