package service

import (
	"fmt"
	"net/url"
	"strings"
)

func CreateAPIUrl(videoUrl string) (string, error) {
	id, err := extractId(videoUrl)
	if err != nil {
		return "", err
	}
	url := url.URL{
		Scheme: "https",
		Host:   "rutube.ru",
		Path:   "api/play/options/" + id,
	}
	return url.String(), nil
}

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
		return "", fmt.Errorf("wrong url format")
	}
}
