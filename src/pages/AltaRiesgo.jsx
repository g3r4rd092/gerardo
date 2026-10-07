import Menu from "../components/Menu";
import { useState } from "react";
import { useCatalogos } from "../hooks/useCatalogos";
import { crearRiesgo } from "../services/riesgoService";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function AltaRiesgo() {

    const [form, setForm] = useState({
        descripcion: "",
        proyecto: "",
        impacto: "",
        probabilidad: "",
        riesgo: ""
    });

    const { proyectos, impactos, estadoRiesgo } = useCatalogos();

    const guardarRiesgo = async () => {

        try {

            if (
                !form.descripcion ||
                !form.proyecto ||
                !form.impacto ||
                !form.probabilidad ||
                !form.riesgo
            ) {
                Swal.fire({
                    title: "Error",
                    text: "Todos los campos son obligatorios",
                    icon: "error"
                });
                return;
            }


            const nvoRiesgo = {
                descripcion: form.descripcion,
                proyecto: form.proyecto,
                impacto: form.impacto,
                probabilidad: form.probabilidad,
                riesgo: form.riesgo
            };

            const respuesta = await crearRiesgo(nvoRiesgo);

            Swal.fire({
                title: "Riesgo creado correctamente",
                text: respuesta.mensaje,
                icon: "success"
            });

            setForm({
                descripcion: "",
                proyecto: "",
                impacto: "",
                probabilidad: "",
                riesgo: ""
            });

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error al crear registro" || error.message,
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
                                                Registro de riesgos
                                            </h3>

                                            {/* Descripcion */}
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

                                            {/*Proyecto */}
                                            <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                <label htmlFor="form3Example8" className="form-label">Proyecto</label>
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

                                            {/*Impacto */}
                                            <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                <label htmlFor="form3Example8" className="form-label">Impacto</label>
                                                <select
                                                    className="form-select mb-3"
                                                    value={form.impacto}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            impacto: e.target.value
                                                        })
                                                    }
                                                    style={{ fontSize: "12px", padding: "0.5rem" }}
                                                >
                                                    <option value="">
                                                        Seleccione una opción
                                                    </option>

                                                    {impactos.map((item) => (
                                                        <option
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.descripcion}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Probabilidad */}
                                            <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                <label htmlFor="form3Example8" className="form-label">Probabilidad</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg mb-3"
                                                    id="form3Example8"
                                                    value={form.probabilidad}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            probabilidad: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>

                                            {/*Estado de riesgo */}
                                            <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                <label htmlFor="form3Example8" className="form-label">Riesgo</label>
                                                <select
                                                    className="form-select mb-3"
                                                    value={form.riesgo}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            riesgo: e.target.value
                                                        })
                                                    }
                                                    style={{ fontSize: "12px", padding: "0.5rem" }}
                                                >
                                                    <option value="">
                                                        Seleccione una opción
                                                    </option>

                                                    {estadoRiesgo.map((item) => (
                                                        <option
                                                            key={item.idestadoriesgo}
                                                            value={item.idestadoriesgo}
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
                                                    value="Guardar"
                                                    onClick={guardarRiesgo}
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