// This script connects to the Go server 

function playvideo()
{
	var video = document.getElementById("gbvideo");
};


// Request a connection to Go server

func handler(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }
    ... Use conn to send and receive messages.
}


// Get response. 