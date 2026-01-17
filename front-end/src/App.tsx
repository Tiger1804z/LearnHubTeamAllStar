import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/layout/Navbar';

import Home from './pages/explore/Home';
import Courses from './pages/explore/Courses';
import CourseDetail from './pages/explore/CourseDetail';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Lesson from './pages/learning/Lesson';

import LearnerDashboard from './pages/dashboard/LearnerDashboard';
import CreatorDashboard from './pages/dashboard/CreatorDashboard';

import CreateCourse from './pages/creator/CreateCourse';

import Forum from './pages/community/Forum';
import StudyGroup from './pages/community/StudyGroup';
import Profile from './pages/profile/Profile';
import Mentorship from './pages/mentorship/Mentorship';

import AdminDashboard from './pages/admin/Dashboard';



export default function App() {
  return (
    <AuthProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/lesson/:id" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />

        <Route path="/dashboard/student" element={<ProtectedRoute><LearnerDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/creator" element={<ProtectedRoute><CreatorDashboard /></ProtectedRoute>} />

        <Route path="/create-course" element={<ProtectedRoute><CreateCourse /></ProtectedRoute>} />

        <Route path="/forum" element={<Forum />} />
        <Route path="/groups" element={<StudyGroup />} />

        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/mentorship" element={<ProtectedRoute><Mentorship /></ProtectedRoute>} />

        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

        <Route path="/dashboard" element={<ProtectedRoute><LearnerDashboard /></ProtectedRoute>} />

      </Routes>
    </AuthProvider>
  );
}
