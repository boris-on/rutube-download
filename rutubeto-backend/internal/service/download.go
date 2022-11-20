package service

type DownloadService struct {
}

func NewDownloadService() *DownloadService {
	return &DownloadService{}
}

func (s *DownloadService) DowloadVideo(videoUrl string) ([]byte, error) {
	return []byte{}, nil
}
