import Menu from "../components/Menu";
import React, { useEffect, useState } from "react";
import { obtenerDashboard } from "../services/dashboardService";
import "../css/ganttDashboard.css";
import { calcularOffset, calcularDuracion, generarFechas, generarMeses, obtenerColorAvance } from "../utils/ganttUtils";

function GanttDashboard() {

    const [dashboard, setDashboard] = useState({
        proyectos: 0,
        actividades: 0,
        riesgos: 0,
        incidencias: 0
    });

    useEffect(() => {

        cargarDashboard();

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

                    <div className="col-md-3">

                        <div className="card text-center">

                            <div className="card-body">

                                <h6>Proyectos</h6>

                                <h2>
                                    {dashboard.proyectos}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card text-center">

                            <div className="card-body">

                                <h6>Actividades</h6>

                                <h2>
                                    {dashboard.actividades}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card text-center">

                            <div className="card-body">

                                <h6>Riesgos</h6>

                                <h2>
                                    {dashboard.riesgos}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card text-center">

                            <div className="card-body">

                                <h6>Incidencias</h6>

                                <h2>
                                    {dashboard.incidencias}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );

}

export default GanttDashboard;