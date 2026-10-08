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