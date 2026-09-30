import Menu from "../components/Menu";
import React, { useState } from "react";
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

    return (


        <div className="d-flex">

            <Menu />
            <style>
                

            </style>

            <div className="container-fluid p-4">
                <main className="flex-grow-1">

                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card card-registration my-4">
                                <div className="row g-0">
                                    <div className="col-xl-6 d-none d-xl-block" style={{ alignItems: "center" }}>
                                        <img src={ImgGestion}
                                            alt="Gestion proyectos" className="img-fluid"
                                            style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem' }} />
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="card-body p-md-5 text-black">
                                            <h3 className="mb-5 text-uppercase">Registro de Usuarios</h3>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="text" id="form3Example8" className="form-control form-control-lg" placeholder="Nombre completo" />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="text" id="form3Example8" className="form-control form-control-lg" placeholder="Apellido paterno" />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="text" id="form3Example8" className="form-control form-control-lg" placeholder="Apellido materno" />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="email" id="form3Example8" className="form-control form-control-lg" placeholder="Email" />

                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="password" id="form3Example8" className="form-control form-control-lg" placeholder="Password" />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="password" id="form3Example8" className="form-control form-control-lg" placeholder="Confirmar Password" />
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
