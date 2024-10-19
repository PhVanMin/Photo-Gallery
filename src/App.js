import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhotoList from './page/list';
import Landing from './page/landing';
import PhotoInfo from './page/info';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/photos" element={<PhotoList />} />
        <Route path="/photos/:id" element={<PhotoInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
