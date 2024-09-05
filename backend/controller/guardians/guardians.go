package guardians

import (
	"net/http"

	"example.com/dormitory/config"
	"example.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

func GetAll(c *gin.Context) {
	db := config.DB()
	var guardians []entity.Guardians
	db.Find(&guardians)
	c.JSON(http.StatusOK, &guardians)
}
