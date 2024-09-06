package license

import (
	"net/http"

	"example.com/dormitory/config"
	"example.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

func GetAll(c *gin.Context) {
	db := config.DB()
	var license []entity.License
	db.Find(&license)
	c.JSON(http.StatusOK, &license)
}
