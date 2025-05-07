package com.bits.vaccination.portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bits.vaccination.portal.dto.VaccinationDriveDTO;
import com.bits.vaccination.portal.service.VaccinationDriveService;


@RestController
@RequestMapping("/api/drives")
@CrossOrigin( origins = "*")
public class VaccinationDriveController {
    @Autowired
    private VaccinationDriveService driveService;

    @PostMapping
    public ResponseEntity<VaccinationDriveDTO> createDrive(@RequestBody VaccinationDriveDTO driveDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(driveService.createDrive(driveDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VaccinationDriveDTO> updateDrive(@PathVariable Long id, @RequestBody VaccinationDriveDTO driveDTO) {
        return ResponseEntity.ok(driveService.updateDrive(id, driveDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDrive(@PathVariable Long id) {
        driveService.deleteDrive(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VaccinationDriveDTO> getDrive(@PathVariable Long id) {
        return ResponseEntity.ok(driveService.getDrive(id));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<VaccinationDriveDTO>> getUpcomingDrives() {
        return ResponseEntity.ok(driveService.getUpcomingDrives());
    }
}
