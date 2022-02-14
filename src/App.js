import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp/SignUp';
import ForgotPassword from './components/Login/ForgotPassword/ForgotPassword';
import ChangePassword from './components/Login/ChangePassword/ChangePassword';
import ProtectedRoutes from '../src/ProtectedRoutes';
import Boats from './components/Boats/Boats';
import Experiences from './components/Dashboard/Experiences';
import Docks from './components/Dashboard/Docks';
import MyBoats from './components/MyBoats/MyBoats';
import AddNewBoats from './components/AddNewBoats/AddNewBoats';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/boats' element={<MyBoats />} />
            <Route path='/addnewboats' element={<AddNewBoats />} />
            <Route path='/bookings/boats' element={<Boats />} />
            <Route path='/bookings/experiences' element={<Experiences />} />
            <Route path='/bookings/docks' element={<Docks />} />
            <Route path='/changepassword' element={<ChangePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
