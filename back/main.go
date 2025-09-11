package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"

	"github.com/diegofbacag/personal-finance-app/back/config"
	"github.com/diegofbacag/personal-finance-app/back/internal/auth"
	"github.com/diegofbacag/personal-finance-app/back/internal/expense"
	"github.com/diegofbacag/personal-finance-app/back/internal/summary"
)

func main() {
    godotenv.Load() 

	config.ConnectDatabase()
	fmt.Println("Database connection established!")

	err := config.DB.AutoMigrate(&auth.User{}, &auth.Credential{}, &expense.Expense{})
    if err != nil {
        log.Fatal("Failed to migrate: ", err)
    }

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.StripSlashes)

	r.Get("/auth/register", auth.RegisterUser)
	r.Get("/expense", expense.ExpenseHandler)
	r.Get("/summary", summary.SummaryHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	addr := fmt.Sprintf(":%s", port)
	fmt.Println("Server running at http://localhost:", port)
	err = http.ListenAndServe(addr, r)
	if err != nil {
	fmt.Println("Server failed:", err)
	}

}