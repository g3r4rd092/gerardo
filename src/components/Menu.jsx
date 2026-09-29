import { Link, useLocation, useNavigate } from "react-router-dom";

function Menu() {
    const location = useLocation();
    const navigate = useNavigate();

    // Obtener el usuario guardado después del login
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // Cerrar sesión
    const cerrarSesion = () => {
        localStorage.removeItem("usuario");
        navigate("/login");
    };

    // Determinar si una ruta está activa
    const menuActivo = (ruta) => {
        return location.pathname === ruta
            ? "link-dark rounded active"
            : "link-dark rounded";
    };

    return (
        <main>
            <aside
                className="flex-shrink-0 p-3 bg-white"
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
                    <span className="fs-5 fw-semibold">
                        Sistema PPM
                    </span>
                </Link>

                {/* Menú */}
                <ul className="list-unstyled ps-0">

                    {/* INICIO */}
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#inicio-collapse"
                            aria-expanded="false"
                        >
                            Inicio
                        </button>

                        <div
                            className="collapse"
                            id="inicio-collapse"
                        >
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                <li>
                                    <Link
                                        to="/inicio"
                                        className={menuActivo("/inicio")}
                                    >
                                        Inicio
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/dashboard"
                                        className={menuActivo("/dashboard")}
                                    >
                                        Dashboard
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </li>


                    {/* ÓRDENES */}
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#ordenes-collapse"
                            aria-expanded="false"
                        >
                            Órdenes
                        </button>

                        <div
                            className="collapse"
                            id="ordenes-collapse"
                        >
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                <li>
                                    <Link
                                        to="/ordenes"
                                        className={menuActivo("/ordenes")}
                                    >
                                        Todas las órdenes
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/ordenes/nueva"
                                        className={menuActivo("/ordenes/nueva")}
                                    >
                                        Nueva orden
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </li>


                    {/* PRODUCTOS */}
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#productos-collapse"
                            aria-expanded="false"
                        >
                            Productos
                        </button>

                        <div
                            className="collapse"
                            id="productos-collapse"
                        >
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                <li>
                                    <Link
                                        to="/productos"
                                        className={menuActivo("/productos")}
                                    >
                                        Productos
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/productos/nuevo"
                                        className={menuActivo("/productos/nuevo")}
                                    >
                                        Nuevo producto
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </li>


                    {/* CLIENTES */}
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#clientes-collapse"
                            aria-expanded="false"
                        >
                            Clientes
                        </button>

                        <div
                            className="collapse"
                            id="clientes-collapse"
                        >
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                <li>
                                    <Link
                                        to="/clientes"
                                        className={menuActivo("/clientes")}
                                    >
                                        Clientes
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/clientes/nuevo"
                                        className={menuActivo("/clientes/nuevo")}
                                    >
                                        Nuevo cliente
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
                            Cuenta
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
                            <strong>
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
            <script src="./assets/dist/js/bootstrap.bundle.min.js"></script>

            <script src="./js/sidebars.js"></script>
        </main>


    );
}

export default Menu;

