package com.bits.vaccination.portal.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.bits.vaccination.portal.model.VaccinationDrive;

public class VaccinationDriveDTO {

	private Long id;
	private String vaccineName;
	private LocalDate driveDate;
	private int availableDoses;
	private String applicableClasses;

	// Default constructor for Jackson deserialization
	public VaccinationDriveDTO() {}

	// Constructor accepting all fields
	public VaccinationDriveDTO(Long id, String vaccineName, LocalDate driveDate, int availableDoses, String applicableClasses) {
		this.id = id;
		this.vaccineName = vaccineName;
		this.driveDate = driveDate;
		this.availableDoses = availableDoses;
		this.applicableClasses = applicableClasses;
	}

	// Constructor accepting a VaccinationDrive object
	public VaccinationDriveDTO(VaccinationDrive vaccinationDrive) {
		this.id = vaccinationDrive.getId();
		this.vaccineName = vaccinationDrive.getVaccineName();
		this.driveDate = vaccinationDrive.getDriveDate();
		this.availableDoses = vaccinationDrive.getAvailableDoses();
		this.applicableClasses = vaccinationDrive.getApplicableClasses();
	}

	// Static method to map a list of VaccinationDrive entities to DTOs
	public static List<VaccinationDriveDTO> fromEntities(List<VaccinationDrive> drives) {
		return drives.stream()
				.map(VaccinationDriveDTO::new) // Convert each VaccinationDrive to VaccinationDriveDTO
				.collect(Collectors.toList());
	}

	// Getters and setters (assuming they're present)

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
