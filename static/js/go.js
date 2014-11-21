
var url = "http://54.69.71.254:8080/timeStamp/";

// http request function 
function httpGet()
{
    var xml_http = null;
    
    xml_http = new XMLHttpRequest();
    xml_http.open( "GET", url, false );
    xml_http.send( null );
    console.log(xml_http.responseText);
    return xml_http.responseText;

};


function parseString(json)
{
	print 'hello'; 
	
};