package com.bits.vaccination.portal.serviceimpl;

import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bits.vaccination.portal.dto.AdminDTO;
import com.bits.vaccination.portal.dto.StudentDTO;
import com.bits.vaccination.portal.model.Student;
import com.bits.vaccination.portal.repository.StudentRepository;
import com.bits.vaccination.portal.service.StudentService;
import org.springframework.web.multipart.MultipartFile;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;
    
    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @Override
    public StudentDTO addStudent(StudentDTO studentDTO) {
        Student student = mapToEntity(studentDTO);
        if (studentRepository.existsByNameAndGradeAndVaccineNameAndVaccinatedIsTrue(
                student.getName(),
                student.getGrade(),
                student.getVaccineName())) {
            return null;
        } else {
            Student savedStudent = studentRepository.save(student);
            return mapToDTO(savedStudent);
        }
    }

    @Override
    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            student.setName(studentDTO.getName());
            student.setGrade(studentDTO.getGrade());
            student.setVaccinated(studentDTO.isVaccinated());
            student.setVaccinationDate(studentDTO.getVaccinationDate());
            student.setVaccineName(studentDTO.getVaccineName());
            if (studentRepository.existsByNameAndGradeAndVaccineNameAndVaccinatedIsTrue(
                    student.getName(),
                    student.getGrade(),
                    student.getVaccineName())) {
                return null;
            } else {
                Student updatedStudent = studentRepository.save(student);
                return mapToDTO(updatedStudent);
            }
        } else {
            throw new RuntimeException("Student not found with id: " + id);
        }
    }

    @Override
    public void deleteStudent(Long id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
        } else {
            throw new RuntimeException("Student not found with id: " + id);
        }
    }

    @Override
    public StudentDTO getStudent(Long id) {
        Optional<Student> student = studentRepository.findById(id);
        return student.map(this::mapToDTO)
                      .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    @Override
    public List<StudentDTO> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                       .map(this::mapToDTO)
                       .collect(Collectors.toList());
    }

    @Override
    public List<StudentDTO> searchStudents(String name, String grade, Boolean vaccinated) {
        List<Student> students = studentRepository.findAll().stream()
                .filter(student -> (name == null || student.getName().equalsIgnoreCase(name)) &&
                                   (grade == null || student.getGrade().equalsIgnoreCase(grade)) &&
                                   (vaccinated == null || student.isVaccinated() == vaccinated))
                .collect(Collectors.toList());

        return students.stream()
                       .map(this::mapToDTO)
                       .collect(Collectors.toList());
    }

    // Helper method to convert DTO to Entity
    private Student mapToEntity(StudentDTO dto) {
        Student student = new Student();
        student.setName(dto.getName());
        student.setGrade(dto.getGrade());
        student.setVaccinated(dto.isVaccinated());
        student.setVaccinationDate(dto.getVaccinationDate());
        student.setVaccineName(dto.getVaccineName());
        return student;
    }

    // Helper method to convert Entity to DTO
    private StudentDTO mapToDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setName(student.getName());
        dto.setGrade(student.getGrade());
        dto.setVaccinated(student.isVaccinated());
        dto.setVaccinationDate(student.getVaccinationDate());
        dto.setVaccineName(student.getVaccineName());
        return dto;
    }

	@Override
	public AdminDTO adminLogin(AdminDTO loginRequest) {
		if (loginRequest.getUsername().equals(adminUsername) && loginRequest.getPassword().equals(adminPassword)) {
			return loginRequest;
		}
		return null;
	}

    public void bulkImportStudents(MultipartFile file) throws IOException, CsvException {
        CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()));
        List<String[]> records = reader.readAll();

        for (String[] record : records) {
            // Skip if the row doesn't have at least the required fields
//            if (record.length < 3) continue;

            Student student = new Student();
            student.setName(record[0].trim());
            student.setGrade(record[1].trim());
            student.setVaccinated(Boolean.parseBoolean(record[2].trim()));

            // Optional fields: vaccinationDate and vaccineName
            if (record.length > 3 && !record[3].isEmpty()) {
                try {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                    student.setVaccinationDate(LocalDate.parse(record[3], formatter));

                } catch (DateTimeParseException e) {
                    // Log and skip invalid dates
                    System.out.println("Invalid date format: " + record[3]);
                }
            }

            if (record.length > 4) {
                student.setVaccineName(record[4].trim());
            }

            if (!studentRepository.existsByNameAndGradeAndVaccineNameAndVaccinatedIsTrue(
                    student.getName(),
                    student.getGrade(),
                    student.getVaccineName())) {
                studentRepository.save(student);
            }

        }

    }
}
