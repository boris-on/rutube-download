package main

import (
	"bytes"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"

	handler "github.com/boris-on/rutube-download/cmd/server_handler"
)

var (
	WarningLogger *log.Logger
	InfoLogger    *log.Logger
	ErrorLogger   *log.Logger
)

var main_tpl = template.Must(template.ParseFiles("main.html"))

func mainPage(w http.ResponseWriter, r *http.Request) {
	buf := &bytes.Buffer{}
	err := main_tpl.Execute(buf, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	buf.WriteTo(w)
}

func download(w http.ResponseWriter, r *http.Request) {
	link := r.URL.Query()["url"]
	if len(link[0]) < 1 {
		fmt.Println("Url param 'link' is missing")
		return
	}
	apiLink, err := handler.CreateAPIUrl(link[0])
	if err != nil {
		fmt.Println(err)
		return
	}

	videoOptionsLink, err := handler.VideoOptionsProxyRequest(apiLink)
	if err != nil {
		fmt.Println(err)
		return
	}
	videoList, err := handler.VideoListProxyRequest(videoOptionsLink)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Fprintln(w, videoList)
}

func getMP4(w http.ResponseWriter, r *http.Request) {
	link := r.URL.Query()["url"]
	if len(link[0]) < 1 {
		fmt.Println("Url param 'link' is missing")
		return
	}
	segmentList, err := handler.VideoSegmentsProxyRequest(link[0])
	if err != nil {
		fmt.Println(err)
		return
	}

	videoFileBytes, err := handler.VideoFileProxyRequest(segmentList)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "video/mp4")

	io.Copy(w, bytes.NewReader(videoFileBytes))
	return
}

func logRequestHandler(h http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		h.ServeHTTP(w, r)
		InfoLogger.Println(r.RemoteAddr, r.Method, r.URL)
	}
	return http.HandlerFunc(fn)
}

func init() {
	file, err := os.OpenFile("../logs.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		log.Fatal(err)
	}

	InfoLogger = log.New(file, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
	WarningLogger = log.New(file, "WARNING: ", log.Ldate|log.Ltime|log.Lshortfile)
	ErrorLogger = log.New(file, "ERROR: ", log.Ldate|log.Ltime|log.Lshortfile)

}

func main() {
	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("assets"))
	mux.Handle("/assets/", http.StripPrefix("/assets/", fs))
	mux.HandleFunc("/", mainPage)
	mux.HandleFunc("/download", download)
	mux.HandleFunc("/getmp4", getMP4)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	handler := logRequestHandler(mux)

	fmt.Println("starting server at", port)
	http.ListenAndServe(":"+port, handler)
}
