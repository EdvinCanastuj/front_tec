import tec from "../login/logo.png"

const Bienvenida = () => {
    
    
    return (
        <div className="container text-center mt-5">
        <h1>Bienvenido</h1>
        <img src={tec} alt="Imagen" className="img-fluid" style={{ width: '40%', height: 'auto' }}/>
        </div>
    );
}

export default Bienvenida;