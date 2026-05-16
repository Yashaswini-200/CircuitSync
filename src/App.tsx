import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Streaks from './pages/Streaks';
import Battles from './pages/Battles';
import Teams from './pages/Teams';
import Profile from './pages/Profile';
import Lounge from './pages/Lounge';
import './index.css';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/streaks" element={<Streaks />} />
          <Route path="/battles" element={<Battles />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/lounge" element={<Lounge />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
