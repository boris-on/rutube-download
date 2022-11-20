package service

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"

	"github.com/grafov/m3u8"
	rb "github.com/mtvy/rutube-download/rutube_backend"
)

func VideoOptionsProxyRequest(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var videoOptions rb.VideoOptions
	if err := json.Unmarshal(body, &videoOptions); err != nil { // Parse []byte to the go struct pointer
		return "", err
	}
	return videoOptions.VideoBalancer.M3U8, nil
}

func VideoListProxyRequest(url string) ([]rb.Video, error) {
	resp, err := http.Get(url)
	if err != nil {
		return []rb.Video{}, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return []rb.Video{}, err
	}

	videoList, _, err := m3u8.Decode(*bytes.NewBuffer(body), true)
	if err != nil {
		return []rb.Video{}, err
	}

	videoListJson, err := json.Marshal(videoList.(*m3u8.MasterPlaylist).Variants)
	if err != nil {
		return []rb.Video{}, err
	}

	var videos []rb.Video
	if err := json.Unmarshal(videoListJson, &videos); err != nil {
		return []rb.Video{}, err
	}

	return videos, nil
}
