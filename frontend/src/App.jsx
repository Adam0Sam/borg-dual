import { RouterProvider, Route, redirect, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';

import CustomPage from './pages/CustomPage';
import LodgeExample from './components/lodge/LodgeExample';
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
        <Route path="/" element={<CustomPage passedSlug='home' />} />
        <Route path='lodge-example' loader={() => redirect('1')} />
        <Route path="lodge-example/:taskId" element={<LodgeExample />} />
        <Route path=":slug" element={<CustomPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />
}

export default App;
