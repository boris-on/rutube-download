package main

import (
	"bytes"
	"fmt"
	"html/template"
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
	fmt.Println(handler.CreateAPIUrl("8232r"))
}

func download(w http.ResponseWriter, r *http.Request) {
	link, err := r.URL.Query()["url"]
	if !err || len(link[0]) < 1 {
		fmt.Println("Url param 'link' is missing")
		return
	}
	fmt.Println(link[0])
}

func main() {
	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("assets"))
	mux.Handle("/assets/", http.StripPrefix("/assets/", fs))
	mux.HandleFunc("/", mainPage)
	mux.HandleFunc("/download", download)
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}
	fmt.Println("starting server at", port)
	http.ListenAndServe(":"+port, mux)
}
