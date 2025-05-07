package com.bits.vaccination.portal.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bits.vaccination.portal.dto.VaccinationDriveDTO;

@Service
public interface VaccinationDriveService {
    VaccinationDriveDTO createDrive(VaccinationDriveDTO driveDTO);
    VaccinationDriveDTO updateDrive(Long id, VaccinationDriveDTO driveDTO);
    void deleteDrive(Long id);
    VaccinationDriveDTO getDrive(Long id);
    List<VaccinationDriveDTO> getUpcomingDrives();
}
