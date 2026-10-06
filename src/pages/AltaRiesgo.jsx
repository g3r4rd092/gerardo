import Menu from "../components/Menu";
import { useState } from "react";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function AltaRiesgo(){

    const [form, setForm] = useState({
        nombre: "",
        apepat: "",
        apemat: "",
        correo: "",
        password: "",
        confirmPassword: "",
        perfil: ""
    });

    return (
        <div className="d-flex">
            <Menu />
            <div className="container-fluid p-4">
                <main className="flex-grow-1">
                    <div className="row d-flex justify-content-center align-items-center h-100" id="div-proyecto">
                        <div className="col">
                            <div className="card card-registration my-4">
                                <div className="row g-0" style={{ width: "100%" }}>
                                    <div>
                                        <div className="card-body p-md-5 text-black" style={{ marginTop: "-5%" }}>

                                            <h3 className="mb-5 text-uppercase">
                                                Registro de Usuarios
                                            </h3>

                                            {/* Nombre */}
                                            <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                <label htmlFor="form3Example8" className="form-label">Nombre completo</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg mb-3"
                                                    id="form3Example8"
                                                    value={form.nombre}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            nombre: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>

                                            {/* Apellido paterno */}
                                            <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                <label htmlFor="form3Example8" className="form-label">Apellido paterno</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg mb-3"
                                                    id="form3Example8"
                                                    value={form.apepat}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            apepat: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>

                                            {/* Apellido materno */}
                                            <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                <label htmlFor="form3Example8" className="form-label">Apellido materno</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg mb-3"
                                                    id="form3Example8"
                                                    value={form.apemat}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            apemat: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>

                                            {/* Correo */}
                                            <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                <label htmlFor="form3Example8" className="form-label">Correo electrónico</label>
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg mb-3"
                                                    id="form3Example8"
                                                    value={form.correo}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            correo: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>

                                            {/* Password */}
                                            <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                <label htmlFor="form3Example8" className="form-label">Contraseña</label>
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg mb-3"
                                                    id="form3Example8"
                                                    value={form.password}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            password: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>

                                            {/* Confirmar Password */}
                                            <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                <label htmlFor="form3Example8" className="form-label">Confirmar contraseña</label>
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg mb-3"
                                                    id="form3Example8"
                                                    value={form.confirmPassword}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            confirmPassword: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>

                                            {/* Perfil */}
                                            <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                <label htmlFor="form3Example8" className="form-label">Perfil</label>
                                                <select
                                                    className="form-select mb-3"
                                                    value={form.perfil}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            perfil: e.target.value
                                                        })
                                                    }
                                                    style={{ fontSize: "12px", padding: "0.5rem" }}
                                                >
                                                    <option value="">
                                                        Seleccionar perfil
                                                    </option>

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
                                                <input
                                                    className="btn btn-bis"
                                                    type="button"
                                                    value="Registrar usuario"
                                                    onClick={guardarUsuario}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div >
    );

}
export default AltaRiesgo;