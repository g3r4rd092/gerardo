import Menu from "../components/Menu";
import { useCatalogos } from "../hooks/useCatalogos";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/estilos.css";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { buscarProyectoPorId, registrarActividades } from "../services/actividadService";


function AltaActividad() {

    const { responsables } = useCatalogos();

    const [busqueda, setBusqueda] = useState("");
    const [camposHabilitados, setCamposHabilitados] = useState(false);

    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaTermino, setFechaTermino] = useState(new Date());

    const [nombreActividad, setNombreActividad] = useState("");

    const [actividades, setActividades] = useState([]);

    const [actividad, setActividad] = useState({
        descripcion: "",
        idresponsable: "",
        fecha_inicio: "",
        fecha_fin: ""
    });

    const [form, setForm] = useState({
        id_proyecto: "",
        nombre: "",
        responsable: ""
    });

    const buscarProyecto = async () => {

        try {

            const data = await buscarProyectoPorId(busqueda);

            if (!data.success) {

                Swal.fire({
                    title: "Proyecto no encontrado",
                    icon: "error",
                    text: "Favor de intentarlo de nuevo!"
                });

                setCamposHabilitados(false);

                setForm({
                    id_proyecto: "",
                    nombre: "",
                    responsable: ""
                });

                return;
            }

            setCamposHabilitados(true);

            setForm(prev => ({
                ...prev,
                id_proyecto: data.proyecto.id_proyecto,
                nombre: data.proyecto.nombre
            }));

        } catch (error) {

            console.error(error);

            Swal.fire({
                title: "Error al obtener proyecto",
                icon: "error",
                text: "Favor de intentarlo de nuevo!"
            });

            setCamposHabilitados(false);
        }
    };

    const agregarActividad = () => {

        if (!nombreActividad.trim()) {

            Swal.fire({
                title: "Debe capturar el nombre de la actividad",
                icon: "error",
                text: "Favor de intentarlo de nuevo!"
            });

            return;
        }

        if (!form.responsable) {

            Swal.fire({
                title: "Debe seleccionar un responsable",
                icon: "error",
                text: "Favor de intentarlo de nuevo!"
            });

            return;
        }

        if (!fechaInicio || !fechaTermino) {

            Swal.fire({
                title: "Debe seleccionar las fechas",
                icon: "error",
                text: "Favor de intentarlo de nuevo!"
            });

            return;
        }

        if (fechaInicio > fechaTermino) {

            Swal.fire({
                title: "Error en fechas",
                icon: "error",
                text: "La fecha de término no puede ser menor a la fecha de inicio"
            });

            return;
        }

        const nuevaActividad = {
            id: actividades.length + 1,
            nombreActividad,
            responsable: form.responsable,
            fechaInicio,
            fechaTermino
        };

        setActividades(prev => [...prev, nuevaActividad]);

        setNombreActividad("");
        setFechaInicio(new Date());
        setFechaTermino(new Date());

        Swal.fire({
            title: "Actividad agregada",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        });
    };

    const guardarActividades = async () => {

        try {

            if (
                actividades.length === 0
            ) {

                Swal.fire({
                    icon: "warning",
                    title: "No hay actividades"
                });

                return;

            }

            const datos = {

                idproyecto:
                    form.id_proyecto,

                actividades:
                    actividades.map(
                        item => ({
                            nombre:
                                item.nombreActividad,

                            idresponsable:
                                item.responsable,

                            fechainicio:
                                item.fechaInicio
                                    .toISOString()
                                    .split("T")[0],

                            fechatermino:
                                item.fechaTermino
                                    .toISOString()
                                    .split("T")[0]
                        })
                    )

            };

            console.log(datos);

            const respuesta =
                await registrarActividades(
                    datos
                );

            Swal.fire({
                icon: "success",
                title: respuesta.mensaje
            });

            setActividades([]);

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
                    <div className="row d-flex justify-content-center align-items-center h-100" style={{ marginTop: "10px" }} id="div-proyecto">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card card-registration my-4" >
                                    <div className="row g-0" style={{ width: "100%" }}>
                                        <div>
                                            <div className="card-body p-md-5 text-black" style={{ marginTop: "-5%" }}>

                                                <h3 className="mb-5 text-uppercase">
                                                    Registro de Actividades
                                                </h3>

                                                <div
                                                    data-mdb-input-init
                                                    className="form-outline mb-4 form-group"
                                                    id="div-form-proyecto"
                                                >
                                                    <label className="form-label">
                                                        Ingresar número de proyecto
                                                    </label>

                                                    <div className="d-flex gap-2">

                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            id="form3Example8"
                                                            value={busqueda}
                                                            onChange={(e) => setBusqueda(e.target.value)}
                                                        />

                                                        <button
                                                            className="btn btn-bis"
                                                            type="button"
                                                            onClick={buscarProyecto}
                                                        >
                                                            Buscar
                                                        </button>

                                                    </div>
                                                </div>

                                                {/* # proyecto */}
                                                <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                    <label htmlFor="form3Example8" className="form-label">No. proyecto</label>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg mb-3"
                                                        id="form3Example8"
                                                        value={form.id_proyecto}
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                id_proyecto: e.target.value
                                                            })
                                                        }
                                                        readOnly
                                                    />
                                                </div>

                                                {/* Nombre de proyecto */}
                                                <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                    <label htmlFor="form3Example8" className="form-label">Nombre proyecto</label>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg mb-3"
                                                        id="form3Example8"
                                                        value={form.nombre}
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                nombre: e.target.value
                                                            })
                                                        }
                                                        readOnly
                                                    />
                                                </div>

                                                {/* Nombre de actividad */}
                                                <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                    <label htmlFor="form3Example8" className="form-label">Nombre actividad</label>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg mb-3"
                                                        id="form3Example8"
                                                        value={nombreActividad}
                                                        onChange={(e) => setNombreActividad(e.target.value)}

                                                    />
                                                </div>

                                                {/* Perfil */}
                                                <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                    <label htmlFor="form3Example8" className="form-label">Responsable</label>
                                                    <select
                                                        className="form-select mb-3"
                                                        value={form.id_empleado}
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                responsable: e.target.value
                                                            })
                                                        }
                                                        style={{ fontSize: "12px", padding: "0.5rem" }}
                                                        disabled={!camposHabilitados}
                                                    >
                                                        <option value="">
                                                            Seleccionar empleado
                                                        </option>

                                                        {responsables.map((item) => (
                                                            <option
                                                                key={item.id_empleado}
                                                                value={item.id_empleado}
                                                            >
                                                                {item.nombre + " " + item.apepat + " " + item.apemat}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Fecha inicio */}
                                                <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                    <label for="date" class="col-1 col-form-label">Fecha inicio</label>
                                                    <DatePicker
                                                        selected={fechaInicio}
                                                        value={fechaInicio}
                                                        onChange={(date) => setFechaInicio(date)}
                                                        dateFormat="yyyy-MM-dd"
                                                        className="form-control form-control-lg mb-3"
                                                        id="fechaInicio"
                                                        minDate={new Date()}
                                                        disabled={!camposHabilitados}
                                                    />
                                                </div>

                                                {/* Fecha término */}
                                                <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                    <label for="date" class="col-1 col-form-label">Fecha término</label>
                                                    <DatePicker
                                                        selected={fechaTermino}
                                                        value={fechaTermino}
                                                        onChange={(date) => setFechaTermino(date)}
                                                        dateFormat="yyyy-MM-dd"
                                                        className="form-control form-control-lg mb-3"
                                                        id="fechaTermino"
                                                        minDate={fechaInicio}
                                                        disabled={!camposHabilitados}
                                                    />
                                                    <button
                                                        className="btn btn-bis"
                                                        type="button"
                                                        onClick={agregarActividad}
                                                    >
                                                        Agregar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card card-registration my-4" id="card-tabla">
                                    <h3 className="mb-5 text-uppercase">
                                        Lista de actividades del proyecto
                                    </h3>
                                    <table class="table" id="tabla-actividades">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Actividad</th>
                                                <th scope="col">Fecha inicio</th>
                                                <th scope="col">Fecha término</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {actividades.map((actividad) => (
                                                <tr key={actividad.id}>
                                                    <td>{actividad.id}</td>

                                                    <td>{actividad.nombreActividad}</td>

                                                    <td>
                                                        {actividad.fechaInicio
                                                            ? actividad.fechaInicio.toLocaleDateString("es-MX")
                                                            : ""}
                                                    </td>

                                                    <td>
                                                        {actividad.fechaTermino
                                                            ? actividad.fechaTermino.toLocaleDateString("es-MX")
                                                            : ""}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="d-flex justify-content-end pt-3">
                                        <input
                                            className="btn btn-bis"
                                            type="button"
                                            value="Registrar actividades"
                                            onClick={guardarActividades}
                                        />
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
export default AltaActividad;