const API_URL = "http://localhost:3001";

export const registrarIncidencia = async (datos) => {

    const response = await fetch(
        `${API_URL}/incidencia`,
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
            "Error al guardar incidencia"
        );

    }

    return data;

};

export const obtenerIncidencias = async () => {

    const response = await fetch(
        `${API_URL}/incidencia`
    );

    if (!response.ok) {
        throw new Error(
            "Error al listar las incidencias"
        );
    }

    return await response.json();
};

export const actualizarIncidencia = async (
    id,
    incidencia
) => {    

    const response = await fetch(
        `${API_URL}/incidencia/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(incidencia)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al actualizar incidencia"
        );

    }

    return data;
};

export const eliminarIncidencia = async (id) => {

    const response = await fetch(
        `${API_URL}/incidencia/${id}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al eliminar incidencia"
        );

    }

    return data;
};