package auth

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func RequiredUser(secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		h := c.GetHeader("Authorization")
		if !strings.HasPrefix(h, "Bearer ") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Missing Bearer token"})
			return
		}

		token := strings.TrimPrefix(h, "Bearer ")
		claims := jwt.MapClaims{}

		_, err := jwt.ParseWithClaims(token, claims, func(t *jwt.Token) (any, error) {
			return []byte(secret), nil
		})

		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid Token"})
			return
		}

		// Expect "sub" (user-id) and "name" in the token
		sub, ok := claims["sub"].(string)
		if ok && sub != "" {
			c.Set("userId", sub)
		} else {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "No sub found in token"})
			return
		}

		name, ok := claims["name"].(string)
		if ok && name != "" {
			c.Set("name", name)
		} else {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "No name found in token"})
			return
		}

		c.Next()
	}
}
