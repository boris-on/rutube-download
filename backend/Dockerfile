FROM golang:latest

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .

RUN cd cmd && go build

CMD ["cmd/cmd"]
