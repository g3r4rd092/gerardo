import { useState, useEffect } from "react";
import { useCatalogos } from "../hooks/useCatalogos";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function ModalEditProyecto({
    proyecto,
    onGuardar
}) {

    const { clientes, prioridades } = useCatalogos();

    const [nombre, setNombre] = useState("");

    const [idCliente, setIdCliente] = useState("");
    const [idPrioridad, setIdPrioridad] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    useEffect(() => {

        if (proyecto) {

            setNombre(
                proyecto.nombre || ""
            );

            setIdCliente(
                proyecto.id_cliente || ""
            );

            if (proyecto.fecha_inicio) {

                const fechaInicioArray =
                    proyecto.fecha_inicio
                        .split("T")[0]
                        .split("-");

                setFechaInicio(
                    new Date(
                        Number(fechaInicioArray[0]),
                        Number(fechaInicioArray[1]) - 1,
                        Number(fechaInicioArray[2])
                    )
                );

            }

            if (proyecto.fecha_fin) {

                const fechaFinArray =
                    proyecto.fecha_fin
                        .split("T")[0]
                        .split("-");

                setFechaFin(
                    new Date(
                        Number(fechaFinArray[0]),
                        Number(fechaFinArray[1]) - 1,
                        Number(fechaFinArray[2])
                    )
                );

            }

            setIdPrioridad(
                proyecto.idprioridad || ""
            );

        }

    }, [proyecto]);

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
                            value={nombre}
                            onChange={(e) =>
                                setNombre(e.target.value)
                            }
                        />


                        <label className="form-label">
                            Cliente
                        </label>

                        <select
                            className="form-select"
                            value={idCliente}
                            onChange={(e) =>
                                setIdCliente(
                                    Number(e.target.value)
                                )
                            }
                        >

                            <option value="">
                                Seleccione cliente
                            </option>

                            {clientes.map((item) => (
                                <option
                                    key={item.idcliente}
                                    value={item.idcliente}
                                >
                                    {item.nombre}
                                </option>
                            ))}
                        </select>

                        <label className="form-label">
                            Fecha inicio
                        </label>

                        {/* <input
                            type="date"
                            className="form-control"
                            value={fechaInicio}
                            onChange={(e) =>
                                setFechaInicio(
                                    e.target.value
                                )
                            }
                        /> */}

                        <DatePicker
                            selected={fechaInicio}
                            onChange={(date) =>
                                setFechaInicio(date)
                            }
                            dateFormat="yyyy-MM-dd"
                            className="form-control form-control-lg mb-3"
                            minDate={new Date()}
                        />

                        {/*  <input
                            type="date"
                            className="form-control"
                            value={fechaFin}
                            onChange={(e) =>
                                setFechaFin(
                                    e.target.value
                                )
                            }
                        /> */}

                        <label className="form-label">
                            Fecha término
                        </label>

                        <DatePicker
                            selected={fechaFin}
                            onChange={(date) =>
                                setFechaFin(date)
                            }
                            dateFormat="yyyy-MM-dd"
                            className="form-control form-control-lg mb-3"
                            minDate={fechaInicio}
                        />

                        <label className="form-label">
                            Prioridad
                        </label>

                        <select
                            className="form-select"
                            value={idPrioridad}
                            onChange={(e) =>
                                setIdPrioridad(
                                    Number(e.target.value)
                                )
                            }
                        >

                            <option value="">
                                Seleccione prioridad
                            </option>

                            {prioridades.map((item) => (
                                <option
                                    key={item.idprioridad}
                                    value={item.idprioridad}
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
                                    ...proyecto,
                                    nombre,
                                    idcliente: idCliente,
                                    fecha_inicio: fechaInicio,
                                    fecha_fin: fechaFin,
                                    prioridad: idPrioridad
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
export default ModalEditProyecto;