const API_URL = "http://localhost:3001";

export const buscarProyectoPorId = async (idProyecto) => {

    const response = await fetch(
        `${API_URL}/proyecto/${idProyecto}`
    );

    return await response.json();
};

export const registrarActividades = async (datos) => {

    const response = await fetch(
        `${API_URL}/actividades`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al registrar actividades"
        );

    }

    return data;

};
