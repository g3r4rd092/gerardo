import { useState, useEffect } from "react";

const API_URL = "http://localhost:3001";

export const useCatalogos = () => {
    const [clientes, setClientes] = useState([]);
    const [prioridades, setPrioridades] = useState([]);
    const [consecutivo, setConsecutivo] = useState(1);
    const [perfiles, setPerfiles] = useState([]);
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [
                clientesRes,
                prioridadesRes,
                consecutivoRes,
                perfilesRes,
                estadosRes,
            ] = await Promise.all([
                fetch(`${API_URL}/clientes`),
                fetch(`${API_URL}/prioridades`),
                fetch(`${API_URL}/consecutivo`),
                fetch(`${API_URL}/perfiles`),
                fetch(`${API_URL}/estados-proyectos`)
            ]);

            setClientes(await clientesRes.json());
            setPrioridades(await prioridadesRes.json());
            setPerfiles(await perfilesRes.json());
            setEstados(await estadosRes.json());

            const consecutivoData = await consecutivoRes.json();

            if (
                consecutivoData.length > 0 &&
                consecutivoData[0].consecutivo
            ) {
                setConsecutivo(consecutivoData[0].consecutivo);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
        clientes,
        prioridades,
        consecutivo,
        perfiles,
        estados
    };
};