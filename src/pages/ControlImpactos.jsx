import Menu from "../components/Menu";
import ModalEditarImpacto from "../components/modalEditImpacto";
import * as bootstrap from 'bootstrap';
import { registrarImpacto, obtenerImpactos, actualizarImpacto, eliminarImpacto } from "../services/impactoService";
import "../css/estilos.css";
import { useEffect, useState } from "react";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function ControlImpactos() {

    const [form, setForm] = useState({
        descripcion: ""
    });

    const registroImpacto = async () => {

        try {

            if (!form.descripcion) {
                Swal.fire({
                    title: "Debe ingresar una descripción",
                    icon: "error",
                    text: "Favor de intentarlo de nuevo!"
                });

                return;
            }

            const nvoImpacto = {
                descripcion: form.descripcion
            };

            const respuesta = await registrarImpacto(nvoImpacto);
            await cargarImpactos();

            Swal.fire({
                title: respuesta.mensaje || "Impacto agregado correctamente",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            setForm({
                descripcion: ""
            });

        } catch (error) {
            Swal.fire({
                title: "Hubo un error al registrar",
                icon: "error",
                text: "Favor de intentarlo de nuevo!"
            });

        }
    };

    const [impactos, setImpactos] = useState([]);

    const cargarImpactos = async () => {

        try {

            const data =
                await obtenerImpactos();
            console.log(data);

            setImpactos(data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {

        cargarImpactos();

    }, []);

    const [mostrarModal, setMostrarModal] = useState(false);

    const [impactoSeleccionado,
        setImpactoSeleccionado] = useState(null);


    const guardarCambios = async (
        impactoActualizado
    ) => {

        try {

            await actualizarImpacto(
                impactoActualizado.id,
                impactoActualizado
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

            await cargarImpactos();

            Swal.fire({
                icon: "success",
                title: "Impacto actualizado correctamente",
                timer: 1500,
                showConfirmButton: false
            });

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error al actualizar",
                text: error.message
            });

        }

    };

    const bajaImpacto = async (id) => {

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
                await eliminarImpacto(id);

            await cargarImpactos();

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
                            <div className="col-md-6">
                                <div className="card card-registration my-4" >
                                    <div className="row g-0" style={{ width: "100%" }}>
                                        <div>
                                            <div className="card-body p-3 text-black">
                                                <div className="card-header card-header-bis text-white">
                                                    <h5 className="mb-0">
                                                        <i class="bi bi-journal-medical me-2"></i>
                                                        Impactos
                                                    </h5>
                                                </div>



                                                {/* Descripción */}
                                                <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                    <label htmlFor="form3Example8" className="form-label">Descripción</label>
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
                                                <div className="d-flex justify-content-end pt-3">
                                                    <button
                                                        className="btn btn-bis w-100"
                                                        onClick={registroImpacto}
                                                    >
                                                        <i className="bi bi-plus-circle me-2"></i>
                                                        Crear nuevo
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card card-registration my-4" id="card-tabla">
                                    <div className="card-header card-header-bis text-white">
                                        <h5 className="mb-0">
                                            <i class="bi bi-speedometer2 me-2"></i>
                                            Detalle de impactos registrados
                                        </h5>
                                    </div>
                                    <table className="table table-hover align-middle" id="tabla-actividades">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Descripción</th>
                                                <th scope="col">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {impactos.map((item) => (

                                                <tr key={item.id}>

                                                    <th>
                                                        {item.id}
                                                    </th>

                                                    <td>
                                                        {item.descripcion}
                                                    </td>

                                                    <td>
                                                        <button
                                                            className="btn btn-warning btn-sm"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#modalEditar"
                                                            onClick={() => {
                                                                console.log(item);
                                                                setImpactoSeleccionado(item);
                                                            }}
                                                        >
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm ms-2"
                                                            onClick={() =>
                                                                bajaImpacto(
                                                                    item.id
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
            <ModalEditarImpacto
                impacto={impactoSeleccionado}
                onGuardar={guardarCambios}
            />
        </div >
    );
}
export default ControlImpactos;