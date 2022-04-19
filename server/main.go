package main

import (
	"bytes"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"os"

	handler "github.com/boris-on/rutube-download/server/server_handler"
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

// возвращает json
// {
// 	"video1": {
// 		"resolution": "1920x1080",
// 		"link": "video1.com"
// 		},
// 	"video2": {
// 		"resolution": "720x360",
// 		"link": "video2.com"
// 		}
// }
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

// возвращает mp4
func getMP4(w http.ResponseWriter, r *http.Request) {
	// link := r.URL.Query()["url"]
	link := []string{"https://salam-1.rutube.ru/dive/river-1-301.rutube.ru/vN2qZ0WQdLz1A9LaeKCsAQ/hls-vod/avRJVxn3cAeYU58ME0uT7A/1650303209/602/0x5000c500db597325/08c41eb260ac49acac124627e702cc48.mp4.m3u8?i=256x144_530"}
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
	fmt.Println("starting server at", port)
	http.ListenAndServe(":"+port, mux)
}
