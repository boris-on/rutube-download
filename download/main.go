package main

import (
	"fmt"
	"io"
	"net/http"
	"syscall/js"
)

func makeFirstAPIRequest(url string) error {
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

// функция отправляет первый запрос на сервер, в качестве ответа - json
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
func downloadVideo(this js.Value, i []js.Value) interface{} {
	link := js.Global().Get("document").Call("getElementById", i[0].String()).Get("value").String()
	go makeFirstAPIRequest(link)
	return false
}

// функция отправляет второй запрос на сервер, в качестве ответа - mp4. Входной параметр - ссылка на видео нужного формата, которая возвращается после первого запроса
func chooseResolution(this js.Value, i []js.Value) interface{} {
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
