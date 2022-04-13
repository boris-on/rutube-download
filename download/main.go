package main

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"syscall/js"
)

func extractId(input string) (string, error) {
	u, err := url.Parse(input)
	if err != nil {
		return "", err
	}
	route := strings.Split(u.Path, "/")
	if len(route) > 2 {
		id := route[2]
		return id, nil
	} else {
		return "", fmt.Errorf("Wrong url format")
	}
}

func createAPIUrl(id string) string {
	url := url.URL{
		Scheme: "https",
		Host:   "rutube.ru",
		Path:   "api/play/options/" + id,
	}
	return url.String()
}

func makeAPIRequest(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return string(body), nil
}

func downloadVideo(this js.Value, i []js.Value) interface{} {
	link := js.Global().Get("document").Call("getElementById", i[0].String()).Get("value").String()
	id, err := extractId(link)
	if err != nil {
		fmt.Println(err)
	}
	apiUrl := createAPIUrl(id)
	videoData, err := makeAPIRequest(apiUrl)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(videoData)

	return false
}

func registerCallbacks() {
	js.Global().Set("downloadVideo", js.FuncOf(downloadVideo))
}

func main() {
	c := make(chan struct{}, 0)

	println("WASM Go Initialized")
	// register functions
	registerCallbacks()
	<-c
}
