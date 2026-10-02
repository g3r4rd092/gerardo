import Menu from "../components/Menu";
import { useState } from "react";
import { useCatalogos } from "../hooks/useCatalogos";
import { actualizarUsuario } from "../services/usuarioService";
import "../css/estilos.css";

function ModificaUsuarios() {

    const [busqueda, setBusqueda] = useState("");

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

            if (!data.success) {

                alert("Usuario no encontrado");
                return;
            }

            setForm({
                id_usuario: data.usuario.id_usuario,
                nombre: data.usuario.nombre,
                apepat: data.usuario.apepat,
                apemat: data.usuario.apemat,
                correo: data.usuario.correo,                
                perfil: data.usuario.id_perfil
            });

        } catch (error) {

            console.error(error);
            alert("Error al buscar usuario");

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
                alert("Todos los campos son obligatorios");
                return;
            }
            

            const usuario = {
                nombre: form.nombre,
                apepat: form.apepat,
                apemat: form.apemat,
                correo: form.correo,                
                perfil: form.perfil
            };

            const respuesta = await actualizarUsuario(usuario);

            alert(respuesta.mensaje || "Usuario registrado correctamente");

            setForm({
                nombre: "",
                apepat: "",
                apemat: "",
                correo: "",                
                perfil: ""
            });

        } catch (error) {

            console.error(error);
            alert("Error al modificar usuario");

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
                                                Actualización de Usuarios
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
                                                    value="Modificar"
                                                    onClick={modificarUsuario}
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
export default ModificaUsuarios;