
var url = "http://54.69.71.254:8080/timeStamp/";

// http request function 
function httpGet()
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
};


function playVideo()
{
	print 'hello'; 
	
};