export const buscarProyectoPorId = async (idProyecto) => {

    const response = await fetch(
        `http://localhost:3001/proyecto/${idProyecto}`
    );

    return await response.json();
};
