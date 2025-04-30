package svc

import (
	"os"
	"path"
)

func GetRootDir() string {
	dir := path.Join(os.TempDir(), "myapp")
	_ = os.MkdirAll(dir, os.ModePerm)

	return dir
}

func GetAvatarsDir() string {
	dir := path.Join(GetRootDir(), "avatars")
	_ = os.MkdirAll(dir, os.ModePerm)

	return dir
}

// type FileLoader struct {
// 	http.Handler
// }
//
// func NewFileLoader() *FileLoader {
// 	return &FileLoader{}
// }
//
// func (h *FileLoader) ServeHTTP(res http.ResponseWriter, req *http.Request) {
// 	var err error
// 	requestedFilename := strings.TrimPrefix(req.URL.Path, "/")
// 	dir := filepath.Dir(req.URL.Path)
// 	if lo.Contains([]string{"avatars"}, dir) {
// 		fullPath := path.Join(GetRootDir(), req.URL.Path)
// 		fmt.Printf("fullpath:%s\n", fullPath)
// 	}
// 	fmt.Printf("Requesting file:%s dir:%s\n\n\n", requestedFilename, dir)
// 	println("Requesting file:", requestedFilename)
// 	fileData, err := os.ReadFile(requestedFilename)
// 	if err != nil {
// 		res.WriteHeader(http.StatusBadRequest)
// 		res.Write([]byte(fmt.Sprintf("Could not load file %s", requestedFilename)))
// 	}
//
// 	res.Write(fileData)
// }
