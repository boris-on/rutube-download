package handler

import (
	"fmt"
	"net/url"
	"strings"
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
