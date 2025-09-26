package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/raj5036/callio/internal/config"
	httpx "github.com/raj5036/callio/internal/http"
	livekitx "github.com/raj5036/callio/internal/livekit"
)

func main() {
	cfg := config.FromEnv()

	engine := gin.Default()

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
