package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"main/config"
	"main/dto"
	"main/model"
)

func ExpensesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	switch r.Method {

	case http.MethodGet:

		var expenses []model.Expense
		result := config.DB.Find(&expenses)
		if result.Error != nil {
			http.Error(w, "Error finding expenses", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(expenses)
		return

	case http.MethodPost:

		var input dto.ExpenseInput

		err := json.NewDecoder(r.Body).Decode(&input)
		if err != nil {
			http.Error(w, "Invalid JSON body", http.StatusBadRequest)
			return
		}

		expense := model.Expense{
			Amount:      input.Amount,
			Category:    input.Category,
			Description: input.Description,
			Date:        input.Date,
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
