package main

import (
	"fmt"
	"net/http"
)

func HelloHandler(w http.ResponseWriter, r *http.Request) {

	fmt.Fprintln(w, "Hello from handler!")

}


func main() {

	http.HandleFunc("/hello", HelloHandler)


	fmt.Println("Server running at http://localhost:8080")

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
	fmt.Println("Server failed:", err)
	}

}