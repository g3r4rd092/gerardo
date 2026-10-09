import Menu from "../components/Menu";
import React, { useEffect, useState } from "react";
import { obtenerDashboard, obtenerEstatusProyectos, obtenerEstatusActividades, obtenerEstatusRiesgos } from "../services/dashboardService";
import "../css/ganttDashboard.css";

//Importar recharts para mostrar gráficas
import { Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
    PieChart,
    Pie,

    Legend
} from "recharts";


function GanttDashboard() {

    const [dashboard, setDashboard] = useState({
        proyectos: 0,
        actividades: 0,
        riesgos: 0,
        incidencias: 0
    });

    const datosProyectos = [
        {
            estado: "En progreso",
            total: Number(dashboard.en_progreso),
            color: "#198754"
        },
        {
            estado: "En riesgo",
            total: Number(dashboard.en_riesgo),
            color: "#ffc107"
        },
        {
            estado: "Retrasado",
            total: Number(dashboard.retrasado),
            color: "#dc3545"
        }
    ];

    const datosActividades = [
        {
            estado: "En progreso",
            total: Number(dashboard.en_progreso),
            color: "#198754"
        },
        {
            estado: "En riesgo",
            total: Number(dashboard.en_riesgo),
            color: "#ffc107"
        },
        {
            estado: "Retrasado",
            total: Number(dashboard.retrasadas),
            color: "#dc3545"
        }
    ];

    const datosRiesgos = [
        {
            estado: "Finalizados",
            total: Number(dashboard.finalizado),
            color: "#198754"
        },
        {
            estado: "Abiertos",
            total: Number(dashboard.abierto),
            color: "#ffc107"
        },
        {
            estado: "En mitigación",
            total: Number(dashboard.en_mitigacion),
            color: "#dc3545"
        }
    ];

    useEffect(() => {

        cargarDashboard();
        cargarEstatusProyectos();
        cargarEstatusActividades();
        cargarEstatusRiesgos();
    }, []);

    const cargarDashboard = async () => {

        try {

            const data =
                await obtenerDashboard();
            console.log(data);

            console.log(data);

            setDashboard(data);

        } catch (error) {

            console.error(error);

        }

    };

    const [estatusProyectos, setEstatusProyectos] =
        useState([]);

    const cargarEstatusProyectos = async () => {

        try {

            const data =
                await obtenerEstatusProyectos();

            console.log(data);

            setEstatusProyectos(data);

        } catch (error) {

            console.error(error);

        }

    };

    const [estatusActividades, setEstatusActividades] =
        useState([]);

    const cargarEstatusActividades = async () => {

        try {

            const data =
                await obtenerEstatusActividades();

            console.log(data);

            setEstatusActividades(data);

        } catch (error) {

            console.error(error);

        }

    };

    const [estatusRiesgos, setEstatusRiesgos] =
        useState([]);

    const cargarEstatusRiesgos = async () => {

        try {

            const data =
                await obtenerEstatusRiesgos();

            console.log(data);

            setEstatusRiesgos(data);

        } catch (error) {

            console.error(error);

        }

    };

    return (
        <div className="d-flex">
            <Menu />
            <div style={{ width: "stretch" }}>
                <div>
                    <h3 className="mb-5 text-uppercase">
                        Dashboard general
                    </h3>
                </div>
                <div className="row mb-4">

                    <div className="col-md-4">

                        <div className="card text-center">

                            <div className="card-body">

                                <h6>Proyectos</h6>

                                <h2>
                                    {dashboard.proyectos}
                                </h2>
                                <hr />

                                <div className="text-start">

                                    <p className="text-success mb-1">
                                        En progreso:
                                        {dashboard.en_progreso}
                                    </p>

                                    <p className="text-warning mb-1">
                                        En riesgo:
                                        {dashboard.en_riesgo}
                                    </p>

                                    <p className="text-danger mb-1">
                                        Retrasados:
                                        {dashboard.retrasado}
                                    </p>

                                </div>

                            </div>

                            <div className="card mt-4">

                                <div className="card-body">

                                    <h5>
                                        Distribución de proyectos
                                    </h5>

                                    <ResponsiveContainer
                                        width="100%"
                                        height={250}
                                    >

                                        <PieChart>

                                            <Pie
                                                data={datosProyectos}
                                                dataKey="total"
                                                nameKey="estado"
                                                outerRadius={80}
                                                label
                                            >

                                                {datosProyectos.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={index}
                                                            fill={entry.color}
                                                        />
                                                    )
                                                )}

                                            </Pie>

                                            <Tooltip />

                                            <Legend />

                                        </PieChart>

                                    </ResponsiveContainer>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card text-center">

                            <div className="card-body">

                                <h6>Actividades</h6>

                                <h2>
                                    {dashboard.actividades}
                                </h2>
                                <hr />

                                <div className="text-start">

                                    <p className="text-success mb-1">
                                        En progreso:
                                        {dashboard.en_progreso}
                                    </p>

                                    <p className="text-warning mb-1">
                                        En riesgo:
                                        {dashboard.en_riesgo}
                                    </p>

                                    <p className="text-danger mb-1">
                                        Retrasadas:
                                        {dashboard.retrasadas}
                                    </p>

                                </div>

                            </div>

                            <div className="card mt-4">

                                <div className="card-body">

                                    <h5>
                                        Distribución de actividades
                                    </h5>

                                    <ResponsiveContainer
                                        width="100%"
                                        height={250}
                                    >

                                        <PieChart>

                                            <Pie
                                                data={datosActividades}
                                                dataKey="total"
                                                nameKey="estado"
                                                outerRadius={80}
                                                label
                                            >

                                                {datosActividades.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={index}
                                                            fill={entry.color}
                                                        />
                                                    )
                                                )}

                                            </Pie>

                                            <Tooltip />

                                            <Legend />

                                        </PieChart>

                                    </ResponsiveContainer>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card text-center">

                            <div className="card-body">

                                <h6>Riesgos</h6>

                                <h2>
                                    {dashboard.riesgos}
                                </h2>
                                <hr />

                                <div className="text-start">

                                    <p className="text-success mb-1">
                                        Finalizados:
                                        {dashboard.finalizado}
                                    </p>

                                    <p className="text-warning mb-1">
                                        Abiertos:
                                        {dashboard.abierto}
                                    </p>

                                    <p className="text-danger mb-1">
                                        En mitigación:
                                        {dashboard.en_mitigacion}
                                    </p>

                                </div>

                            </div>

                            <div className="card mt-4">

                                <div className="card-body">

                                    <h5>
                                        Distribución de riesgos
                                    </h5>

                                    <ResponsiveContainer
                                        width="100%"
                                        height={250}
                                    >

                                        <PieChart>

                                            <Pie
                                                data={datosRiesgos}
                                                dataKey="total"
                                                nameKey="estado"
                                                outerRadius={80}
                                                label
                                            >

                                                {datosRiesgos.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={index}
                                                            fill={entry.color}
                                                        />
                                                    )
                                                )}

                                            </Pie>

                                            <Tooltip />

                                            <Legend />

                                        </PieChart>

                                    </ResponsiveContainer>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );

}

export default GanttDashboard;