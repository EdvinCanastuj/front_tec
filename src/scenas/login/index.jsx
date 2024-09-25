import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import imagenTeczion from "./logo.png";
import "./style.css";
import { useAuth } from "../../auth/AuthProvider";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [nombre_usuario, setNombreUsuario] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    if (auth.isAuthenticated) {
        return <Navigate to="/home" />;
    };
    
    return(
        <div className="login template d-flex justify-content-center align-items-center vh-100 ">
        <div className="form_container p-5 rounded bg-white">
            <form >
                <div className="text-center">
                    <img src={imagenTeczion} alt="Logo" className="mb-4" style={{ width: '50%', height: 'auto' }} />
                </div>
                <h3 className="text-center">Login</h3>
                <div className="mb-4">
                    <label htmlFor="user"> <h4>Usuario</h4> </label>
                    <input 
                        type="text" 
                        placeholder="Ingrese su Usuario" 
                        className="form-control" 
                        value={nombre_usuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="contraseña"> <h4>Contraseña</h4> </label>
                    <input 
                        type="password" 
                        placeholder="Ingrese su contraseña" 
                        className="form-control" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                
                <div className="d-grid mb-4">
                    <button type="submit" className="btn btn-primary">Iniciar sesion</button>
                </div>
                
            </form>
        </div>
    </div>
    )
};

export default Login;
