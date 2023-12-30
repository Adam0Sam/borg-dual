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
        <main className='main'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<CustomPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
