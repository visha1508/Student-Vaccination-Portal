package com.bits.vaccination.portal.service;

import java.io.IOException;
import java.util.List;

import com.opencsv.exceptions.CsvException;
import org.springframework.stereotype.Service;

import com.bits.vaccination.portal.dto.AdminDTO;
import com.bits.vaccination.portal.dto.StudentDTO;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface StudentService {
    StudentDTO addStudent(StudentDTO studentDTO);
    StudentDTO updateStudent(Long id, StudentDTO studentDTO);
    void deleteStudent(Long id);
    StudentDTO getStudent(Long id);
    List<StudentDTO> getAllStudents();
    List<StudentDTO> searchStudents(String name, String grade, Boolean vaccinated);
    AdminDTO adminLogin(AdminDTO loginRequest);
    void bulkImportStudents(MultipartFile file) throws IOException, CsvException;
}
