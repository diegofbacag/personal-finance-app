package main

import (
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    fmt.Fprint(w, `{"message": First route!}`)
}

func main() {
    http.HandleFunc("/hello", helloHandler)

    fmt.Println("Server running on http:// localhost:3000")
    err:= http.ListenAndServe(":3000", nil)
    if err != nil{
        fmt.Println("Error starting server:", err)
    }
}