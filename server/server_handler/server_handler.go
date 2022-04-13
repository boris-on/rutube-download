package server_handler

import (
	"fmt"
	"net/url"
	"strings"
)

func ExtractId(input string) (string, error) {
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

func CreateAPIUrl(id string) string {
	url := url.URL{
		Scheme: "https",
		Host:   "rutube.ru",
		Path:   "api/play/options/" + id,
	}
	return url.String()
}

// id, err := extractId(link)
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// 	apiUrl := createAPIUrl(id)
// 	videoData, err := makeAPIRequest(apiUrl)
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// 	fmt.Println(videoData)
