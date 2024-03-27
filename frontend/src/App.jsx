import { BrowserRouter, Routes, Route } from 'react-router-dom';
// top level components
import Home from './pages/Home';
import CustomPage from './pages/CustomPage';
import MenuNav from './components/MenuNav';
// carousel context provider
import CarouselProvider from './context/CarouselProvider';

import './App.css';

/**
 * Renders the main application component.
 *
 * @returns {JSX.Element} The rendered application component.
 */
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <MenuNav />
        <main className='main'>
          <CarouselProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:slug" element={
                <CustomPage />
              } />
            </Routes>
          </CarouselProvider>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
