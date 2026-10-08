import Menu from "../components/Menu";
import "../css/estilos.css";
import { useEffect, useState } from "react";
import * as bootstrap from 'bootstrap';
import { obtenerCatalogoProyectos, actualizarCatalogoProyectos, eliminarProyectoCatalogo } from "../services/proyectoService";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import ModalEditProyecto from "../components/modalEditProyecto";

function GestionProyectos() {

    const [proyectos, setProyectos] = useState([]);
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

    const cargarCatalogoProyecto = async () => {

        try {

            const data =
                await obtenerCatalogoProyectos();
            console.log(data);

            setProyectos(data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {
        cargarCatalogoProyecto();
    }, []);

    const guardarCambios = async (
        proyectoActualizado
    ) => {

        try {

            const respuesta =
                await actualizarCatalogoProyectos(
                    proyectoActualizado.id_proyecto,
                    proyectoActualizado
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

            await cargarCatalogoProyecto();

            Swal.fire({
                icon: "success",
                title: respuesta.mensaje,
                timer: 1500,
                showConfirmButton: false
            });

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message
            });

        }

    };

    const eliminarProyectoCat = async (id) => {
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
                await eliminarProyectoCatalogo(id);

            await cargarCatalogoProyecto();

            Swal.fire({
                title: "Eliminado",
                text: respuesta.mensaje,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            console.error(error);
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
                            <div className="card card-registration my-4" style={{ borderStyle: "none" }}>
                                <div className="row g-0" style={{ width: "100%" }}>
                                    <div style={{ height: "500px" }}>
                                        <div className="card-body p-md-5 text-black" style={{ marginTop: "-5%" }}>

                                            <h3 className="mb-5 text-uppercase">
                                                Catálogo de proyectos
                                            </h3>
                                            <table className="table" id="tabla-actividades">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Descripción de proyecto</th>
                                                        <th scope="col">Cliente</th>
                                                        <th scope="col">Fecha inicio</th>
                                                        <th scope="col">Fecha término</th>
                                                        <th scope="col">Estatus</th>
                                                        <th scope="col">Porcentaje</th>
                                                        <th scope="col">Prioridad</th>
                                                        <th scope="col">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {proyectos.map((item) => (

                                                        <tr key={item.id_proyecto}>

                                                            <th>
                                                                {item.id_proyecto}
                                                            </th>

                                                            <td>
                                                                {item.nombre}
                                                            </td>
                                                            <td>
                                                                {item.cliente}
                                                            </td>
                                                            <td>
                                                                {item.fecha_inicio}
                                                            </td>
                                                            <td>
                                                                {item.fecha_fin}
                                                            </td>
                                                            <td>
                                                                {item.estado_proyecto}
                                                            </td>
                                                            <td>
                                                                {item.porcentaje}
                                                            </td>
                                                            <td>
                                                                {item.prioridad}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-warning btn-sm"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#modalEditar"
                                                                    onClick={() => {
                                                                        console.log(item);
                                                                        setProyectoSeleccionado(item);
                                                                        //console.log(riesgoSeleccionado);
                                                                    }}
                                                                >
                                                                    <i className="bi bi-pencil-square"></i>
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger btn-sm ms-2"
                                                                    onClick={() =>
                                                                        eliminarProyectoCat(
                                                                            item.id_proyecto
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
                        </div>
                    </div>
                </main>
            </div>
            <ModalEditProyecto
                proyecto={proyectoSeleccionado}
                onGuardar={guardarCambios}
            />
        </div >
    );

}
export default GestionProyectos; 