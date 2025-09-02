package expense

import (
	"fmt"
	"net/http"
)

func ExpenseHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Expense handler!")
}