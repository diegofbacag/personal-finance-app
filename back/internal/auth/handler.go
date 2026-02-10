package auth

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-playground/validator/v10"
)

var validate = validator.New() 

type RegisterUserRequest struct {
 	Email           string `json:"email" validate:"required,email"`
    Password        string `json:"password" validate:"required,min=8,max=20"`
    ConfirmPassword string `json:"confirm_password" validate:"required,eqfield=Password"`
}

// [Register User]
// Description:
// User can register with valid email + password
// Duplicate email is rejected
// Password is hashed and stored securely
// JWT token is sent to front end
// Steps:
// ~1. Parse JSON request body
// ~2. Validate email and password
// 3. Check if user already exists in DB
// 4. Hash the password
// 5. Save the user to DB
// 6. Create jwt
// 7. Return response to client

//handler
func RegisterUser(w http.ResponseWriter, r *http.Request) {

	var req RegisterUserRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	err = validate.Struct(req)
	if err != nil {
		log.Printf("validation error: %v", err)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error":   "Validation failed",
			"message": err.Error(),
		})
		return
	}
}