FROM jrottenberg/ffmpeg:4.1-alpine as ffmpeg

FROM golang:latest

WORKDIR /app

EXPOSE 8081

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .

RUN cd cmd && go build

COPY --from=jrottenberg/ffmpeg:4.1-alpine / /

CMD ["cmd/cmd"]