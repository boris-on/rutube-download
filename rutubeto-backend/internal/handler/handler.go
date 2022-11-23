package handler

import (
	"github.com/gin-contrib/cors"
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

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		// AllowMethods:     []string{"GET"},
		// AllowHeaders:     []string{"Origin"},
		// ExposeHeaders:    []string{"Content-Length"},
		// AllowCredentials: true,
	}))
	// router.Use(cors.Default()) // Debug

	router.GET("/video-quality-list", h.getVideoQualityList)
	router.GET("/download", h.download)

	return router
}
