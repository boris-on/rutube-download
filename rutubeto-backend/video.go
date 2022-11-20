package rutubeto_backend

type VideoOptions struct {
	ID            int           `json:"id"`
	ThumbnailURL  string        `json:"thumbnail_url"`
	Captions      []interface{} `json:"captions"`
	Title         string        `json:"title"`
	VideoBalancer struct {
		Default string `json:"default"`
		M3U8    string `json:"m3u8"`
	} `json:"video_balancer"`
}

type Video struct {
	URI        string
	Resolution string
}
