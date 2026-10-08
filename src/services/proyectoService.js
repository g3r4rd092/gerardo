const API_URL = "http://localhost:3001";

export const registrarProyecto = async (proyecto) => {

    const response = await fetch(`${API_URL}/altaProyectos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(proyecto)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al crear proyecto");
    }

    return data;
};

export const obtenerCatalogoProyectos = async () => {

    const response = await fetch(
        `${API_URL}/altaProyectos`
    );

    if (!response.ok) {
        throw new Error(
            "Error al obtener catalogo de proyectos"
        );
    }

    return await response.json();
};

export const actualizarCatalogoProyectos = async (
    id,
    proyecto
) => {

    const response = await fetch(
        `${API_URL}/altaProyectos/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proyecto)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al modificar proyecto"
        );

    }

    return data;
};

export const eliminarProyectoCatalogo = async (id) => {

    const response = await fetch(
        `${API_URL}/altaProyectos/${id}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al dar de baja proyecto"
        );

    }

    return data;
};