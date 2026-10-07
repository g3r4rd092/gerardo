import { useState, useEffect } from "react";
import { useCatalogos } from "../hooks/useCatalogos";


function ModalEditCatalogRiesgos({
    riesgo,
    onGuardar
}) {

    console.log(riesgo);

    const { proyectos, impactos, estadoRiesgo } = useCatalogos();

    console.log("Proyectos:", proyectos);
    console.log("Impactos:", impactos);
    console.log("Estados:", estadoRiesgo);

    const [descripcion, setDescripcion] = useState("");
    const [probabilidad, setProbabilidad] = useState("");

    const [idProyecto, setIdProyecto] = useState("");
    const [idImpacto, setIdImpacto] = useState("");
    const [idEstadoRiesgo, setIdEstadoRiesgo] = useState("");

    useEffect(() => {

        if (riesgo) {

            setDescripcion(
                riesgo.descripcion || ""
            );

            setProbabilidad(
                riesgo.probabilidad || ""
            );

            setIdProyecto(
                riesgo.idproyecto || ""
            );

            setIdImpacto(
                riesgo.idimpacto || ""
            );

            setIdEstadoRiesgo(
                riesgo.idestadoriesgo || ""
            );

        }

    }, [riesgo]);

    return (

        <div
            className="modal fade"
            id="modalEditar"
            tabIndex="-1"
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Editar valores
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        />
                    </div>

                    <div className="modal-body">
                        <label className="form-label">
                            Descripción
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={descripcion}
                            onChange={(e) =>
                                setDescripcion(
                                    e.target.value
                                )
                            }
                        />

                        <label className="form-label">
                            Proyecto
                        </label>

                        <select
                            className="form-select"
                            value={idProyecto}
                            onChange={(e) =>
                                setIdProyecto(
                                    Number(e.target.value)
                                )
                            }
                        >

                            <option value="">
                                Seleccione un proyecto
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

                        <label className="form-label">
                            Impacto
                        </label>

                        <select
                            className="form-select"
                            value={idImpacto}
                            onChange={(e) =>
                                setIdImpacto(
                                    Number(e.target.value)
                                )
                            }
                        >

                            <option value="">
                                Seleccione un impacto
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

                        <label className="form-label">
                            Probabilidad
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={probabilidad}
                            onChange={(e) =>
                                setProbabilidad(
                                    e.target.value
                                )
                            }
                        />

                        <label className="form-label">
                            Estado Riesgo
                        </label>

                        <select
                            className="form-select"
                            value={idEstadoRiesgo}
                            onChange={(e) =>
                                setIdEstadoRiesgo(
                                    Number(e.target.value)
                                )
                            }
                        >

                            <option value="">
                                Seleccione un estado
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

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {

                                const datosActualizados = {
                                    ...riesgo,
                                    descripcion,
                                    probabilidad,
                                    idproyecto: idProyecto,
                                    idimpacto: idImpacto,
                                    idestadoriesgo: idEstadoRiesgo
                                };
                                console.log(datosActualizados);
                                onGuardar(
                                    datosActualizados
                                );
                            }}
                        >
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ModalEditCatalogRiesgos;