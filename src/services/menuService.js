const API_URL =
    "http://localhost:3001";

export const obtenerMenus =
    async (perfil) => {

        const response =
            await fetch(
                `${API_URL}/menus/${perfil}`
            );

        const data =
            await response.json();

        if (!response.ok) {

            throw new Error(
                data.mensaje
            );

        }

        return data;

    };