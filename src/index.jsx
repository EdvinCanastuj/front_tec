import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './scenas/login';
import Navbar from './scenas/navbar';
import UsuarioTab from './scenas/tablas/tablaUsuarios';
import HistorialTab from './scenas/tablas/tablaHistorialDemerito';
import ProtectedRouter from './ProtectedRouter';
import { AuthProvider } from './auth/AuthProvider';
//import reportWebVitals from './reportWebVitals';
const router = createBrowserRouter(
[
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRouter />,
    children: [
      {
        path: "home",
        element: <Navbar />,
      },
      {
        path: "usuarios",
        element: <UsuarioTab />,
      },
      {
        path: "historial",
        element: <HistorialTab />,
      },
    ],
  },
]
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
