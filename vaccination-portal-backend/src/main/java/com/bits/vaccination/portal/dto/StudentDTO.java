package com.bits.vaccination.portal.dto;

import java.time.LocalDate;

public class StudentDTO {
    private Long id;
    private String name;
    private String grade;
    private boolean vaccinated;
    private LocalDate vaccinationDate;
    private String vaccineName;
	public StudentDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public StudentDTO(Long id, String name, String grade, boolean vaccinated, LocalDate vaccinationDate,
			String vaccineName) {
		super();
		this.id = id;
		this.name = name;
		this.grade = grade;
		this.vaccinated = vaccinated;
		this.vaccinationDate = vaccinationDate;
		this.vaccineName = vaccineName;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	public boolean isVaccinated() {
		return vaccinated;
	}
	public void setVaccinated(boolean vaccinated) {
		this.vaccinated = vaccinated;
	}
	public LocalDate getVaccinationDate() {
		return vaccinationDate;
	}
	public void setVaccinationDate(LocalDate vaccinationDate) {
		this.vaccinationDate = vaccinationDate;
	}
	public String getVaccineName() {
		return vaccineName;
	}
	public void setVaccineName(String vaccineName) {
		this.vaccineName = vaccineName;
	}

    
}

