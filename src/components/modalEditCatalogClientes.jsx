import { useState, useEffect } from "react";

function ModalEditarCatalogCliente({
    cliente,
    onGuardar
}) {

    //console.log(impacto);

    const [nombre,
        setNombre] = useState("");

    useEffect(() => {

        if (cliente) {

            setNombre(
                cliente.nombre
            );

        }

    }, [cliente]);

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
                            Editar nombre del cliente
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        />

                    </div>

                    <div className="modal-body">

                        <label className="form-label">
                            Nombre
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={(e) =>
                                setNombre(
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

                                //console.log(impacto);

                                onGuardar({
                                    ...cliente,
                                    nombre
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

export default  ModalEditarCatalogCliente;