///////////////////////////////////////////////////
//
// Go Server Syncronizer
// Version = 1.0
//
///////////////////////////////////////////////////

var video_time;
var user_count;

window.onload = main;
// Synchornizes the video every 30 seconds

function main(){

	video_time = 0;
	heartbeat();
	setInterval(function(){heartbeat()}, 30000); // Calls back in 30 seconds
}

function heartbeat(){
	getStartTime();
	setPlayTime();
	displayUserCount();
};

// Calculates the start time of video accounting for delay

function getStartTime(){

	var time_delay = 0;

	for(var i=0; i<3; i++){
		time_delay += Request();
	}
	time_delay = time_delay / 3;
	console.log("video_time="+video_time);
	video_time = (video_time + time_delay) % 10; 
		console.log("video_time="+video_time);

	console.log(video_time);
};

// Returns delay time from server

function Request(){

	var start_time = new Date().getTime();
	json = getHttp(); 
	var end_time = new Date().getTime(); 

	var delay = end_time - start_time;
	video_time = json.time/1000000000; 
	user_count = json.count;

	return delay;

};


// Sets the play time for the video

function setPlayTime(){

	var vid = document.getElementById("gbvideo");
	vid.play();
	vid.currentTime = video_time;
};

// Returns JSON data (timestamp and usercount) from server

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


// Displays the number of users 'online'

function displayUserCount(){

	json = getHttp();
	user_count = json.count;
	document.getElementById("userCount").innerHTML = "Currently " + user_count + " users breathing";

};

window.onload = main;