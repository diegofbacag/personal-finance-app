package summary

import (
	"fmt"
	"net/http"
)

func SummaryHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Summary handler!")
}