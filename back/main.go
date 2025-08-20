package main

import (
	"encoding/json"
	"fmt"
	"log"
	"main/config"
	"main/dto"
	"main/models"
	"net/http"
	"strings"

	"github.com/joho/godotenv"
)

func expensesHandler(w http.ResponseWriter, r *http.Request) {
	 w.Header().Set("Content-Type", "application/json")

    switch r.Method {
    case http.MethodGet:
        fmt.Fprint(w, `{"message": "All the expenses"}`)

    case http.MethodPost:
    
    var input dto.ExpenseInput

    err := json.NewDecoder(r.Body).Decode(&input)
    if err != nil {
        http.Error(w, "Invalid JSON body", http.StatusBadRequest)
        return
    }

    expense := models.Expense{
        Amount: input.Amount, 
        Category: input.Category,
        Description: input.Description, 
        Date: input.Date,
    }

    result := config.DB.Create(&expense)
    if result.Error != nil {
        http.Error(w, result.Error.Error(), http.StatusInternalServerError)
        return
    }
    fmt.Fprintf(w, `{"message": "Expense created with ID %d"}`, expense.ID)

    case http.MethodPut, http.MethodDelete:
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
    godotenv.Load() 

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