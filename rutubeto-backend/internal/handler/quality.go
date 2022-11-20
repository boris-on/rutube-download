package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) getVideoQualityList(c *gin.Context) {
	videoUrl := c.Query("url")

	videoList, err := h.services.VideoQualityList.Get(videoUrl)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, videoList)
}
