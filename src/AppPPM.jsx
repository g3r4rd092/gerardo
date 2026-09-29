import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bis1 from './assets/imagenes/bis-1.jpg';
import bisLogo from './assets/imagenes/bis-logo.jpg';

function AppPPM() {
    const [form, setForm] = useState({
        usuario: "",
        password: "",
    });

    const [errores, setErrores] = useState({});
    const navigate = useNavigate();

    const validar = () => {
        let nuevosErrores = {};

        if (!form.usuario.trim()) {
            nuevosErrores.usuario =
                "El número de empleado es obligatorio";
        }

        if (!form.password) {
            nuevosErrores.password =
                "La contraseña es obligatoria";
        } else if (form.password.length < 8) {
            nuevosErrores.password =
                "La contraseña debe tener al menos 8 caracteres";
        }

        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validar()) {
            return;
        }

        try {
            const respuesta = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const datos = await respuesta.json();

            if (datos.success) {
                localStorage.setItem(
                    "usuario",
                    JSON.stringify(datos.usuario)
                );

                navigate("/inicio");
            } else {
                alert(datos.mensaje);
            }
        } catch (error) {
            console.error(error);

            setErrores({
                login: "No fue posible conectar con el servidor",
            });
        }
    };

    return (
        <section
            className="vh-100"
            style={{ backgroundColor: "#005f9f" }}
        >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div
                            className="card card-login"
                            style={{ borderRadius: "1rem" }}
                        >
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src={bis1}
                                        className="img-fluid"
                                        style={{ borderRadius: "1rem 0 0 1rem", height: "89%", width: "100%" }}
                                    />
                                </div>

                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleSubmit}>
                                            <div className="div-logo">
                                                <img
                                                    src={bisLogo}
                                                    className="img-fluid"
                                                    style={{ borderRadius: "1rem 0 0 1rem" }}
                                                    alt="Logo BIS"
                                                />
                                            </div>

                                            <div>
                                                <span className="h1 fw-bold mb-0 h1-ppm">
                                                    Sistema de portafolio de proyectos
                                                </span>
                                            </div>

                                            <br />

                                            <h5
                                                className="fw-normal mb-3 pb-3"
                                                style={{
                                                    letterSpacing: 1,
                                                }}
                                            >
                                                Ingrese sus credenciales
                                            </h5>

                                            {/* Usuario */}
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Usuario o email"
                                                    value={form.usuario}
                                                    onChange={(e) => {
                                                        setForm({
                                                            ...form,
                                                            usuario:
                                                                e.target.value,
                                                        });

                                                        setErrores({
                                                            ...errores,
                                                            usuario: "",
                                                            login: "",
                                                        });
                                                    }}
                                                />
                                            </div>

                                            {errores.usuario && (
                                                <div
                                                    className="alert alert-danger"
                                                    role="alert"
                                                >
                                                    {errores.usuario}
                                                </div>
                                            )}

                                            {/* Password */}
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    placeholder="Contraseña"
                                                    value={form.password}
                                                    onChange={(e) => {
                                                        setForm({
                                                            ...form,
                                                            password:
                                                                e.target.value,
                                                        });

                                                        setErrores({
                                                            ...errores,
                                                            password: "",
                                                            login: "",
                                                        });
                                                    }}
                                                />
                                            </div>

                                            {errores.password && (
                                                <div
                                                    className="alert alert-danger"
                                                    role="alert"
                                                >
                                                    {errores.password}
                                                </div>
                                            )}

                                            {/* Error Login */}
                                            {errores.login && (
                                                <div
                                                    className="alert alert-danger"
                                                    role="alert"
                                                >
                                                    {errores.login}
                                                </div>
                                            )}

                                            <div className="pt-1 mb-4">
                                                <input
                                                    className="btn btn-bis"
                                                    type="submit"
                                                    value="Entrar"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AppPPM;