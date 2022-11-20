package service

import rb "github.com/mtvy/rutube-download/rutube_backend"

type VideoQualityList interface {
	Get(videoUrl string) ([]rb.Video, error)
}

type Download interface {
	DowloadVideo(videoUrl string) ([]byte, error)
}

type Service struct {
	VideoQualityList
	Download
}

func NewService() *Service {
	return &Service{
		VideoQualityList: NewVideoQualityListService(),
		Download:         NewDownloadService(),
	}
}
