const API_URL = "http://localhost:3001";

export const obtenerDashboard = async () => {

    const response = await fetch(
        `${API_URL}/dashboard`
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al obtener dashboard"
        );

    }

    return data;

};

export const obtenerEstatusProyectos = async () => {

    const response = await fetch(
        `${API_URL}/dashboard/estatus-proyectos`
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al obtener estatus"
        );

    }

    return data;

};

export const obtenerEstatusActividades = async () => {

    const response = await fetch(
        `${API_URL}/dashboard/estatus-actividades`
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al obtener estatus"
        );

    }

    return data;

};

export const obtenerEstatusRiesgos = async () => {

    const response = await fetch(
        `${API_URL}/dashboard/estatus-riesgos`
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al obtener estatus"
        );

    }

    return data;

};