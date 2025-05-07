package com.bits.vaccination.portal.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bits.vaccination.portal.model.Student;
import com.bits.vaccination.portal.model.VaccinationDrive;


public interface StudentRepository extends JpaRepository<Student, Long> {

    // You can add custom query methods if needed, like:
    // List<Student> findByVaccinated(boolean vaccinated);
    // List<Student> findByGrade(String grade);
    // Optional<Student> findByName(String name);
	long countByVaccinated(Boolean vaccinated);
    boolean existsByNameAndGradeAndVaccineNameAndVaccinatedIsTrue(
            String name,
            String grade,
            String vaccineName
    );
	
}
