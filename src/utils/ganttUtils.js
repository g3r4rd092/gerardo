export const convertirFecha = (fechaTexto) => {
    const [anio, mes, dia] = fechaTexto
        .split("-")
        .map(Number);

    return new Date(anio, mes - 1, dia);
};

export const calcularOffset = (
    fecha,
    fechaInicioGlobal,
    totalDias
) => {
    const dias =
        (convertirFecha(fecha) - fechaInicioGlobal) /
        (1000 * 60 * 60 * 24);

    return (dias / totalDias) * 100;
};

export const calcularDuracion = (
    inicio,
    fin,
    totalDias
) => {
    const dias =
        (convertirFecha(fin) -
            convertirFecha(inicio)) /
        (1000 * 60 * 60 * 24);

    return ((dias + 1) / totalDias) * 100;
};

export const generarFechas = (
    fechaInicio,
    fechaFin
) => {
    const fechas = [];

    for (
        let fecha = new Date(fechaInicio);
        fecha <= fechaFin;
        fecha.setDate(fecha.getDate() + 1)
    ) {
        fechas.push(new Date(fecha));
    }

    return fechas;
};

export const generarMeses = (
    fechaInicio,
    fechaFin,
    totalDias
) => {
    const meses = [];

    let fechaMes = new Date(
        fechaInicio.getFullYear(),
        fechaInicio.getMonth(),
        1
    );

    while (fechaMes <= fechaFin) {
        const inicioMes = new Date(
            fechaMes.getFullYear(),
            fechaMes.getMonth(),
            1
        );

        const finMes = new Date(
            fechaMes.getFullYear(),
            fechaMes.getMonth() + 1,
            0
        );

        const diasMes =
            Math.floor(
                (Math.min(finMes, fechaFin) -
                    inicioMes) /
                (1000 * 60 * 60 * 24)
            ) + 1;

        meses.push({
            nombre:
                inicioMes.toLocaleDateString(
                    "es-MX",
                    {
                        month: "long",
                        year: "numeric",
                    }
                ),
            width:
                (diasMes / totalDias) * 100,
        });

        fechaMes = new Date(
            fechaMes.getFullYear(),
            fechaMes.getMonth() + 1,
            1
        );
    }

    return meses;
};

export const obtenerColorAvance = (avance) => {
    if (avance < 50) {
        return "#dc3545"; // Rojo
    }

    if (avance < 80) {
        return "#ffc107"; // Amarillo
    }

    return "#198754"; // Verde
};
