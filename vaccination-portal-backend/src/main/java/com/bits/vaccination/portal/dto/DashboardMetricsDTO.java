package com.bits.vaccination.portal.dto;

import java.util.List;

public class DashboardMetricsDTO {
    private long totalStudents;
    private long vaccinatedCount;
    private double vaccinationPercentage;
    private List<VaccinationDriveDTO> upcomingDrives;
	public DashboardMetricsDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public DashboardMetricsDTO(long totalStudents, long vaccinatedCount, double vaccinationPercentage,
			List<VaccinationDriveDTO> upcomingDrives) {
		super();
		this.totalStudents = totalStudents;
		this.vaccinatedCount = vaccinatedCount;
		this.vaccinationPercentage = vaccinationPercentage;
		this.upcomingDrives = upcomingDrives;
	}
	public long getTotalStudents() {
		return totalStudents;
	}
	public void setTotalStudents(long totalStudents) {
		this.totalStudents = totalStudents;
	}
	public long getVaccinatedCount() {
		return vaccinatedCount;
	}
	public void setVaccinatedCount(long vaccinatedCount) {
		this.vaccinatedCount = vaccinatedCount;
	}
	public double getVaccinationPercentage() {
		return vaccinationPercentage;
	}
	public void setVaccinationPercentage(double vaccinationPercentage) {
		this.vaccinationPercentage = vaccinationPercentage;
	}
	public List<VaccinationDriveDTO> getUpcomingDrives() {
		return upcomingDrives;
	}
	public void setUpcomingDrives(List<VaccinationDriveDTO> upcomingDrives) {
		this.upcomingDrives = upcomingDrives;
	}

    
}
