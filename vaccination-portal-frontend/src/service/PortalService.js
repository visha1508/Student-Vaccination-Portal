// Service/UserService.js
import axios from "axios";

class PortalService {
  baseUrl = `http://localhost:8080/`;

  login(loginDto) {
    return axios.post(this.baseUrl + "api/auth/admin/login", loginDto);
  }

  getDashboardMetrics() {
    return axios.get(this.baseUrl + "api/dashboard");
  }

  // Get all students
  getAllStudents() {
    return axios.get(this.baseUrl + "api/students");
  }

  // Add a new student
  addStudent(student) {
    return axios.post(this.baseUrl + "api/students", student);
  }

  // Update an existing student
  updateStudent(id, student) {
    return axios.put(`${this.baseUrl}api/students/${id}`, student);
  }

  // Delete a student
  deleteStudent(id) {
    return axios.delete(`${this.baseUrl}api/students/${id}`);
  }

  // Search students by name, grade, or vaccination status
  searchStudents(searchParams) {
    const { name, grade, vaccinated } = searchParams;
    return axios.get(this.baseUrl + "api/students/search", {
      params: { name, grade, vaccinated }
    });
  }

  // Drives
 getUpcomingDrives() {
    return axios.get(this.baseUrl + "api/drives/upcoming");
  }

  createDrive(driveDTO) {
    return axios.post(this.baseUrl + "api/drives", driveDTO);
  }

  updateDrive(id, driveDTO) {
    return axios.put(this.baseUrl + `api/drives/${id}`, driveDTO);
  }

  deleteDrive(id) {
    return axios.delete(this.baseUrl + `api/drives/${id}`);
  }

  bulkImportStudents(formData) {
    return axios.post("http://localhost:8080/api/students/bulk-import", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
}
}
export { PortalService };
