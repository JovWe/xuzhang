import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProloguePage from '@/pages/ProloguePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProloguePage />} />
      </Routes>
    </Router>
  );
}