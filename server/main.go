package main

import (
	"fmt"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/raj5036/callio/internal/config"
	httpx "github.com/raj5036/callio/internal/http"
	livekitx "github.com/raj5036/callio/internal/livekit"
)

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Printf("Error loading .env file")
	}
}

func main() {
	cfg := config.FromEnv()

	engine := gin.Default()
	engine.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://127.0.0.1:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,           // for using cookies/Authorization
		MaxAge:           12 * time.Hour, // preflight cache
	}))

	routes := &httpx.Routes{
		TokenSvc: livekitx.NewTokenService(cfg.LivekitApiKey, cfg.LivekitApiSecret),
		AppJWT:   cfg.AppJwtSecret,
		PublicLK: cfg.LivekitPublicUrl,
	}
	routes.Register(engine)

	addr := ":" + cfg.AppPort
	log.Println("API listening on", addr)
	if err := engine.Run(addr); err != nil {
		log.Fatal(err)
	}
}
