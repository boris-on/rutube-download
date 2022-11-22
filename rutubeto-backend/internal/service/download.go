package service

import (
	"bytes"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/grafov/m3u8"
	"github.com/sirupsen/logrus"
	ffmpeg "github.com/u2takey/ffmpeg-go"
)

const (
	mediaPath = "../media/"
)

type DownloadService struct {
}

func NewDownloadService() *DownloadService {
	return &DownloadService{}
}

func (s *DownloadService) DowloadVideo(videoUrl string) ([]byte, error) {
	segmentList, err := videoSegmentsRequest(videoUrl)
	if err != nil {
		return []byte{}, err
	}

	fileName, err := videoFileRequest(segmentList)
	if err != nil {
		return []byte{}, err
	}

	fileBytes, err := getFile(fileName)
	if err != nil {
		return []byte{}, err
	}

	return fileBytes, nil
}

func videoSegmentsRequest(videoUrl string) ([]string, error) {
	resp, err := http.Get(videoUrl)
	if err != nil {
		return []string{}, err
	}

	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return []string{}, err
	}

	segmentList, _, err := m3u8.Decode(*bytes.NewBuffer(body), true)
	if err != nil {
		return []string{}, err
	}

	var segmentUriList []string
	splitUrl := strings.Split(videoUrl, ".m3u8")[0]

	for _, segment := range segmentList.(*m3u8.MediaPlaylist).Segments {
		if segment != nil {
			segmentUriList = append(segmentUriList, splitUrl+"/"+strings.Split(segment.URI, ".mp4/")[1])
		} else {
			break
		}
	}

	return segmentUriList, nil
}

func videoFileRequest(links []string) (string, error) {
	fileName := uuid.New().String()

	err := os.Mkdir(mediaPath+fileName, 0755)
	if err != nil {
		return "", err
	}

	err = os.Mkdir(mediaPath+fileName+"/mp", 0755)
	if err != nil {
		return "", err
	}

	var waitSegmentsGroup sync.WaitGroup
	for i, link := range links {
		waitSegmentsGroup.Add(1)
		go getSegment(i, link, fileName, &waitSegmentsGroup)

	}
	waitSegmentsGroup.Wait()

	var waitConvertGroup sync.WaitGroup
	ch := make(chan int, 16)
	for i := 0; i < len(links); i++ {
		waitConvertGroup.Add(1)
		ch <- 1
		go convertToMP4(&waitConvertGroup, ch, fileName, i)
	}
	waitConvertGroup.Wait()

	ffmpegList := []*ffmpeg.Stream{}
	for i := 0; i < len(links); i++ {
		if _, err := os.Stat(mediaPath + fileName + "/mp/" + strconv.Itoa(i) + ".mp4"); err == nil {
			ffmpegList = append(ffmpegList, ffmpeg.Input(mediaPath+fileName+"/mp/"+strconv.Itoa(i)+".mp4"))
		}
	}

	cmd := ffmpeg.Concat(ffmpegList).Output(mediaPath + fileName + "/mp/video.mp4")
	err = cmd.OverWriteOutput().ErrorToStdOut().Run()
	if err != nil {
		deletePath(fileName)
		return "", err
	}

	return fileName, nil
}

func getSegment(index int, url string, fileName string, wg *sync.WaitGroup) error {
	defer wg.Done()

	out, err := os.Create(mediaPath + fileName + "/" + strconv.Itoa(index+1) + ".ts")
	if err != nil {
		deletePath(fileName)
		return err
	}
	defer out.Close()

	client := http.Client{
		Timeout: 180 * time.Second,
	}
	resp, err := client.Get(url)
	if err != nil {
		deletePath(fileName)
		return err
	}
	defer resp.Body.Close()

	_, err = io.Copy(out, resp.Body)
	if err != nil {
		deletePath(fileName)
		return err
	}

	return nil
}

func convertToMP4(wg *sync.WaitGroup, ch chan int, fileName string, i int) {
	defer wg.Done()
	cmd := ffmpeg.Input(mediaPath + fileName + "/" + strconv.Itoa(i+1) + ".ts").Output(mediaPath + fileName + "/mp/" + strconv.Itoa(i+1) + ".mp4")
	err := cmd.OverWriteOutput().ErrorToStdOut().Run()
	if err != nil {
		deletePath(fileName)
	}
	<-ch
}

func getFile(fileName string) ([]byte, error) {
	file, err := os.Open(mediaPath + fileName + "/mp/video.mp4")

	if err != nil {
		return []byte{}, nil
	}
	defer file.Close()

	fileBytes, err := io.ReadAll(file)
	if err != nil {
		return []byte{}, nil
	}

	deletePath(fileName)
	return fileBytes, nil
}

func deletePath(fileName string) error {
	err := os.RemoveAll(mediaPath + fileName)
	if err != nil {
		logrus.Errorf("failed to delete path", err.Error())
	}
	return nil
}
