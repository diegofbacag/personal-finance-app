package expense

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Expense struct {
    ID          uuid.UUID `gorm:"type:uuid;primaryKey"`
    UserID      uuid.UUID `gorm:"type:uuid;not null;index"`
    Amount      float64   `gorm:"not null;check:amount >= 0"`
    Category    string    `gorm:"size:50;not null"`
    Description string    `gorm:"size:255"`                  
    Date        time.Time `gorm:"not null;index"`            
    CreatedAt   time.Time
    UpdatedAt   time.Time
}

func (e *Expense) BeforeCreate(tx *gorm.DB) (err error) {
	if e.ID == uuid.Nil {
		e.ID = uuid.New()
	}
	return
}