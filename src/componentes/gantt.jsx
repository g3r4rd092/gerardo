import React from "react";

export default function GanttGraph() {
    const tasks = [
        {
            id: 1,
            name: "Análisis",
            start: 0,
            duration: 5,
            progress: 100,
        },
        {
            id: 2,
            name: "Desarrollo",
            start: 5,
            duration: 15,
            progress: 60,
        },
        {
            id: 3,
            name: "Pruebas",
            start: 20,
            duration: 7,
            progress: 20,
        },
    ];

    const days = 30;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Diagrama de Gantt</h2>

            {/* Cabecera */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `200px repeat(${days}, 40px)`,
                    fontWeight: "bold",
                }}
            >
                <div>Tarea</div>

                {Array.from({ length: days }, (_, i) => (
                    <div
                        key={i}
                        style={{
                            textAlign: "center",
                            border: "1px solid #ddd",
                        }}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>

            {/* Filas */}
            {tasks.map((task) => (
                <div
                    key={task.id}
                    style={{
                        display: "grid",
                        gridTemplateColumns: `200px repeat(${days}, 40px)`,
                        height: "40px",
                    }}
                >
                    <div
                        style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                        }}
                    >
                        {task.name}
                    </div>

                    {Array.from({ length: days }, (_, day) => {
                        const active =
                            day >= task.start &&
                            day < task.start + task.duration;

                        return (
                            <div
                                key={day}
                                style={{
                                    border: "1px solid #eee",
                                    backgroundColor: active
                                        ? "#1976d2"
                                        : "white",
                                }}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}