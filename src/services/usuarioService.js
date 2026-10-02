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

export const actualizarUsuario = async () => {

    try {

        const response = await fetch(
            `${API_URL}/usuarios/${form.id_usuario}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            }
        );

        const data = await response.json();

        alert(data.mensaje);

    } catch (error) {

        console.error(error);
        alert("Error al actualizar");

    }
};