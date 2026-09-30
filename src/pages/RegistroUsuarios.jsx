import Menu from "../components/Menu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/estilos.css";
import ImgGestion from "../assets/imagenes/gestion.jpg";

function RegistroUsuarios() {

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        password: "",
    });

    const [perfiles, setPerfiles] = useState([]);
    const [perfil, setPerfil] = useState("");

    

    useEffect(() => {
        cargarPerfiles();        
    }, []);

    const cargarPerfiles = async () => {
        try {
            const response = await fetch("http://localhost:3001/perfiles");
            const data = await response.json();

            setPerfiles(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    return (


        <div className="d-flex">

            <Menu />

            <div className="container-fluid p-4">
                <main className="flex-grow-1">

                    <div className="row d-flex justify-content-center align-items-center h-100" id="div-proyecto">
                        <div className="col">
                            <div className="card card-registration my-4">
                                <div className="row g-0" style={{ width: "100%" }}>
                                    {/*<div className="col-xl-6 d-none d-xl-block" style={{ alignContent: "center" }}>
                                        <img src={ImgGestion}
                                            alt="Gestion proyectos" className="img-fluid"
                                            style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem' }} />
                                    </div>*/}
                                    <div>
                                        <div className="card-body p-md-5 text-black" style={{ marginTop: "-5%" }}>
                                            <h3 className="mb-5 text-uppercase">Registro de Usuarios</h3>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto" >
                                                <label htmlFor="form3Example8" className="form-label">Nombre completo</label>
                                                <input type="text" id="form3Example8" className="form-control form-control-lg" />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Apellido paterno</label>
                                                <input type="text" id="form3Example8" className="form-control form-control-lg" />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Apellido materno</label>
                                                <input type="text" id="form3Example8" className="form-control form-control-lg" />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Email</label>
                                                <input type="email" id="form3Example8" className="form-control form-control-lg" />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Password</label>
                                                <input type="password" id="form3Example8" className="form-control form-control-lg" />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Confirmar Password</label>
                                                <input type="password" id="form3Example8" className="form-control form-control-lg" />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Perfil</label>
                                                <select className="form-select" aria-label="Default select example" value={perfil} onChange={(e) => setPerfil(e.target.value)}>
                                                    <option selected>Seleccionar perfil</option>
                                                    {perfiles.map((item) => (
                                                        <option
                                                            key={item.idperfil}
                                                            value={item.idperfil}
                                                        >
                                                            {item.descripcion}
                                                        </option>
                                                    ))}

                                                </select>
                                            </div>

                                            <div className="d-flex justify-content-end pt-3">
                                                <input className="btn btn-bis" type="submit" value="Registrar usuario" />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </main>
            </div>
        </div>
    );
}

export default RegistroUsuarios;
