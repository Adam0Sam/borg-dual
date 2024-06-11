import { RouterProvider, Routes, Route, redirect, createBrowserRouter, createRoutesFromElements, useRouteError } from 'react-router-dom';
// top level components
import Home from './pages/Home';
import CustomPage from './pages/CustomPage';
import MenuNav from './components/MenuNav';
// carousel context provider
import CarouselProvider from './context/CarouselProvider';

import './App.css';
import LodgeExample from './components/lodge/LodgeExample';
import LoadingWheel from './components/wheel/LoadingWheel';
import RootLayout from './pages/RootLayout';

/**
 * Renders the main application component.
 *
 * @returns {JSX.Element} The rendered application component.
 */
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path='lodge-example' loader={() => redirect('1')} />
        <Route path="lodge-example/:taskId" element={<LodgeExample />} />
        <Route path=":slug" element={<CustomPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />
}

export default App;
