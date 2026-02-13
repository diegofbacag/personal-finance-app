package expense

import (
	"encoding/json"
	"fmt"
	"net/http"

	"gorm.io/gorm"
)

type CreateExpenseRequest struct {
    Category    string  `json:"category" binding:"required"`
    Amount      float64 `json:"amount" binding:"required,gt=0"`
    Description string  `json:"description"`
    Date        string  `json:"date" binding:"required,datetime=2006-01-02"`
}

func ExpenseHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Expense handler!")

	var req CreateExpenseRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	expense := Expense{
		UserID:      req.UserID,
		Amount:      req.Amount,
		Category:    req.Category,
		Description: req.Description,
		Date:        date,
	}

	if err := db.DB.Create(&expense).Error; err != nil {
		if err == gorm.ErrInvalidData {
			http.Error(w, "Invalid expense data", http.StatusUnprocessableEntity)
			return
		}
		http.Error(w, "Failed to create expense", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(expense)

}


func CreateExpense(w http.ResponseWriter, r *http.Request) {}