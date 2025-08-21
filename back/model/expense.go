package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Expense struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey"`
	// UserID      uuid.UUID `gorm:"type:uuid;not null"`
	Amount      float64 `gorm:"not null"`
	Category    string `gorm:"not null"`
	Description string
	Date        time.Time `gorm:"autoCreateTime"`
}

func (e *Expense) BeforeCreate(tx *gorm.DB) (err error) {
    if e.ID == uuid.Nil {
        e.ID = uuid.New()
    }

    return
}