package com.bits.vaccination.portal.serviceimpl;

import com.bits.vaccination.portal.dto.VaccinationDriveDTO;
import com.bits.vaccination.portal.model.VaccinationDrive;
import com.bits.vaccination.portal.repository.VaccinationDriveRepository;
import com.bits.vaccination.portal.service.VaccinationDriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class VaccinationDriveServiceImpl implements VaccinationDriveService {

	@Autowired
	private VaccinationDriveRepository vaccinationDriveRepository;

	@Override
	public VaccinationDriveDTO createDrive(VaccinationDriveDTO driveDTO) {
		// Check for overlapping drives
		checkDriveOverlap(driveDTO);

		// Convert DTO to entity (you can use a mapper or manually map fields)
		VaccinationDrive vaccinationDrive = new VaccinationDrive();
		vaccinationDrive.setVaccineName(driveDTO.getVaccineName());
		vaccinationDrive.setDriveDate(driveDTO.getDriveDate());
		vaccinationDrive.setAvailableDoses(driveDTO.getAvailableDoses());
		vaccinationDrive.setApplicableClasses(driveDTO.getApplicableClasses());

		// Save to the database
		VaccinationDrive savedDrive = vaccinationDriveRepository.save(vaccinationDrive);

		// Return DTO (you can convert entity back to DTO if needed)
		return new VaccinationDriveDTO(savedDrive);
	}

	@Override
	public VaccinationDriveDTO updateDrive(Long id, VaccinationDriveDTO driveDTO) {
		// Find existing drive
		VaccinationDrive existingDrive = vaccinationDriveRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Drive not found"));

		// Check for overlapping drives
		checkDriveOverlap(driveDTO);

		// Update fields
		existingDrive.setVaccineName(driveDTO.getVaccineName());
		existingDrive.setDriveDate(driveDTO.getDriveDate());
		existingDrive.setAvailableDoses(driveDTO.getAvailableDoses());
		existingDrive.setApplicableClasses(driveDTO.getApplicableClasses());

		// Save updated drive
		VaccinationDrive updatedDrive = vaccinationDriveRepository.save(existingDrive);

		return new VaccinationDriveDTO(updatedDrive);
	}

	@Override
	public void deleteDrive(Long id) {
		// Check if drive exists before deleting
		vaccinationDriveRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Drive not found"));

		vaccinationDriveRepository.deleteById(id);
	}

	@Override
	public VaccinationDriveDTO getDrive(Long id) {
		VaccinationDrive vaccinationDrive = vaccinationDriveRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Drive not found"));

		return new VaccinationDriveDTO(vaccinationDrive);
	}

	@Override
	public List<VaccinationDriveDTO> getUpcomingDrives() {
		List<VaccinationDrive> upcomingDrives = vaccinationDriveRepository.findByDriveDateAfter(LocalDate.now());
		return VaccinationDriveDTO.fromEntities(upcomingDrives);
	}

	private void checkDriveOverlap(VaccinationDriveDTO driveDTO) {
		List<VaccinationDrive> conflictingDrives = vaccinationDriveRepository
				.findByDriveDateAndApplicableClasses(driveDTO.getDriveDate(), driveDTO.getApplicableClasses());

		if (!conflictingDrives.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Drive on this date for these classes already exists.");
		}
	}
}
