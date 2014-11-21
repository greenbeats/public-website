// Global Variables

var videoTime;
var userCount;


function main(){

	videoTime = 0;
	while(true){ 
		getStartTime();
		setPlayTime();
		setTimeout(30000);
	}
	//display(userCount);

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

// TODO

function hearbeat()
{
	return null; 
};


window.onload = main;

/*



main(){
	getStartTime()
	setVideo(videoTime);
	display(userCount);
}

getStartTime(){

	delay = 0;

	for( 1->3)
	{

		delay += request()
		
	}

	delay = delay / 3;

	request();
	videoTime = (videoTime + delay)%10


}


request(){

	//the current time
	startTime
	
	json = httpReq()

	delay = now - startTime
	
	videoTime = json.time 
	userCount =  json.userCount;

	return Delay
}
*/