import Menu from "../components/Menu";
import { useState, useEffect } from "react";
import { useCatalogos } from "../hooks/useCatalogos";

function GestionMenus() {

    const [menuSeleccionado, setMenuSeleccionado] = useState(null);

    const [tipo, setTipo] = useState("menu");

    const { menu } = useCatalogos();

    const [form, setForm] = useState({
        menuPadre: ""
    });

    return (

        <div className="d-flex">

            <Menu />

            <div className="container-fluid p-4">

                <div className="row">

                    <div className="col-md-5">

                        <div className="card card-registration">

                            <div className="card-header card-header-bis">

                                <h4 className="mb-0 text-white">

                                    <i className="bi bi-diagram-3 me-2"></i>

                                    Gestión de Menús

                                </h4>

                            </div>

                            <div className="card-body">

                                <button className="btn btn-primary w-100 mb-3">

                                    <i className="bi bi-plus-circle me-2"></i>

                                    Nuevo Menú

                                </button>

                                <div className="accordion" id="accordionMenus">

                                    <div className="accordion-item">

                                        <h2 className="accordion-header">

                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#usuarios">

                                                <i className="bi bi-people me-2"></i>

                                                Usuarios

                                            </button>

                                        </h2>

                                        <div
                                            id="usuarios"
                                            className="accordion-collapse collapse show">

                                            <div className="accordion-body">

                                                <div className="d-flex justify-content-between align-items-center mb-2">

                                                    <span>

                                                        <i className="bi bi-person me-2"></i>

                                                        Catálogo Usuarios

                                                    </span>

                                                    <div>

                                                        <button className="btn btn-outline-warning btn-sm">

                                                            <i className="bi bi-pencil"></i>

                                                        </button>

                                                        <button className="btn btn-outline-danger btn-sm ms-2">

                                                            <i className="bi bi-trash"></i>

                                                        </button>

                                                    </div>

                                                </div>

                                                <div className="d-flex justify-content-between align-items-center mb-2">

                                                    <span>

                                                        <i className="bi bi-shield-lock me-2"></i>

                                                        Perfiles

                                                    </span>

                                                    <div>

                                                        <button className="btn btn-outline-warning btn-sm">

                                                            <i className="bi bi-pencil"></i>

                                                        </button>

                                                        <button className="btn btn-outline-danger btn-sm ms-2">

                                                            <i className="bi bi-trash"></i>

                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="accordion-item">

                                        <h2 className="accordion-header">

                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#proyectos">

                                                <i className="bi bi-folder me-2"></i>

                                                Proyectos

                                            </button>

                                        </h2>

                                        <div
                                            id="proyectos"
                                            className="accordion-collapse collapse">

                                            <div className="accordion-body">

                                                Actividades

                                                <br />

                                                Riesgos

                                                <br />

                                                Dashboard

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-7">

                        <div className="card card-registration">

                            <div className="card-header card-header-bis">

                                <h4 className="mb-0 text-white">

                                    <i className="bi bi-pencil-square me-2"></i>

                                    Detalle

                                </h4>

                            </div>

                            <div className="card-body">

                                <div className="mb-3">

                                    <label className="form-label">

                                        Nombre

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Tipo

                                    </label>

                                    <select
                                        className="form-select"
                                        value={tipo}
                                        onChange={(e) => setTipo(e.target.value)}
                                    >

                                        <option value="menu">

                                            Menú

                                        </option>

                                        <option value="submenu">

                                            Submenú

                                        </option>

                                    </select>

                                </div>

                                {tipo === "submenu" && (

                                    <>

                                        <div className="mb-3">

                                            <label className="form-label">

                                                Menú Padre

                                            </label>

                                            <select className="form-select"
                                                value={form.menuPadre}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        menuPadre: e.target.value
                                                    })
                                                }>

                                                <option>
                                                    Seleccionar
                                                </option>

                                                {menu.map((item) => (
                                                    <option
                                                        key={item.idmenu}
                                                        value={item.idmenu}
                                                    >
                                                        {item.nombre}
                                                    </option>
                                                ))}

                                            </select>

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label">

                                                Ruta

                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="ejemplo: /usuarios"
                                            />

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label">

                                                Orden

                                            </label>

                                            <input
                                                type="number"
                                                className="form-control"
                                            />

                                        </div>

                                    </>

                                )}


                                <div className="d-flex justify-content-end gap-2">

                                    <button className="btn btn-secondary">

                                        Limpiar

                                    </button>



                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>

    );

}

export default GestionMenus;