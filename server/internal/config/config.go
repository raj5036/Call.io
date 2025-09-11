package config

import (
	"log"
	"os"
)

type Config struct {
	AppPort          string
	AppJwtSecret     string
	LivekitApiKey    string
	LivekitApiSecret string
	LivekitHost      string
	LivekitPublicUrl string
	DatabaseUrl      string
	RedisUrl         string
}

func get(key, defaultValue string) string {
	value := os.Getenv(key)
	if value != "" {
		return value
	}

	if defaultValue == "" {
		log.Fatalf("Missing required default value for key %s", key)
	}

	return defaultValue
}

func FromEnv() *Config {
	return &Config{
		AppPort:          get("APP_PORT", "8080"),
		AppJwtSecret:     get("APP_JWT_SECRET", ""),
		LivekitApiKey:    get("LIVEKIT_API_KEY", ""),
		LivekitApiSecret: get("LIVEKIT_API_SECRET", ""),
		LivekitHost:      get("LIVEKIT_HOST", "http://localhost:7880"),
		LivekitPublicUrl: get("LIVEKIT_PUBLIC_URL", "http://localhost:7880"),
		DatabaseUrl:      get("DATABASE_URL", ""),
		RedisUrl:         get("REDIS_URL", ""),
	}
}
