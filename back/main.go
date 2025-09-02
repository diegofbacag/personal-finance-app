package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/diegofbacag/personal-finance-app/back/internal/auth"
	"github.com/diegofbacag/personal-finance-app/back/internal/expense"
	"github.com/diegofbacag/personal-finance-app/back/internal/summary"
)

func main() {

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.StripSlashes)

	r.Get("/auth", auth.AuthHandler)
	r.Get("/expense", expense.ExpenseHandler)
	r.Get("/summary", summary.SummaryHandler)

	fmt.Println("Server running at http://localhost:8080")

	err := http.ListenAndServe(":8080", r)
	if err != nil {
	fmt.Println("Server failed:", err)
	}

}