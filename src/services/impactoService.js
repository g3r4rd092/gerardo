const API_URL = "http://localhost:3001";

export const registrarImpacto = async (impacto) => {

    const response = await fetch(`${API_URL}/impactos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(impacto)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al agregar impacto");
    }

    return data;
};

export const obtenerImpactos = async () => {

    const response = await fetch(
        `${API_URL}/impactos`
    );

    if (!response.ok) {
        throw new Error(
            "Error al listar los impactos"
        );
    }

    return await response.json();
};

export const actualizarImpacto = async (
    id,
    impacto
) => {

    console.log("ID:");

    console.log(id);

    const response = await fetch(
        `${API_URL}/impactos/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(impacto)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al modificar impacto"
        );

    }

    return data;
};

export const eliminarImpacto = async (id) => {

    const response = await fetch(
        `${API_URL}/impactos/${id}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al eliminar impacto"
        );

    }

    return data;
};
