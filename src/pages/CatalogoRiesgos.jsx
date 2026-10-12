import Menu from "../components/Menu";
import "../css/estilos.css";
import { useEffect, useState } from "react";
import * as bootstrap from 'bootstrap';
import { obtenerCatalogoRiesgos, actualizarCatalogoRiesgo, eliminarRiesgoCatalogo } from "../services/riesgoService";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import ModalEditCatalogRiesgos from "../components/modalEditCatalogRiesgos";

function CatalogoRiesgos() {

    const [riesgos, setRiesgos] = useState([]);
    const [riesgoSeleccionado, setRiesgoSeleccionado] = useState(null);

    const cargarCatalogoRiesgo = async () => {

        try {

            const data =
                await obtenerCatalogoRiesgos();
            console.log(data);

            setRiesgos(data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {

        cargarCatalogoRiesgo();

    }, []);

    const guardarCambios = async (
        riesgoActualizado
    ) => {

        try {

            const respuesta =
                await actualizarCatalogoRiesgo(
                    riesgoActualizado.idriesgo,
                    riesgoActualizado
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

            await cargarCatalogoRiesgo();

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

    const eliminarRiesgoCat = async (id) => {

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
                await eliminarRiesgoCatalogo(id);

            await cargarCatalogoRiesgo();

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
                    <div className="row d-flex justify-content-center align-items-center h-100" id="div-proyecto">
                        <div className="col">
                            <div className="card card-registration my-4" style={{ borderStyle: "none" }}>
                                <div className="row g-0" style={{ width: "100%" }}>
                                    <div style={{ height: "500px" }}>
                                         <div className="card-body p-3 text-black">
                                                <div className="card-header card-header-bis text-white">
                                                    <h5 className="mb-0">
                                                        <i class="bi bi-speedometer2 me-2"></i>
                                                        Control de riesgos
                                                    </h5>
                                                </div>
                                            <table className="table table-hover align-middle" id="tabla-actividades">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Descripción del riesgo</th>
                                                        <th scope="col">Proyecto correspondiente</th>
                                                        <th scope="col">Impacto</th>
                                                        <th scope="col">Probabilidad</th>
                                                        <th scope="col">Riesgo</th>
                                                        <th scope="col">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {riesgos.map((item) => (

                                                        <tr key={item.idriesgo}>

                                                            <th>
                                                                {item.idriesgo}
                                                            </th>

                                                            <td>
                                                                {item.descripcion}
                                                            </td>
                                                            <td>
                                                                {item.proyecto}
                                                            </td>
                                                            <td>
                                                                {item.impacto}
                                                            </td>
                                                            <td>
                                                                {item.probabilidad}
                                                            </td>
                                                            <td>
                                                                {item.riesgo}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-warning btn-sm"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#modalEditar"
                                                                    onClick={() => {
                                                                        console.log(item);
                                                                        setRiesgoSeleccionado(item);
                                                                        console.log(riesgoSeleccionado);
                                                                    }}
                                                                >
                                                                    <i className="bi bi-pencil-square"></i>
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger btn-sm ms-2"
                                                                    onClick={() =>
                                                                        eliminarRiesgoCat(
                                                                            item.idriesgo
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
            <ModalEditCatalogRiesgos
                riesgo={riesgoSeleccionado}
                onGuardar={guardarCambios}
            />
        </div >
    );

}
export default CatalogoRiesgos; 