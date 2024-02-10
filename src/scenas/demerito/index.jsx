import { useState } from 'react';
import DemeritoTable from "../tablas/tablaDemerito";
import "./style.css";
import AddDemerito from "../../modal/addDemeritos";


const Demeritos = () => {

    const [modalOpen, setModalOpen] = useState(false);

    return(
        <div>
            <div className='users'>
                <div className='info'>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1>Demeritos</h1>
                    <button
                        className="btnAdd"
                        
                        onClick={() => {
                            setModalOpen(true);
                        }}
                    >Aplicar Demerito</button>
                </div>
                    <DemeritoTable slug="users"/>
                    {modalOpen && <AddDemerito setOpenModal={setModalOpen} />}

            </div>
        </div>
    )
}

export default Demeritos;

