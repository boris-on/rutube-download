package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) download(c *gin.Context) {
	videoUrl := c.Query("url")

	fileBytes, err := h.services.Download.DowloadVideo(videoUrl)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.Data(http.StatusOK, "video/mp4", fileBytes)
}
