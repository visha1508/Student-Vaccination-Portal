import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import StudentForm from './pages/StudentForm';
import StudentList from './pages/StudentList';
import DriveManager from './pages/DriveManager';
import ReportsPage from './pages/ReportsPage';
import NavigationBar from './pages/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppWrapper() {
  const location = useLocation();

  // Hide NavigationBar only on Login page
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <NavigationBar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/students" element={<StudentForm />} />
        <Route path="/studentlist" element={<StudentList />} />
        <Route path="/drives" element={<DriveManager />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
