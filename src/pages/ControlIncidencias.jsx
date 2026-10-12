import Menu from "../components/Menu";
import ModalEditarCatalogIncidencia from "../components/modalEditCatalogIncidencia";
import { useCatalogos } from "../hooks/useCatalogos";
import * as bootstrap from 'bootstrap';
import { registrarIncidencia, obtenerIncidencias, actualizarIncidencia, eliminarIncidencia } from "../services/incidenciaService";
import "../css/estilos.css";
import { useEffect, useState } from "react";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function ControlIncidencias() {

    const [form, setForm] = useState({
        descripcion: "",
        proyecto: ""
    });

    const registroIncidencia = async () => {

        try {

            if (!form.descripcion || !form.proyecto) {
                Swal.fire({
                    title: "Todos los campos son obligatorios",
                    icon: "error",
                    text: "Favor de intentarlo de nuevo!"
                });

                return;
            }

            const nvaIncidencia = {
                descripcion: form.descripcion,
                proyecto: form.proyecto
            };

            const respuesta = await registrarIncidencia(nvaIncidencia);
            await cargarIncidencias();

            Swal.fire({
                title: respuesta.mensaje || "Incidencia creada correctamente",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            setForm({
                descripcion: "",
                proyecto: ""
            });

        } catch (error) {
            Swal.fire({
                title: "Hubo un error al crear nueva incidencia" || error.message,
                icon: "error",
                text: "Favor de intentarlo de nuevo!"
            });

        }
    };

    const [incidencias, setIncidencias] = useState([]);
    const { proyectos } = useCatalogos();

    const cargarIncidencias = async () => {

        try {

            const data =
                await obtenerIncidencias();
            //console.log(data);

            setIncidencias(data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {

        cargarIncidencias();

    }, []);

    const [mostrarModal, setMostrarModal] = useState(false);

    const [incidenciaSeleccionada, setIncidenciaSeleccionada] = useState(null);


    const guardarCambios = async (
        incidenciaActualizada
    ) => {

        try {

            await actualizarIncidencia(
                incidenciaActualizada.id_incidencia,
                incidenciaActualizada
            );

            const modalElement =
                document.getElementById(
                    "modalEditar"
                );

            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    modalElement
                );

            modal.hide();

            modal.dispose();

            document
                .querySelectorAll(
                    ".modal-backdrop"
                )
                .forEach(
                    element => element.remove()
                );

            document.body.classList.remove(
                "modal-open"
            );

            document.body.style.removeProperty(
                "padding-right"
            );

            await cargarIncidencias();

            Swal.fire({
                icon: "success",
                title: "Se han modificado la correctamente",
                timer: 1500,
                showConfirmButton: false
            });

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error al guardar los cambios",
                text: error.message
            });

        }

    };

    const bajaIncidencia = async (id) => {

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
                await eliminarIncidencia(id);

            await cargarIncidencias();

            //Cerrar el modal al mostrar alerta sweetalert
            const modalElement =
                document.getElementById("modalEditar");

            const modal =
                bootstrap.Modal.getInstance(modalElement);

            if (modal) {
                modal.hide();
            }

            // Eliminar backdrop sobrante
            document
                .querySelectorAll('.modal-backdrop')
                .forEach(el => el.remove());

            // Restaurar el body
            document.body.classList.remove('modal-open');
            document.body.style.removeProperty('padding-right');

            Swal.fire({

                title: "Eliminado",

                text: respuesta.mensaje,

                icon: "success",

                timer: 1500,

                showConfirmButton: false

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
                    <div className="row d-flex justify-content-center align-items-center h-100" style={{ marginTop: "10px" }} id="div-proyecto">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="card card-registration my-4" >
                                    <div className="row g-0" style={{ width: "100%" }}>                                        <div>
                                            <div className="card-body p-3 text-black">
                                                <div className="card-header card-header-bis text-white">
                                                    <h5 className="mb-0">
                                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                                        Registrar Incidencia
                                                    </h5>
                                                </div>

                                                {/* Descripción */}
                                                <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                    <label htmlFor="form3Example8" className="form-label fw-bold">
                                                        <i className="bi bi-pencil-square me-2"></i>
                                                        Descripción
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg mb-3"
                                                        id="form3Example8"
                                                        value={form.descripcion}
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                descripcion: e.target.value
                                                            })
                                                        }

                                                    />
                                                </div>
                                                <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                    <label htmlFor="form3Example8" className="form-label fw-bold">
                                                        <i className="bi bi-folder2-open me-2"></i>
                                                        Proyecto
                                                    </label>
                                                    <select
                                                        className="form-select mb-3"
                                                        value={form.proyecto}
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                proyecto: e.target.value
                                                            })
                                                        }
                                                        style={{ fontSize: "12px", padding: "0.5rem" }}
                                                    >
                                                        <option value="">
                                                            Seleccionar proyecto
                                                        </option>

                                                        {proyectos.map((item) => (
                                                            <option
                                                                key={item.id_proyecto}
                                                                value={item.id_proyecto}
                                                            >
                                                                {item.nombre}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="d-flex justify-content-end pt-3">
                                                    <button
                                                        className="btn btn-bis w-100"
                                                        onClick={registroIncidencia}
                                                    >
                                                        <i className="bi bi-plus-circle me-2"></i>
                                                        Registrar Incidencia
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="card card-registration my-4" id="card-tabla">
                                    <div className="card-header card-header-bis text-white">
                                        <h5 className="mb-0">
                                            <i className="bi bi-list-task me-2"></i>
                                            Listado de Incidencias
                                        </h5>
                                    </div>
                                    <table className="table table-hover align-middle" id="tabla-actividades">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Incidencia</th>
                                                <th scope="col">Proyecto</th>
                                                <th scope="col">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {incidencias.map((item) => (

                                                <tr key={item.id_incidencia}>

                                                    <th>
                                                        {item.id_incidencia}
                                                    </th>

                                                    <td>
                                                        {item.descripcion}
                                                    </td>
                                                    <td>

                                                        <span className="badge bg-primary">

                                                            {item.nombre_proyecto}

                                                        </span>

                                                    </td>

                                                    <td>
                                                        <button
                                                            className="btn btn-outline-warning btn-sm"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#modalEditar"
                                                            onClick={() => {
                                                                console.log(item);
                                                                setIncidenciaSeleccionada(item);
                                                            }}
                                                        >
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-danger btn-sm ms-2"
                                                            onClick={() =>
                                                                bajaIncidencia(
                                                                    item.id_incidencia
                                                                )
                                                            }
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <ModalEditarCatalogIncidencia
                incidencia={incidenciaSeleccionada}
                onGuardar={guardarCambios}
            />
        </div >
    );
}
export default ControlIncidencias;