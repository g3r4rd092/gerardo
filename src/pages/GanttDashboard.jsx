import Menu from "../components/Menu";
import React, { useEffect, useState } from "react";
import "../css/ganttDashboard.css";
import { calcularOffset, calcularDuracion, generarFechas, generarMeses, obtenerColorAvance} from "../utils/ganttUtils";

function GanttDashboard() {
    const [proyectos, setProyectos] = useState([]);

    useEffect(() => {
        cargarProyectos();
    }, []);

    const cargarProyectos = async () => {
        try {
            const datos = [
                {
                    id: 1,
                    nombre: "Administración BD Colaboradores",
                    fecha_inicio: "2026-09-01",
                    fecha_fin: "2026-09-30",
                    avance: 85,
                    responsable: "Josué",
                },
                {
                    id: 2,
                    nombre: "Portal Clientes",
                    fecha_inicio: "2026-09-10",
                    fecha_fin: "2026-10-15",
                    avance: 70,
                    responsable: "Laura",
                },
                {
                    id: 3,
                    nombre: "Sistema RH",
                    fecha_inicio: "2026-09-20",
                    fecha_fin: "2026-10-31",
                    avance: 15,
                    responsable: "Carlos",
                },
            ];

            setProyectos(datos);
        } catch (error) {
            console.error(error);
        }
    };

    const fechaInicioGlobal = new Date(2026, 8, 1);
    const fechaFinGlobal = new Date(2026, 9, 31);

    const totalDias =
        ((fechaFinGlobal - fechaInicioGlobal) /
            (1000 * 60 * 60 * 24)) + 1;

    const fechas = generarFechas(
        fechaInicioGlobal,
        fechaFinGlobal
    );

    const meses = generarMeses(
        fechaInicioGlobal,
        fechaFinGlobal,
        totalDias
    );


    return (
        <div className="d-flex">
            <Menu />
            <div className="gantt-container">

                <h2 className="mb-4">
                    Dashboard de Proyectos
                </h2>

                <div className="gantt-scroll">

                    {/* Fila de meses */}
                    <div className="gantt-calendar-row">
                        <div className="proyecto-info"></div>

                        <div className="meses">
                            {meses.map((mes, index) => (
                                <div
                                    key={index}
                                    className="mes"
                                    style={{
                                        width: `${mes.width}%`,
                                    }}
                                >
                                    {mes.nombre}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fila de días */}
                    <div className="gantt-calendar-row">
                        <div className="proyecto-info"></div>

                        <div className="gantt-header">
                            {fechas.map((fecha, index) => (
                                <div key={index} className="dia">
                                    <div>
                                        {fecha.toLocaleDateString("es-MX", {
                                            weekday: "narrow",
                                        })}
                                    </div>

                                    <div>
                                        {fecha.getDate()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {proyectos.map((proyecto) => (
                        <div
                            key={proyecto.id}
                            className="gantt-row"
                        >
                            <div className="proyecto-info">
                                <strong>{proyecto.nombre}</strong>
                                <br />
                                {proyecto.responsable}
                            </div>

                            <div className="timeline">
                                <div
                                    className="barra-gantt"
                                    style={{
                                        left: `${calcularOffset(
                                            proyecto.fecha_inicio,
                                            fechaInicioGlobal,
                                            totalDias
                                        )}%`,
                                        width: `${calcularDuracion(
                                            proyecto.fecha_inicio,
                                            proyecto.fecha_fin,
                                            totalDias
                                        )}%`,
                                        backgroundColor: obtenerColorAvance(
                                            proyecto.avance
                                        ),
                                    }}
                                >
                                    {proyecto.avance}%
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
                <div className="d-flex flex-column mt-3" style={{ gap: "10px", margin: "auto" }}>
                    <label className="mb-2" style={{ fontWeight: "bold" }}>
                        Estatus de riesgo y escala: 
                    </label>
                    <span className="d-block p-2 text-bg-success">En cumplimiento (más de 80% de avance)</span>
                    <span className="d-block p-2 text-bg-warning">En riesgo (entre 50% y 80% de avance)</span>
                    <span className="d-block p-2 text-bg-danger">Retrasado (menos de 50% de avance)</span>
                </div>
            </div>
        </div>

    );
}

export default GanttDashboard;