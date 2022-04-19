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

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	fmt.Println(string(body))
	return nil
}

func makeSecondAPIRequest(url string) error {
	u := "http://localhost:3001/getmp4" + "?url=" + url

	resp, err := http.Get(u)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	fmt.Println(string(body))
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
func chooseResolution(this js.Value, i []js.Value) interface{} {
	link := js.Global().Get("document").Call("getElementById", i[0].String()).Get("value").String()
	go makeFirstAPIRequest(link)
	return false
}

// функция отправляет второй запрос на сервер, в качестве ответа - mp4. Входной параметр - ссылка на видео нужного формата, которая возвращается после первого запроса
func downloadVideo(this js.Value, i []js.Value) interface{} {
	link := js.Global().Get("document").Call("getElementById", i[0].String()).Get("value").String()
	// link := "https://salam-1.rutube.ru/dive/river-1-301.rutube.ru/DNzGdY66tH__TwGxbc6VQw/hls-vod/9ye32Q0lzh-ZbIt33V9yaA/1650042678/602/0x5000c500c90b30aa/be9299d4b09340ddbd20e91b6e559350.mp4.m3u8?i=1920x1080_4768"
	go makeSecondAPIRequest(link)
	return false
}

func registerCallbacks() {
	js.Global().Set("chooseResolution", js.FuncOf(chooseResolution))
	js.Global().Set("downloadVideo", js.FuncOf(downloadVideo))
}

func main() {
	c := make(chan struct{}, 0)

	println("WASM Go Initialized")
	// register functions
	registerCallbacks()
	<-c
}
