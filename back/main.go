package main

import (
	"fmt"
	"log"
	"main/config"
	"main/models"
	"net/http"
	"strings"
)

func expensesHandler(w http.ResponseWriter, r *http.Request) {
	 w.Header().Set("Content-Type", "application/json")

    switch r.Method {
    case http.MethodGet:
        // Handle GET request
        fmt.Fprint(w, `{"message": "All the expenses"}`)

    case http.MethodPost:
        // Handle POST request
        fmt.Fprint(w, `{"message": "New expense created"}`)

    case http.MethodPut, http.MethodDelete:
        // Handle PUT or DELETE request
        parts := strings.Split(r.URL.Path, "/")
        if len(parts) < 3 {
            http.Error(w, "Missing ID", http.StatusBadRequest)
            return
        }

        id := parts[2]

        if r.Method == http.MethodPut {
            fmt.Fprintf(w, `{"message": "Expense %s modified"}`, id)
        } else {
            fmt.Fprintf(w, `{"message": "Expense %s deleted"}`, id)
        }

    default:
        // Handle unsupported methods
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}

func main() {

    config.ConnectDatabase()
    fmt.Println("Database connection established!")

    err := config.DB.AutoMigrate(&models.User{}, &models.Expense{})
    if err != nil {
        log.Fatal("Failed to migrate: ", err)
    }

    http.HandleFunc("/expenses/", expensesHandler)

    fmt.Println("Server running on http://localhost:3000")
    err = http.ListenAndServe(":3000", nil)
    if err != nil{
        fmt.Println("Error starting server:", err)
    }
}