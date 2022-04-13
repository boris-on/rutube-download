package main

import (
	"fmt"
	"io"
	"net/http"
	"syscall/js"
)

func makeAPIRequest(url string) error {
	u := "http://localhost:3001/download" + "?url=" + url

	resp, err := http.Get(u)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	videoData, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	fmt.Println(videoData)
	return nil
}

func downloadVideo(this js.Value, i []js.Value) interface{} {
	link := js.Global().Get("document").Call("getElementById", i[0].String()).Get("value").String()
	go makeAPIRequest(link)
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
