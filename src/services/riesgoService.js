const API_URL = "http://localhost:3001";

export const registrarRiesgo = async (estadoRiesgo) => {

    const response = await fetch(`${API_URL}/estadoRiesgo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(estadoRiesgo)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al registrar riesgo");
    }

    return data;
};

export const obtenerEstadosRiesgo = async () => {

    const response = await fetch(
        `${API_URL}/estadoRiesgo`
    );

    if (!response.ok) {
        throw new Error(
            "Error al obtener estados de riesgo"
        );
    }

    return await response.json();
};

export const actualizarRiesgo = async (
    id,
    estadoRiesgo
) => {

    console.log("ID:");

    console.log(id);

    const response = await fetch(
        `${API_URL}/estadoRiesgo/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(estadoRiesgo)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al actualizar riesgo"
        );

    }

    return data;
};

export const eliminarRiesgo = async (id) => {

    const response = await fetch(
        `${API_URL}/estadoRiesgo/${id}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al eliminar riesgo"
        );

    }

    return data;
};


// RIESGOS //

export const crearRiesgo = async (nvoRiesgo) => {

    const response = await fetch(`${API_URL}/riesgos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nvoRiesgo)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al crear nuevo riesgo");
    }

    return data;
};

export const obtenerCatalogoRiesgos = async () => {

    const response = await fetch(
        `${API_URL}/riesgos`
    );

    if (!response.ok) {
        throw new Error(
            "Error al obtener catalogo de riesgos"
        );
    }

    return await response.json();
};

export const actualizarCatalogoRiesgo = async (
    id,
    riesgo
) => {

    const response = await fetch(
        `${API_URL}/riesgos/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(riesgo)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al actualizar riesgo"
        );

    }

    return data;
};