///////////////////////////////////////////////////
//
// Go Server Syncronizer Library
// Version = 1.0
//
///////////////////////////////////////////////////

var video_time;
var user_count;


// Synchornizes the video play time on the website

function main(){

	video_time = 0;
	while(true){ 
		getStartTime();
		setPlayTime();
		displayUserCount();
		setTimeout(30000);
	}

}


// add text

function getStartTime(){

	var delay = 0;

	for(var i=0; i<3; i++){

		delay += Request();

	}

	delay = delay / 3;
	Request();

	video_time = (video_time + delay) % 10000; 

};


function Request(){

	//the current time
	var startTime = new Date().getTime();

	json = getHttp(); 

	var now = new Date().getTime(); 

	var delay = now - startTime;
	
	var video_time = json.time; 
	var userCount = json.count;

	return delay;

};

function getHttp(){

		var xml_http = null;
		var server_url = "http://54.69.71.254:8080/timestamp/";

		xml_http = new XMLHttpRequest();
		xml_http.open( "GET", server_url, false );
		xml_http.send( null );
		
		return JSON.parse(xml_http.responseText);
		
};


// Calculates video play time form server

function getSeconds(){

	json = getHttp(); 
	var time = json.time; 
	var seconds = time.toFixed(2) / 1000000000
  
  return (seconds % 10);

};


// Sets the play time for the video

function setPlayTime(){

	var vid = document.getElementById("gbvideo");
	console.log(video_time);
	vid.currentTime = video_time; 

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

function heartbeat()
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
