package httpx

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/raj5036/callio/internal/auth"
	livekitx "github.com/raj5036/callio/internal/livekit"
)

type Routes struct {
	TokenSvc *livekitx.TokenService
	AppJWT   string
	PublicLK string
}

func (r *Routes) Register(engine *gin.Engine) {
	engine.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"ok": true})
	})

	api := engine.Group("/api")
	api.Use(auth.RequiredUser(r.AppJWT))
	{
		api.POST("/token", func(ctx *gin.Context) {
			var req struct {
				Room string `json:"room" binding:"required"`
			}

			if err := ctx.ShouldBindJSON(&req); err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			userId := ctx.GetString("userId")
			name := ctx.GetString("name")
			if name == "" {
				name = userId
			}

			token, err := r.TokenSvc.MintJoinToken(req.Room, userId, name, 10*time.Minute)
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			ctx.JSON(http.StatusOK, gin.H{
				"token":       token,
				"liveKit_url": r.PublicLK,
			})
		})
	}
}
