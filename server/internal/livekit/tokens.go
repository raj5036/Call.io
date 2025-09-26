package livekitx

import (
	"time"

	"github.com/livekit/protocol/auth"
)

type TokenService struct {
	ApiKey    string
	ApiSecret string
}

func NewTokenService(key, secret string) *TokenService {
	return &TokenService{ApiKey: key, ApiSecret: secret}
}

func (t *TokenService) MintJoinToken(room, identity, name string, ttl time.Duration) (string, error) {
	at := auth.NewAccessToken(t.ApiKey, t.ApiSecret)
	grant := &auth.VideoGrant{
		RoomJoin:     true,
		Room:         room,
		CanSubscribe: func(b bool) *bool { return &b }(true),
		CanPublish:   func(b bool) *bool { return &b }(true),
		// CanPublishData: true,
		// RoomAdmin: true,
	}

	at.SetVideoGrant(grant).SetIdentity(identity).SetName(name).SetValidFor(time.Hour)

	return at.ToJWT()
}
