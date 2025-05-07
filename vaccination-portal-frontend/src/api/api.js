// src/services/api.js

// Base URL of your backend API
export const API_BASE_URL = 'http://localhost:8080/api'; // 🔥 Change this ONLY if needed

// Authentication APIs
export const LOGIN_API_URL = `${API_BASE_URL}/admin/login`;

// Students APIs
export const STUDENTS_API_URL = `${API_BASE_URL}/students`;
export const STUDENT_SEARCH_API_URL = `${API_BASE_URL}/students/search`;
export const STUDENT_BULK_UPLOAD_API_URL = `${API_BASE_URL}/students/upload`;

// Vaccination Drives APIs
export const VACCINATION_DRIVES_API_URL = `${API_BASE_URL}/vaccination-drives`;
export const CREATE_DRIVE_API_URL = `${API_BASE_URL}/vaccination-drives/create`;
export const UPDATE_DRIVE_API_URL = (id) => `${API_BASE_URL}/vaccination-drives/${id}`;
export const DELETE_DRIVE_API_URL = (id) => `${API_BASE_URL}/vaccination-drives/${id}`;

// Dashboard Metrics API
export const DASHBOARD_METRICS_API_URL = `${API_BASE_URL}/dashboard/metrics`;

// Vaccination API (mark student vaccinated)
export const MARK_VACCINATED_API_URL = (studentId) => `${API_BASE_URL}/students/${studentId}/vaccinate`;

