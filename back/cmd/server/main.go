package main

import (
	"fmt"
	"net/http"

	"github.com/diegofbacag/personal-finance-app/back/internal/auth"
	"github.com/diegofbacag/personal-finance-app/back/internal/expense"
	"github.com/diegofbacag/personal-finance-app/back/internal/summary"
)

func main() {

	http.HandleFunc("/auth", auth.AuthHandler)
	http.HandleFunc("/expense", expense.ExpenseHandler)
	http.HandleFunc("/summary", summary.SummaryHandler)

	fmt.Println("Server running at http://localhost:8080")

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
	fmt.Println("Server failed:", err)
	}

}