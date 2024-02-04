import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

//Routes
import Login from './scenas/login/index';
import { UserRoleProvider } from "./scenas/login/UserRoleContext";
import { UserIdProvider } from "./scenas/login/UserIdContext";
import Navbar from './scenas/navbar';
import UserAdd from './scenas/usuarios/index';
import Demeritos from './scenas/demerito/index';

function PrivateRoute({ element, isLoggedIn }) {
  return isLoggedIn ? element : <Navigate to="/" />;
}
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <UserRoleProvider>
          <UserIdProvider>
            <ToastContainer />
            <Routes>
              <Route 
                path="/" 
                element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route
                path="/home"
                element={<PrivateRoute isLoggedIn={isLoggedIn} />}
              />
            </Routes>
            <Routes>
              <Route path="/home" element={<Navbar />} />
            </Routes>
            <Routes>
              <Route path="/home/user" element={<UserAdd />} />
            </Routes>
            <Routes>
              <Route path="/home/demeritos" element={<Demeritos />} />
            </Routes>
          </UserIdProvider>
        </UserRoleProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
