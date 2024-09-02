package entity

import (
	"time"

	"gorm.io/gorm"
)

type OtherInformation struct {
	gorm.Model
	LatestGraduationFrom string     `json:"latest_graduation_from"`
	GraduatedYear        uint       `json:"graduated_year"`
	Gpax                 float64    `json:"gpax"`
	PersonalVehicles     *string    `json:"personal_vehicles"`
	Color                *string    `json:"color"`
	PlateNo              *string    `json:"plate_no"`
	TaxDate              *time.Time `json:"tax_date"`
	Province             *string    `json:"province"`
	DriverLicense        *string    `json:"driver_license"`
	Type                 *string    `json:"type"`
	ExpiredCard          *time.Time `json:"expired_card"`

	// One-to-one relationship with Student
	//StudentID string
	StudentID uint      `json:"student_id"`
	Student   *Students `gorm:"foreignKey:StudentID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"student"`
}
