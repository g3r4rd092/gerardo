import { useState } from "react";

export const useActividades = () => {

    const [actividades, setActividades] = useState([]);

    const agregarActividad = (
        nombreActividad,
        fechaInicio,
        fechaTermino
    ) => {

        const nuevaActividad = {
            id: actividades.length + 1,
            nombreActividad,
            fechaInicio,
            fechaTermino
        };

        setActividades(prev => [...prev, nuevaActividad]);
    };

    return {
        actividades,
        agregarActividad
    };
};
