function main(){

	var time = getSeconds();
	var latency = getLatency();
	setPlayTime(time);

}

function getHttp(){

		var xml_http = null;
		var url = "http://54.69.71.254:8080/timestamp/";

		xml_http = new XMLHttpRequest();
		xml_http.open( "GET", url, false );
		xml_http.send( null );
		
		return JSON.parse(xml_http.responseText);
		
};

function getSeconds(){

	json = getHttp(); 
	var time = json.time; 
	var seconds = time.toFixed(2) / 1000000000

  console.log(seconds % 10)  
  return (seconds % 10);

};


function setPlayTime(time){

	var vid = document.getElementById("gbvideo");
	console.log(time);
	vid.currentTime = time; 

};

// TODO
         
function getLatency(){
	
	
	var start = new Date().getTime();

	for(var i=0; i<3; i++){

		getSeconds();

	}
	var end = new Date().getTime();
	var latency = (end - start)/3;


};

// TODO

function hearbeat()
{
	return null; 
};


window.onload = main;