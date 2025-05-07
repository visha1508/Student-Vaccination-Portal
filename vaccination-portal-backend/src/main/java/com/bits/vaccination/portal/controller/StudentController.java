package com.bits.vaccination.portal.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bits.vaccination.portal.dto.StudentDTO;
import com.bits.vaccination.portal.service.StudentService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/students")
@CrossOrigin( origins = "*")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping
    public Optional<Object> addStudent(@RequestBody StudentDTO studentDTO) {
        if(studentService.addStudent(studentDTO) != null)
            return Optional.ofNullable(ResponseEntity.status(HttpStatus.CREATED).body("Student Added Successfully"));
        else
            return Optional.ofNullable(ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Student has already been vaccinated with this vaccine."));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable Long id, @RequestBody StudentDTO studentDTO) {
        return ResponseEntity.ok(studentService.updateStudent(id, studentDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudent(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudent(id));
    }

    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/search")
    public ResponseEntity<List<StudentDTO>> searchStudents(@RequestParam(required = false) String name,
                                                            @RequestParam(required = false) String grade,
                                                            @RequestParam(required = false) Boolean vaccinated) {
        return ResponseEntity.ok(studentService.searchStudents(name, grade, vaccinated));
    }

    @PostMapping("/bulk-import")
    public ResponseEntity<String> bulkImportStudents(@RequestParam("file") MultipartFile file) {
        try {
            studentService.bulkImportStudents(file);
            return ResponseEntity.ok("Students imported successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error importing students: " + e.getMessage());
        }
    }
}
