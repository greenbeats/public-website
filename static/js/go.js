// Global Variables

var videoTime;
var user_count;

// Synchornizes the video play time on the website

function main(){

	videoTime = 0;
	while(true){ 
		getStartTime();
		setPlayTime();
		displayUserCount();
		setTimeout(30000);
	}

}

function getStartTime(){

	var delay = 0;

	for(var i=0; i<3; i++){

		delay += Request();

	}

	delay = delay / 3;
	Request();

	videoTime = (videoTime + delay) % 10000; 

};


function Request(){

	//the current time
	var startTime = new Date().getTime();

	json = getHttp(); 

	var now = new Date().getTime(); 

	var delay = now - startTime;
	
	var videoTime = json.time; 
	var userCount = json.count;

	return delay;

};

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


function setPlayTime(){

	var vid = document.getElementById("gbvideo");
	console.log(videoTime);
	vid.currentTime = videoTime; 

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


// Pings the server to maintain a user 'online'

function hearbeat()
{
	return null; 
};


// Displays the number of users 'online'

function displayUserCount(){

	json = getHttp();
	user_count = json.count;
	document.getElementById("userCount").innerHTML = "Currently " + user_count " users breathing with you";

};

window.onload = main;
