package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/mtvy/rutube-download/rutube_backend/internal/service"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()

	router.GET("/video-quality-list", h.getVideoQualityList)
	router.GET("/download", h.download)

	return router
}
