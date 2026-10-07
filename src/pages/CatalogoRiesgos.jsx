import Menu from "../components/Menu";
import "../css/estilos.css";
import { useEffect, useState } from "react";
import ModalCatalogoRiesgo from "../components/modalEditCatalogRiesgos";
import { obtenerCatalogoRiesgos, actualizarCatalogoRiesgo } from "../services/riesgoService";

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

            console.log(riesgoActualizado);

            const respuesta =
                await actualizarCatalogoRiesgo(
                    riesgoActualizado.idriesgo,
                    riesgoActualizado
                );

            await cargarRiesgos();

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
                                                Catálogo de riesgos
                                            </h3>
                                            <table class="table" id="tabla-actividades">
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
                                                                        eliminarEstado(
                                                                            item.idestadoriesgo
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