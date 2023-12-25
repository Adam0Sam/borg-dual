import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import CustomPage from './pages/CustomPage';
import MenuNav from './components/MenuNav';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <MenuNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<CustomPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
