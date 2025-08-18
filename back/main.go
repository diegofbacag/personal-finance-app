package main

import (
	"fmt"
	"net/http"
	"strings"
)

func expensesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

    parts := strings.Split(r.URL.Path,"/")


	switch r.Method {
	case http.MethodGet:
		// Handle GET request
		fmt.Fprint(w, `{"message": "All the exxpenses"}`)

	case http.MethodPost:
		// Handle POST request
		fmt.Fprint(w, `{"message": "New expense created"}`)

    case http.MethodPut:
        // Handle PUT request
        fmt.Fprint(w, `{"message": "Expense modified}`)

    case http.MethodDelete:
        // Handle DELETE request
        fmt.Fprint(w, `{"message": "Expense deleted}`)

	default:
		// Handle unsupported methods
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func main() {
    http.HandleFunc("/expenses", expensesHandler)

    fmt.Println("Server running on http://localhost:3000")
    err:= http.ListenAndServe(":3000", nil)
    if err != nil{
        fmt.Println("Error starting server:", err)
    }
}