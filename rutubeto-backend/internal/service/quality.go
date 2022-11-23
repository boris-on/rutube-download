package service

import rb "github.com/mtvy/rutube-download/rutube_backend"

type VideoQualityListService struct {
}

func NewVideoQualityListService() *VideoQualityListService {
	return &VideoQualityListService{}
}

func (s *VideoQualityListService) Get(videoUrl string) ([]rb.Video, error) {
	apiUrl, err := CreateAPIUrl(videoUrl)
	if err != nil {
		return []rb.Video{}, err
	}

	videoOptionsUrl, err := VideoOptionsRequest(apiUrl)
	if err != nil {
		return []rb.Video{}, err
	}

	videoQualityList, err := VideoListRequest(videoOptionsUrl)
	if err != nil {
		return []rb.Video{}, err
	}

	return videoQualityList, nil

}
