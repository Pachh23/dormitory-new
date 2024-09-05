package familystatuses

import (
	"net/http"

	"example.com/dormitory/config"
	"example.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

func GetAll(c *gin.Context) {
	db := config.DB()
	var familyStatuses []entity.FamilyStatuses
	db.Find(&familyStatuses)
	c.JSON(http.StatusOK, &familyStatuses)
}
