package personaldetails

import (
	"errors"
	"net/http"

	"example.com/dormitory/config"
	"example.com/dormitory/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST /create-personal
func CreatePersonalDetails(c *gin.Context) {
	var requestBody struct {
		Personal entity.PersonalInformation
		Address  entity.Address
		Family   entity.Family
		Other    entity.OtherInformation
	}

	// ดึงข้อมูล StudentID จากการเข้าสู่ระบบ (ตัวอย่าง: จาก JWT token หรือ session)
	studentID := c.MustGet("student_id").(string) // สมมุติว่ามีการเก็บ StudentID ไว้ใน context

	// bind เข้าตัวแปร requestBody
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ตรวจสอบว่า Student มีอยู่หรือไม่
	var student entity.Students
	if err := db.Where("student_id = ?", studentID).First(&student).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	// ตั้งค่า student_id ให้กับ Personal
	requestBody.Personal.StudentID = student.ID
	// สร้างข้อมูล Personal
	if err := db.Create(&requestBody.Personal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตั้งค่า student_id ให้กับ Address
	requestBody.Address.StudentID = student.ID
	// บันทึกข้อมูล Address
	if err := db.Create(&requestBody.Address).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตั้งค่า student_id ให้กับ Family
	requestBody.Family.StudentID = student.ID
	// บันทึกข้อมูล Family
	if err := db.Create(&requestBody.Family).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตั้งค่า student_id ให้กับ OtherInformation
	requestBody.Other.StudentID = student.ID
	// บันทึกข้อมูล OtherInformation
	if err := db.Create(&requestBody.Other).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Personal details created successfully"})
}

// GET /list-personal

func ListPersonalDetails(c *gin.Context) {

	var personal []entity.PersonalInformation
	var address []entity.Address
	var family []entity.Family
	var other []entity.OtherInformation

	db := config.DB()

	// Query for personal information
	personalResults := db.Find(&personal)
	if personalResults.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": personalResults.Error.Error()})
		return
	}

	// Query for address information
	addressResults := db.Find(&address)
	if addressResults.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": addressResults.Error.Error()})
		return
	}

	// Query for family information
	familyResults := db.Find(&family)
	if familyResults.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": familyResults.Error.Error()})
		return
	}

	// Query for family information
	otherResults := db.Find(&other)
	if otherResults.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": otherResults.Error.Error()})
		return
	}
	// Combine both results into a map or struct
	response := gin.H{
		"personal": personal,
		"address":  address,
		"family":   family,
		"other":    other,
	}

	// Return combined response
	c.JSON(http.StatusOK, response)
}


func ListAddress(c *gin.Context) {

	var address []entity.Address

	db := config.DB()
	results := db.Find(&address)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, address)
}
