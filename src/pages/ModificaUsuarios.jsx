import Menu from "../components/Menu";
import { useState } from "react";
import { useCatalogos } from "../hooks/useCatalogos";
import { actualizarUsuario, eliminarEmpleado } from "../services/usuarioService";
import "../css/estilos.css";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function ModificaUsuarios() {

    const [busqueda, setBusqueda] = useState("");

    const [camposHabilitados, setCamposHabilitados] = useState(false);

    const [form, setForm] = useState({
        id_usuario: "",
        nombre: "",
        apepat: "",
        apemat: "",
        correo: "",
        perfil: ""
    });

    const { perfiles } = useCatalogos();

    const buscarUsuario = async () => {

        try {

            const response = await fetch(
                `http://localhost:3001/usuarios/${busqueda}`
            );

            const data = await response.json();

            console.log(data);

            if (!data.success) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Usuario no encontrado, favor de intentar nuevamente"
                });
                setCamposHabilitados(false);
                return;
            }

            setForm({
                id_usuario: data.usuario.id_empleado,
                nombre: data.usuario.nombre,
                apepat: data.usuario.apepat,
                apemat: data.usuario.apemat,
                correo: data.usuario.correo,
                perfil: data.usuario.id_perfil
            });

             setCamposHabilitados(true);
             setBusqueda("");

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al buscar empleado" || error.message
            });
            setCamposHabilitados(false);
        }
    };

    const modificarUsuario = async () => {

        try {

            if (
                !form.nombre ||
                !form.apepat ||
                !form.apemat ||
                !form.correo ||
                !form.perfil
            ) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Todos los campos son obligatorios"
                });
                setCamposHabilitados(false);
            }


            const usuario = {
                nombre: form.nombre,
                apepat: form.apepat,
                apemat: form.apemat,
                correo: form.correo,
                perfil: form.perfil,
                id_usuario: form.id_usuario
            };

            const respuesta = await actualizarUsuario(usuario);

            Swal.fire({
                icon: "success",
                title: respuesta.mensaje,
                timer: 1500,
                text: "Modificación realizada",
                showConfirmButton: false
            });
            setCamposHabilitados(false);

            setForm({
                id_usuario: "",
                nombre: "",
                apepat: "",
                apemat: "",
                correo: "",
                perfil: ""
            });

            setBusqueda("");

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error al actualizar" || error.message,
                icon: "error"
            });

        }
    };

    const bajaEmpleado = async (id) => {

        try {

            const resultado = await Swal.fire({

                title: "¿Eliminar registro?",

                text: "Esta acción no se puede deshacer",

                icon: "warning",

                showCancelButton: true,

                confirmButtonColor: "#d33",

                cancelButtonColor: "#6c757d",

                confirmButtonText: "Sí, eliminar",

                cancelButtonText: "Cancelar"

            });

            if (!resultado.isConfirmed) {

                return;

            }

            const respuesta =
                await eliminarEmpleado(id);

            Swal.fire({
                title: "Operación completada",
                text: respuesta.mensaje,
                icon: "success"
            });

        } catch (error) {

            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error"
            });
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
                                    <div>
                                        <div className="card-body p-md-5 text-black" style={{ marginTop: "-5%" }}>

                                            <h3 className="mb-5 text-uppercase">
                                                Control de usuarios
                                            </h3>

                                            <div
                                                data-mdb-input-init
                                                className="form-outline mb-4 form-group"
                                                id="div-form-proyecto"
                                            >
                                                <label className="form-label">
                                                    Número de empleado o correo
                                                </label>

                                                <div className="d-flex gap-2">

                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg"
                                                        id="form3Example8"
                                                        value={busqueda}
                                                        onChange={(e) => setBusqueda(e.target.value)}
                                                    />

                                                    <button
                                                        className="btn btn-bis"
                                                        type="button"
                                                        onClick={buscarUsuario}
                                                    >
                                                        Buscar
                                                    </button>

                                                </div>
                                            </div>

                                            {/* Nombre */}
                                            <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                <label htmlFor="form3Example8" className="form-label">Nombre completo</label>
                                                <label htmlFor="form3Example8" className="form-label" hidden>
                                                    {form.id_usuario}
                                                </label>
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
                                                    disabled={!camposHabilitados}
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
                                                    disabled={!camposHabilitados}
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
                                                    disabled={!camposHabilitados}
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
                                                    disabled={!camposHabilitados}
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
                                                    disabled={!camposHabilitados}
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
                                                <button
                                                    className="btn btn-warning btn-lg ms-2"
                                                    onClick={modificarUsuario}
                                                    disabled={!camposHabilitados}
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-lg ms-2"
                                                    onClick={() =>
                                                        bajaEmpleado(form.id_usuario)
                                                    }
                                                    disabled={!camposHabilitados}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
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
export default ModificaUsuarios;