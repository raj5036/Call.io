# Dependencies:

1. [LiveKit SFU](https://github.com/livekit/server-sdk-go)
2. [Gin Gonic](https://github.com/gin-gonic/gin)
3. [Golang jwt](https://github.com/golang-jwt/jwt)
4. [pgx - PostgreSQL Driver and Toolkit](https://github.com/jackc/pgx)
5. [go-redis](https://github.com/redis/go-redis)
6. []

# Commands:
1. App startup command: `go run .\cmd\api\main.go`
2. `cd` into `server`, and run `air` in terminal.

# Important Docs:
1. [LiveKit react docs](https://docs.livekit.io/home/quickstarts/react/)

# Todo: 
1. Add graceful shutdown (context.WithTimeout) for your Gin server.
2. Add logging middleware (e.g., zerolog or zap).
3. Add CORS middleware for frontend connection.
4. Deploy backend + LiveKit container on your dev VPS / EC2.

# Bugs
1. Develop a middleware that will give errors for empty request body (Test with "/api/token" -> { err: EOF })