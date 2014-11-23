package main

import (
	"fmt"
	"net/http"
  "time"
  "strconv"
  "gopkg.in/mgo.v2"
  "gopkg.in/mgo.v2/bson"
  "os"
)
type ipStruct struct {
 ID        bson.ObjectId `bson:"_id,omitempty"`
 IP        string `bson:"ip"`
 CreatedAt time.Time `bson:"createdat"`
}

func stamper(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    fmt.Fprintf(w, "{\"time\":" + strconv.FormatInt(time.Now().UnixNano(), 10) + ",\"count\":" + strconv.Itoa(checkIP(r.RemoteAddr)) + "}")
}

func main() {
  http.HandleFunc("/timestamp/", stamper)
  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
      http.ServeFile(w, r, "index.html")
  })
  http.HandleFunc("/static/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Println(r.URL.Path[8:])
      http.ServeFile(w, r, r.URL.Path[1:])
  })
	http.ListenAndServe(":8080", nil)
}

func checkIP(ip string) ( int) {
  uri := os.Getenv("MONGOHQ_URL")
  if uri == "" {
    fmt.Println("no connection string provided")
    os.Exit(1)
  }
  fmt.Println(uri)
  sess, err := mgo.Dial(uri)
  if err != nil {
    fmt.Printf("Can't connect to mongo, go error %v\n", err)
    os.Exit(1)
  }
  defer sess.Close()
  sess.SetSafe(&mgo.Safe{})
  
  c := sess.DB("gbdb").C("connectedIPs")
  var results []ipStruct
  err = c.Find(bson.M{"ip":ip}).All(&results)
  if err != nil {
      panic(err)
  }
  if len(results) == 0 {
    fmt.Printf("New Connection")
    str := ipStruct{bson.NewObjectId(), ip, time.Now(),}
    c.Insert(str)
  }else {
    fmt.Printf("Updating old Connection  -- you get another minute to live!")
    c.Update(bson.M{"_id": results[0].ID}, bson.M{"$set": bson.M{"createdat": time.Now()}})
  } 
  var count, e = c.Count()
  if e != nil {

  }
  return count
}

