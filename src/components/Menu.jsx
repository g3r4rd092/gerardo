import { Link, useLocation, useNavigate } from "react-router-dom";
import IconoBis from "../assets/imagenes/bis-logo.jpg";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "../css/estilos.css";
import "../css/sidebars.css";

import * as bootstrap from 'bootstrap';
import { useState, useEffect } from "react";
import { obtenerMenus } from "../services/menuService";

function Menu() {
    const [menuAbierto, setMenuAbierto] = useState(null);
    const [menus, setMenus] = useState([]);
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

            localStorage.setItem(
                "id_perfil",
                datos.usuario.id_perfil
            );

            navigate("/inicio");
        }
    };

    // Obtener el usuario guardado después del login
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const perfil = usuario?.id_perfil;

    useEffect(() => {

        cargarMenus();

    }, []);


    const cargarMenus =
        async () => {

            try {

                const data =
                    await obtenerMenus(perfil);

                console.log("MENUS RECIBIDOS");
                console.log(data);

                setMenus(data.menus);

            } catch (error) {

                console.error(error);

            }

        };

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
    console.log(bootstrap);

    const toggleMenu = (menu) => {
        setMenuAbierto(
            menuAbierto === menu
                ? null
                : menu
        );
    };

    const menusPadre =
        menus.filter(
            item =>
                item.padre === null
        );

    const obtenerSubmenus =
        (idPadre) => {

            return menus.filter(
                item =>
                    item.padre === idPadre
            );

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

                    {menusPadre.map((menu) => (<li key={menu.idmenu} className="mb-1" > <button className="btn btn-toggle align-items-center rounded collapsed" onClick={() => toggleMenu(menu.idmenu)} > {menu.nombre} </button> <div className={menuAbierto === menu.idmenu ? "collapse show" : "collapse"} > <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small"> {obtenerSubmenus(menu.idmenu).map((submenu) => (<li key={submenu.idmenu} > <Link to={submenu.ruta} className={menuActivo(submenu.ruta)} > {submenu.nombre} </Link> </li>))} </ul> </div> </li>))}



                    {/* SEPARADOR */}
                    <li className="border-top my-3"></li>


                    {/* CUENTA */}
                    <li className="mb-1">

                        <button
                            className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            onClick={() => toggleMenu("perfil")}
                        >
                            Mi perfil
                        </button>

                        <div
                            className={menuAbierto === "perfil" ? "collapse show" : "collapse"}
                            id="perfil-collapse"
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

