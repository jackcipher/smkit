package main

import (
	"context"
	"embed"
	"net/http"
	"os"
	"path"
	"path/filepath"

	"github.com/samber/lo"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"smkit/src/svc"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "smkit",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
			Middleware: func(next http.Handler) http.Handler {
				return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
					dir := filepath.Dir(req.URL.Path)
					if lo.Contains([]string{"/avatars"}, dir) {
						fullPath := path.Join(svc.GetRootDir(), req.URL.Path)
						res.WriteHeader(http.StatusOK)
						bts, _ := os.ReadFile(fullPath)
						res.Write(bts)
					}

					next.ServeHTTP(res, req)
				})
			},
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		OnShutdown: func(ctx context.Context) {
			os.RemoveAll(svc.GetRootDir())
		},
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
