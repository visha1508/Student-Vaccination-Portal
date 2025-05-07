package com.bits.vaccination.portal.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class VaccinationDrive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String vaccineName;
    private LocalDate driveDate;
    private int availableDoses;
    private String applicableClasses;
    
	public VaccinationDrive() {
		super();
	}
	
	public VaccinationDrive(Long id, String vaccineName, LocalDate driveDate, int availableDoses,
			String applicableClasses) {
		super();
		this.id = id;
		this.vaccineName = vaccineName;
		this.driveDate = driveDate;
		this.availableDoses = availableDoses;
		this.applicableClasses = applicableClasses;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getVaccineName() {
		return vaccineName;
	}

	public void setVaccineName(String vaccineName) {
		this.vaccineName = vaccineName;
	}

	public LocalDate getDriveDate() {
		return driveDate;
	}

	public void setDriveDate(LocalDate driveDate) {
		this.driveDate = driveDate;
	}

	public int getAvailableDoses() {
		return availableDoses;
	}

	public void setAvailableDoses(int availableDoses) {
		this.availableDoses = availableDoses;
	}

	public String getApplicableClasses() {
		return applicableClasses;
	}

	public void setApplicableClasses(String applicableClasses) {
		this.applicableClasses = applicableClasses;
	}

    
}
