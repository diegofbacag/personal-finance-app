package models

import "time"

type Expense struct {
	ID          uint
	UserID      uint
	Amount      float64
	Category    string
	Description string
	Date        time.Time
}