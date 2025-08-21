package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"

	"main/config"
	"main/handler"
	"main/model"
)


func main() {
    godotenv.Load() 

    config.ConnectDatabase()
    fmt.Println("Database connection established!")

    err := config.DB.AutoMigrate(&model.User{}, &model.Expense{})
    if err != nil {
        log.Fatal("Failed to migrate: ", err)
    }

    http.HandleFunc("/expenses", handler.ExpensesHandler)
    http.HandleFunc("/expenses/", handler.ExpensesHandler)

    fmt.Println("Server running on http://localhost:3000")
    err = http.ListenAndServe(":3000", nil)
    if err != nil{
        fmt.Println("Error starting server:", err)
    }
}