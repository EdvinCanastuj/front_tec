import HistorialTab from  "../tablas/tablaHistorialDemerito";
const historial = () => {
    return(
        <div>
        <div className="container text-center mt-5">
        <h1>Historial</h1>
        </div>

        <div className="historial">
        <HistorialTab slug="historial"/>
        </div>
        </div>
    )
}
export default historial;