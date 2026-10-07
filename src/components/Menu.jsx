import { Link, useLocation, useNavigate } from "react-router-dom";
import IconoBis from "../assets/imagenes/bis-logo.jpg";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function Menu() {
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const iniciarSesion = async () => {
        const respuesta = await fetch(
            "http://localhost:3001/inicio",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const datos = await respuesta.json();

        if (datos.success) {

            localStorage.setItem(
                "token",
                datos.token
            );

            localStorage.setItem(
                "usuario",
                JSON.stringify(datos.usuario)
            );

            console.log("TOKEN GUARDADO:",
                localStorage.getItem("token")
            );

            navigate("/inicio");
        }
    };

    // Obtener el usuario guardado después del login
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // Cerrar sesión
    const cerrarSesion = async () => {

        const resultado = await Swal.fire({
            title: "¿Cerrar sesión?",
            text: "Finalizarás tu sesión actual",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "Cancelar"
        });

        if (!resultado.isConfirmed) return;

        localStorage.clear();

        navigate("/");
    };

    // Determinar si una ruta está activa
    const menuActivo = (ruta) => {
        return location.pathname.includes(ruta)
            ? "activo"
            : "";
    };


    return (

        <main>
            <aside
                className="flex-shrink-0 p-3 bg-white aside-scroll"
                style={{
                    width: "280px",
                    minHeight: "100vh"
                }}
            >
                {/* Nombre del sistema */}
                <Link
                    to="/inicio"
                    className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
                >
                    <img
                        src={IconoBis}
                        alt="Bis logo"
                        style={{ width: "200px", height: "80px" }}
                    />
                    {/*<span className="fs-5 fw-semibold ms-2">
                        Sistema PPM
                    </span>*/}
                </Link>

                {/* Menú */}
                <ul className="list-unstyled ps-0" style={{ textAlign: "justify" }}>

                    {/* USUARIOS*/}
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#inicio-collapse"
                            aria-expanded="false"
                        >
                            Usuarios
                        </button>

                        <div
                            className="collapse"
                            id="inicio-collapse"
                        >
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                <li>
                                    <Link
                                        to="/registro-usuarios"
                                        className={menuActivo("/registro-usuarios")}
                                    >
                                        Crear usuario
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/modifica-usuarios"
                                        className={menuActivo("/modifica-usuarios")}
                                    >
                                        Control de usuarios
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </li>


                    {/* PROYECTOS */}
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#ordenes-collapse"
                            aria-expanded="false"
                        >
                            Proyectos
                        </button>

                        <div
                            className="collapse"
                            id="ordenes-collapse"
                        >
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                <li>
                                    <Link
                                        to="/alta-proyecto"
                                        className={menuActivo("/alta-proyecto")}
                                    >
                                        Crear proyecto
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/ordenes/nueva"
                                        className={menuActivo("/ordenes/nueva")}
                                    >
                                        Modificar proyecto
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/ordenes/nueva"
                                        className={menuActivo("/ordenes/nueva")}
                                    >
                                        Eliminar proyecto
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </li>


                    {/* ACTIVIDADES */}
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#productos-collapse"
                            aria-expanded="false"
                        >
                            Actividades
                        </button>

                        <div
                            className="collapse"
                            id="productos-collapse"
                        >
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                <li>
                                    <Link
                                        to="/alta-actividad"
                                        className={menuActivo("/alta-actividad")}
                                    >
                                        Crear actividad
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/productos/nuevo"
                                        className={menuActivo("/productos/nuevo")}
                                    >
                                        Modificar actividad
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/productos/nuevo"
                                        className={menuActivo("/productos/nuevo")}
                                    >
                                        Eliminar actividad
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </li>


                    {/* RIESGOS */}
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#riesgos-collapse"
                            aria-expanded="false"
                        >
                            Riesgos
                        </button>

                        <div
                            className="collapse"
                            id="riesgos-collapse"
                        >
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                <li>
                                    <Link
                                        to="/registro-EstadoRiesgos"
                                        className={menuActivo("/registro-EstadoRiesgos")}
                                    >
                                        Estados de riesgo
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/alta-riesgos"
                                        className={menuActivo("/alta-riesgos")}
                                    >
                                        Registrar riesgo
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/catalogo-riesgos"
                                        className={menuActivo("/catalogo-riesgos")}
                                    >
                                        Control de riesgos
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </li>

                    {/* INCIDENCIAS */}
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#incidencias-collapse"
                            aria-expanded="false"
                        >
                            Incidencias
                        </button>

                        <div
                            className="collapse"
                            id="incidencias-collapse"
                        >
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                <li>
                                    <Link
                                        to="/clientes"
                                        className={menuActivo("/clientes")}
                                    >
                                        Crear incidencia
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </li>

                    {/* IMPACTOS */}
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#impactos-collapse"
                            aria-expanded="false"
                        >
                            Impactos
                        </button>

                        <div
                            className="collapse"
                            id="impactos-collapse"
                        >
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                <li>
                                    <Link
                                        to="/registro-impactos"
                                        className={menuActivo("/registro-impactos")}
                                    >
                                        Control de registros
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </li>

                    {/* DASHBOARD */}
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#dashboard-collapse"
                            aria-expanded="false"
                        >
                            Dashboard
                        </button>

                        <div
                            className="collapse"
                            id="dashboard-collapse"
                        >
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                <li>
                                    <Link
                                        to="/gantt-dashboard"
                                        className={menuActivo("/gantt-dashboard")}
                                    >
                                        Gráfica general
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/clientes"
                                        className={menuActivo("/clientes")}
                                    >
                                        Gráfica por proyectos
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </li>



                    {/* SEPARADOR */}
                    <li className="border-top my-3"></li>


                    {/* CUENTA */}
                    <li className="mb-1">

                        <button
                            className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#account-collapse"
                            aria-expanded="false"
                        >
                            Mi perfil
                        </button>

                        <div
                            className="collapse"
                            id="account-collapse"
                        >
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                <li>
                                    <Link
                                        to="/perfil"
                                        className={menuActivo("/perfil")}
                                    >
                                        Perfil
                                    </Link>
                                </li>

                                <li>
                                    <button
                                        className="btn btn-link link-dark rounded text-decoration-none p-0"
                                        onClick={cerrarSesion}
                                    >
                                        Cerrar sesión
                                    </button>
                                </li>

                            </ul>
                        </div>

                    </li>

                </ul>


                {/* USUARIO */}
                <div className="border-top mt-3 pt-3">

                    <div className="d-flex align-items-center">

                        {/* Avatar */}
                        <div
                            className="rounded-circle bg-secondary d-flex align-items-center justify-content-center me-2"
                            style={{
                                width: "40px",
                                height: "40px",
                                minWidth: "40px"
                            }}
                        >
                            <span className="text-white fw-bold">
                                {usuario?.nombre
                                    ? usuario.nombre.charAt(0).toUpperCase()
                                    : "U"}
                            </span>
                        </div>

                        {/* Nombre */}
                        <div className="text-truncate">
                            <strong id="strongNombre-usuario">
                                {usuario?.nombre || "Usuario"}
                            </strong>

                            {usuario?.email && (
                                <small className="d-block text-muted text-truncate">
                                    {usuario.email}
                                </small>
                            )}
                        </div>

                    </div>

                </div>

            </aside>

        </main>


    );
}

export default Menu;

