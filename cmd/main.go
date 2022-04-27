package main

import (
	"bytes"
	"encoding/json"
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

type ErrorResponse struct {
	Error           string `json:"error"`
	ErrorDesription string `json:"error_description"`
}

func newErrorResponse(name string, description string) string {
	response := &ErrorResponse{name, description}
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		ErrorLogger.Println(name, description)
	}
	return string(jsonResponse)
}

func mainPage(w http.ResponseWriter, r *http.Request) {
	buf := &bytes.Buffer{}
	err := main_tpl.Execute(buf, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		ErrorLogger.Println(r.RemoteAddr, r.Method, r.URL)
	}
	buf.WriteTo(w)
}

func download(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	link := r.URL.Query()["url"]
	if len(link) == 0 {
		fmt.Fprintln(w, newErrorResponse("url_error", "Введите ссылку на видео"))
		WarningLogger.Println(r.RemoteAddr, r.Method, r.URL)
		return
	}
	if len(link[0]) < 1 {
		fmt.Fprintln(w, newErrorResponse("url_error", "Введите ссылку на видео"))
		WarningLogger.Println(r.RemoteAddr, r.Method, r.URL)
		return
	}
	apiLink, err := handler.CreateAPIUrl(link[0])
	if err != nil {
		fmt.Fprintln(w, newErrorResponse("url_error", "Видео не найдено"))
		WarningLogger.Println(r.RemoteAddr, r.Method, r.URL)
		return
	}

	videoOptionsLink, err := handler.VideoOptionsProxyRequest(apiLink)

	if err != nil {
		fmt.Fprintln(w, newErrorResponse("url_error", "Видео не найдено"))
		WarningLogger.Println(r.RemoteAddr, r.Method, r.URL)
		return
	}
	videoList, err := handler.VideoListProxyRequest(videoOptionsLink)
	if err != nil {
		fmt.Fprintln(w, newErrorResponse("url_error", "Видео не найдено"))
		WarningLogger.Println(r.RemoteAddr, r.Method, r.URL)
		return
	}
	fmt.Fprintln(w, videoList)
}

func getMP4(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	link := r.URL.Query()["url"]
	if len(link) == 0 {
		fmt.Fprintln(w, newErrorResponse("url_error", "Введите ссылку на видео"))
		WarningLogger.Println(r.RemoteAddr, r.Method, r.URL)
		return
	}
	if len(link[0]) < 1 {
		fmt.Fprintln(w, newErrorResponse("url_error", "Введите ссылку на видео"))
		WarningLogger.Println(r.RemoteAddr, r.Method, r.URL)
		return
	}
	segmentList, err := handler.VideoSegmentsProxyRequest(link[0])
	if err != nil {
		fmt.Fprintln(w, newErrorResponse("url_error", "Видео не найдено"))
		WarningLogger.Println(r.RemoteAddr, r.Method, r.URL)
		return
	}

	segmentsInfo, err := handler.VideoFileProxyRequest(segmentList)

	if err != nil {
		fmt.Fprintln(w, newErrorResponse("video_error", "Ошибка при обработке видео"))
		WarningLogger.Println(r.RemoteAddr, r.Method, r.URL)
		return
	}
	w.WriteHeader(http.StatusOK)

	fmt.Fprintln(w, segmentsInfo)
	// w.WriteHeader(http.StatusOK)
	// w.Header().Set("Content-Type", "video/ts")

	// io.Copy(w, bytes.NewReader(videoFileBytes))
	return
}

func getSegment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	uuid := r.URL.Query()["uuid"]
	segment := r.URL.Query()["segment"]
	if len(uuid) == 0 || len(segment) == 0 {
		fmt.Fprintln(w, newErrorResponse("url_error", "Введите ссылку на видео"))
		WarningLogger.Println(r.RemoteAddr, r.Method, r.URL)
		return
	}
	if len(uuid[0]) < 1 || len(segment) < 1 {
		fmt.Fprintln(w, newErrorResponse("video_error", "Ошибка при обработке видео"))
		WarningLogger.Println(r.RemoteAddr, r.Method, r.URL)
		return
	}
	fileBytes, err := handler.GetSegmentFromServer(uuid[0], segment[0])
	if err != nil {
		fmt.Fprintln(w, newErrorResponse("video_error", "Ошибка при обработке видео"))
		WarningLogger.Println(r.RemoteAddr, r.Method, r.URL)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "video/ts")

	io.Copy(w, bytes.NewReader(fileBytes))
	return
}

type loggingResponseWriter struct {
	http.ResponseWriter
	statusCode int
}

func NewLoggingResponseWriter(w http.ResponseWriter) *loggingResponseWriter {
	// WriteHeader(int) is not called if our response implicitly returns 200 OK, so
	// we default to that status code.
	return &loggingResponseWriter{w, http.StatusOK}
}

func (lrw *loggingResponseWriter) WriteHeader(code int) {
	lrw.statusCode = code
	lrw.ResponseWriter.WriteHeader(code)
}

func logRequestHandler(h http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		lrw := NewLoggingResponseWriter(w)
		h.ServeHTTP(lrw, r)
		statusCode := lrw.statusCode
		InfoLogger.Println(r.RemoteAddr, r.Method, r.URL, statusCode)
	}
	return http.HandlerFunc(fn)
}

func init() {
	file, err := os.OpenFile("../logs.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		ErrorLogger.Println("logs.txt not found")
		return
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
	mux.HandleFunc("/getsegment", getSegment)
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	handler := logRequestHandler(mux)

	fmt.Println("starting server at", port)
	http.ListenAndServe(":"+port, handler)
}
