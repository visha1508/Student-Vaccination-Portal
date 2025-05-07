package com.bits.vaccination.portal.serviceimpl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bits.vaccination.portal.dto.DashboardMetricsDTO;
import com.bits.vaccination.portal.dto.VaccinationDriveDTO;
import com.bits.vaccination.portal.model.VaccinationDrive;
import com.bits.vaccination.portal.repository.StudentRepository;
import com.bits.vaccination.portal.repository.VaccinationDriveRepository;
import com.bits.vaccination.portal.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private VaccinationDriveRepository vaccinationDriveRepository;

    @Override
    public DashboardMetricsDTO getDashboardMetrics() {
        long totalStudents = studentRepository.count();
        long vaccinatedCount = studentRepository.countByVaccinated(true);
        
        double vaccinationPercentage = 0.0;
        if (totalStudents > 0) {
            vaccinationPercentage = (vaccinatedCount * 100.0) / totalStudents;
        }

        List<VaccinationDrive> upcomingDrivesList = vaccinationDriveRepository.findByDriveDateAfter(LocalDate.now());

        List<VaccinationDriveDTO> upcomingDrives = upcomingDrivesList.stream()
                .map(drive -> new VaccinationDriveDTO(
                        drive.getId(),
                        drive.getVaccineName(),
                        drive.getDriveDate(),
                        drive.getAvailableDoses(),
                        drive.getApplicableClasses()
                ))
                .collect(Collectors.toList());

        DashboardMetricsDTO metricsDTO = new DashboardMetricsDTO();
        metricsDTO.setTotalStudents(totalStudents);
        metricsDTO.setVaccinatedCount(vaccinatedCount);
        metricsDTO.setVaccinationPercentage(vaccinationPercentage);
        metricsDTO.setUpcomingDrives(upcomingDrives);

        return metricsDTO;
    }
}
