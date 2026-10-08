import Menu from "../components/Menu";
import { useCatalogos } from "../hooks/useCatalogos";
import { registrarProyecto } from "../services/proyectoService";
import { useState } from "react";
import "../css/estilos.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function AltaProyecto() {

    const { clientes, prioridades, consecutivo } = useCatalogos();

    const [fecha_inicio, setFechaInicio] = useState(new Date());
    const [fecha_fin, setFechaTermino] = useState(new Date());

    const fechaActual = new Date().toISOString().split("T")[0];

    const [form, setForm] = useState({
        nombre: "",
        id_cliente: "",
        fecha_inicio: fechaActual,
        fecha_fin: fechaActual,
        prioridad: ""
    });
    

    const guardarProyecto = async () => {

        try {

            const respuesta =
                await registrarProyecto(form);

            Swal.fire({
                title: "Creación de proyecto",
                text: respuesta.mensaje,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            setForm({
                nombre: "",
                id_cliente: "",
                fecha_inicio: fechaActual,
                fecha_fin: fechaActual,
                prioridad: ""
            });

            setFechaInicio(new Date());
            setFechaTermino(new Date());


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
                            <div className="card card-registration my-4">
                                <div className="row g-0" style={{ width: "100%" }}>
                                    {/*<div className="col-xl-6 d-none d-xl-block" style={{ alignContent: "center" }}>
                                        <img src={ImgGestion}
                                            alt="Gestion proyectos" className="img-fluid"
                                            style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem' }} />
                                    </div>*/}
                                    <div>
                                        <div className="card-body p-md-5 text-black" style={{ marginTop: "-5%" }}>
                                            <h3 className="mb-5 text-uppercase" style={{ marginTop: "10px" }}>Registro de Proyectos</h3>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">No.</label>
                                                <input type="text" id="form3Example8" className="form-control form-control-lg" readOnly value={consecutivo} />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Nombre o descripción del proyecto</label>
                                                <input type="text" id="form3Example8" className="form-control form-control-lg" value={form.nombre}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            nombre: e.target.value
                                                        })
                                                    } />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Cliente</label>
                                                <select className="form-select" aria-label="Default select example" value={form.id_cliente}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            id_cliente: Number(e.target.value)
                                                        })
                                                    }
                                                    style={{ fontSize: "12px" }}>
                                                    <option>Seleccionar cliente</option>
                                                    {clientes.map((item) => (
                                                        <option
                                                            key={item.idcliente}
                                                            value={item.idcliente}
                                                        >
                                                            {item.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Fecha de inicio</label>
                                                <DatePicker
                                                    selected={fecha_inicio}
                                                    value={fecha_inicio}
                                                    onChange={(date) => {
                                                        setFechaInicio(date);
                                                        setForm({
                                                            ...form,
                                                            fecha_inicio: date.toISOString().split("T")[0]
                                                        });
                                                    }}
                                                    dateFormat="yyyy-MM-dd"
                                                    className="form-control form-control-lg mb-3"
                                                    id="fechaInicio"
                                                    minDate={new Date()}

                                                />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Fecha de término</label>
                                                <DatePicker
                                                    selected={fecha_fin}
                                                    value={fecha_fin}
                                                    onChange={(date) => {
                                                        setFechaTermino(date);
                                                        setForm({
                                                            ...form,
                                                            fecha_fin: date.toISOString().split("T")[0]
                                                        });
                                                    }}
                                                    dateFormat="yyyy-MM-dd"
                                                    className="form-control form-control-lg mb-3"
                                                    id="fechaTermino"
                                                    minDate={fecha_inicio}

                                                />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Prioridad</label>
                                                <select className="form-select" aria-label="Default select example" value={form.prioridad} onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        prioridad: Number(e.target.value)
                                                    })
                                                }
                                                    style={{ fontSize: "12px" }}>
                                                    <option>Seleccionar prioridad</option>
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
                                            <span id="span-nota">Nota: Se asignará estatus por defecto "En progreso" y porcentaje inicial 0%</span>
                                            <div className="d-flex justify-content-end pt-3">
                                                <input
                                                    className="btn btn-bis"
                                                    type="button"
                                                    value="Registrar proyecto"
                                                    onClick={guardarProyecto}
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
        </div>
    );
}
export default AltaProyecto;