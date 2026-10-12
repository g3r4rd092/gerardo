import { useState, useEffect } from "react";
import { useCatalogos } from "../hooks/useCatalogos";

function ModalEditarCatalogIncidencia({
    incidencia,
    onGuardar
}) {

    //console.log(impacto);

    const [descripcion, setDescripcion] = useState("");
    const [idProyecto, setIdProyecto] = useState("");

    const { proyectos } = useCatalogos();

    useEffect(() => {

        if (incidencia) {

            setDescripcion(
                incidencia.descripcion || ""
            );
            setIdProyecto(
                incidencia.id_proyecto || ""
            );

        }

    }, [incidencia]);

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
                            Editar incidencia
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        />

                    </div>

                    <div className="modal-body">

                        <label className="form-label">
                            Descripcion
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
                            Estado Riesgo
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
                                Seleccione proyecto
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

                                //console.log(impacto);

                                onGuardar({
                                    ...incidencia,
                                    descripcion
                                });

                            }}
                        >
                            Guardar
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ModalEditarCatalogIncidencia;