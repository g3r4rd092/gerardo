import { useState, useEffect } from "react";

function ModalEditarImpacto({
    impacto,
    onGuardar
}) {

    console.log(impacto);

    const [descripcion,
        setDescripcion] = useState("");

    useEffect(() => {

        if (impacto) {

            setDescripcion(
                impacto.descripcion
            );

        }

    }, [impacto]);

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
                            Editar impacto
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

                                console.log(impacto);

                                onGuardar({
                                    ...impacto,
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

export default ModalEditarImpacto;