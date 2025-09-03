package auth

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID uuid.UUID `gorm:"type:uuid;primaryKey"`
	FirstName string `gorm:"size=50"`
	LastName string `gorm:"size=50"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Credential struct {
    ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
    UserID    uuid.UUID `gorm:"type:uuid;not null;index"`         
    Email     string    `gorm:"size:255;not null;index"`          
    Password  string    `gorm:"size:255;not null"`                
    Provider  string    `gorm:"size:50;not null;default:'local';check:provider IN ('local','google')"`
    CreatedAt time.Time
    UpdatedAt time.Time
}

func (e *User) BeforeCreate(tx *gorm.DB) (err error) {
    if e.ID == uuid.Nil {
        e.ID = uuid.New()
    }
    return
}