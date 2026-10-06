const API_URL = "http://localhost:3001";

export const registrarUsuario = async (usuario) => {

    const response = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al registrar usuario");
    }

    return data;
};

export const actualizarUsuario = async (usuario) => {

    try {

        const response = await fetch(
            `${API_URL}/usuarios/${usuario.id_usuario}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            }
        );

        return await response.json();

    } catch (error) {

        console.error(error);

        return {
            success: false,
            mensaje: "Error al actualizar"
        };
    }
};

export const eliminarEmpleado = async (id) => {

    const response = await fetch(
        `${API_URL}/usuarios/${id}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.mensaje ||
            "Error al dar de baja al empleado"
        );

    }

    return data;
};