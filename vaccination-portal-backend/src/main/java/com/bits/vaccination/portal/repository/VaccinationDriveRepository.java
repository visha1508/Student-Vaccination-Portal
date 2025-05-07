package com.bits.vaccination.portal.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bits.vaccination.portal.model.VaccinationDrive;


public interface VaccinationDriveRepository extends JpaRepository<VaccinationDrive, Long> {

    // Example of custom methods you could add:
    // List<VaccinationDrive> findByVaccineName(String vaccineName);
    // List<VaccinationDrive> findByDriveDate(LocalDate driveDate);
	List<VaccinationDrive> findByDriveDateAfter(LocalDate date);

    List<VaccinationDrive> findByDriveDateAndApplicableClasses(LocalDate driveDate, String applicableClasses);

    // You can also define other queries like:
//    List<VaccinationDrive> findByDriveDateAfter(LocalDate date);
}
