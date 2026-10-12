const API_URL = "http://localhost:3001";

export const registrarClientes = async (datos) => {

    const response = await fetch(
        `${API_URL}/clientes`,
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
            "Error al registrar nuevo cliente"
        );

    }

    return data;

};

export const obtenerClientes = async () => {

    const response = await fetch(
        `${API_URL}/clientes`
    );

    if (!response.ok) {
        throw new Error(
            "Error al listar clientes del catálogo"
        );
    }

    return await response.json();
};

export const actualizarCliente = async (
    id,
    cliente
) => {    

    const response = await fetch(
        `${API_URL}/clientes/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al guardar nuevos datos del cliente"
        );

    }

    return data;
};

export const eliminarCliente = async (id) => {

    const response = await fetch(
        `${API_URL}/clientes/${id}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al eliminar cliente del catálogo"
        );

    }

    return data;
};