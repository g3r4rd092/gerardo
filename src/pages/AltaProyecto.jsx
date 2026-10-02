import Menu from "../components/Menu";
import { useCatalogos } from "../hooks/useCatalogos";
import { useState } from "react";
import "../css/estilos.css";

function AltaProyecto() {

    const { clientes, prioridades, consecutivo } = useCatalogos();

    const [cliente, setCliente] = useState("");
    const [prioridad, setPrioridad] = useState("");

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
                                                <input type="text" id="form3Example8" className="form-control form-control-lg" />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Cliente</label>
                                                <select className="form-select" aria-label="Default select example" value={cliente} onChange={(e) => setCliente(e.target.value)}>
                                                    <option selected>Seleccionar cliente</option>
                                                    {clientes.map((item) => (
                                                        <option
                                                            key={item.idcliente}
                                                            value={item.nombre}
                                                        >
                                                            {item.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Fecha de inicio</label>
                                                <input type="date" id="form3Example8" className="form-control form-control-lg" />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Fecha de término</label>
                                                <input type="date" id="form3Example8" className="form-control form-control-lg" />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4 form-group" id="div-form-proyecto">
                                                <label htmlFor="form3Example8" className="form-label">Prioridad</label>
                                                <select className="form-select" aria-label="Default select example" value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                                                    <option selected>Seleccionar prioridad</option>
                                                    {prioridades.map((item) => (
                                                        <option
                                                            key={item.idprioridad}
                                                            value={item.descripcion}
                                                        >
                                                            {item.descripcion}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="d-flex justify-content-end pt-3">
                                                <input className="btn btn-bis" type="submit" value="Registrar proyecto" />
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