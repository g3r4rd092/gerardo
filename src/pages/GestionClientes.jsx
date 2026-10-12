import Menu from "../components/Menu";
import ModalEditarCatalogoClientes from "../components/modalEditCatalogClientes";
import * as bootstrap from 'bootstrap';
import { registrarClientes, obtenerClientes, actualizarCliente, eliminarCliente } from "../services/clienteService";
import "../css/estilos.css";
import { useEffect, useState } from "react";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function GestionClientes() {

    const [form, setForm] = useState({
        nombre: ""
    });

    const registroCliente = async () => {

        try {

            if (!form.nombre) {
                Swal.fire({
                    title: "Debe ingresar un nombre",
                    icon: "error",
                    text: "Favor de intentarlo de nuevo!"
                });

                return;
            }

            const nvoCliente = {
                nombre: form.nombre
            };

            const respuesta = await registrarClientes(nvoCliente);
            await cargarClientes();

            Swal.fire({
                title: respuesta.mensaje || "Cliente agregado correctamente",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            setForm({
                nombre: ""
            });

        } catch (error) {
            Swal.fire({
                title: "Hubo un error al registrar nuevo cliente",
                icon: "error",
                text: "Favor de intentarlo de nuevo!"
            });

        }
    };

    const [clientes, setClientes] = useState([]);

    const cargarClientes = async () => {

        try {

            const data =
                await obtenerClientes();
            console.log(data);

            setClientes(data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {

        cargarClientes();

    }, []);

    const [mostrarModal, setMostrarModal] = useState(false);

    const [clienteSeleccionado,
        setClienteSeleccionado] = useState(null);


    const guardarCambios = async (
        clienteActualizado
    ) => {

        try {

            await actualizarCliente(
                clienteActualizado.idcliente,
                clienteActualizado
            );

            const modalElement =
                document.getElementById(
                    "modalEditar"
                );

            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    modalElement
                );

            modal.hide();

            modal.dispose();

            document
                .querySelectorAll(
                    ".modal-backdrop"
                )
                .forEach(
                    element => element.remove()
                );

            document.body.classList.remove(
                "modal-open"
            );

            document.body.style.removeProperty(
                "padding-right"
            );

            await cargarClientes();

            Swal.fire({
                icon: "success",
                title: "Se han guardado los nuevos datos del cliente correctamente",
                timer: 1500,
                showConfirmButton: false
            });

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error al guardar los cambios",
                text: error.message
            });

        }

    };

    const bajaCliente = async (id) => {

        try {

            const resultado = await Swal.fire({

                title: "¿Eliminar registro?",

                text: "Esta acción no se puede deshacer",

                icon: "warning",

                showCancelButton: true,

                confirmButtonColor: "#d33",

                cancelButtonColor: "#6c757d",

                confirmButtonText: "Sí, eliminar",

                cancelButtonText: "Cancelar"

            });

            if (!resultado.isConfirmed) {

                return;

            }

            const respuesta =
                await eliminarCliente(id);

            await cargarClientes();

            //Cerrar el modal al mostrar alerta sweetalert
            const modalElement =
                document.getElementById("modalEditar");

            const modal =
                bootstrap.Modal.getInstance(modalElement);

            if (modal) {
                modal.hide();
            }

            // Eliminar backdrop sobrante
            document
                .querySelectorAll('.modal-backdrop')
                .forEach(el => el.remove());

            // Restaurar el body
            document.body.classList.remove('modal-open');
            document.body.style.removeProperty('padding-right');

            Swal.fire({

                title: "Eliminado",

                text: respuesta.mensaje,

                icon: "success",

                timer: 1500,

                showConfirmButton: false

            });

        } catch (error) {

            Swal.fire({

                title: "Error",

                text: error.message,

                icon: "error"

            });

        }

    };

    return (
        <div className="d-flex">
            <Menu />
            <div className="container-fluid p-4">
                <main className="flex-grow-1">
                    <div className="row d-flex justify-content-center align-items-center h-100" style={{ marginTop: "10px" }} id="div-proyecto">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card card-registration my-4" >
                                    <div className="row g-0" style={{ width: "100%" }}>
                                        <div>
                                            <div className="card-body p-3 text-black">
                                                <div className="card-header card-header-bis text-white">
                                                    <h5 className="mb-0">
                                                        <i class="bi bi-house-door-fill me-2"></i>
                                                        Clientes
                                                    </h5>
                                                </div>

                                                {/* Descripción */}
                                                <div data-mdb-input-init className="form-outline form-group" id="div-form-proyecto" >
                                                    <label htmlFor="form3Example8" className="form-label">Nombre</label>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg mb-3"
                                                        id="form3Example8"
                                                        value={form.nombre}
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                nombre: e.target.value
                                                            })
                                                        }

                                                    />
                                                </div>
                                                <div className="d-flex justify-content-end pt-3">
                                                    <button
                                                        className="btn btn-bis w-100"
                                                        onClick={registroCliente}
                                                    >
                                                        <i className="bi bi-plus-circle me-2"></i>
                                                        Crear nuevo
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card card-registration my-4" id="card-tabla">
                                    <div className="card-header card-header-bis text-white">
                                        <h5 className="mb-0">
                                            <i class="bi bi-house-door-fill me-2"></i>
                                            Nuestros clientes
                                        </h5>
                                    </div>
                                    <table class="table" id="tabla-actividades">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nombre cliente</th>
                                                <th scope="col">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {clientes.map((item) => (

                                                <tr key={item.idcliente}>

                                                    <th>
                                                        {item.idcliente}
                                                    </th>

                                                    <td>
                                                        {item.nombre}
                                                    </td>

                                                    <td>
                                                        <button
                                                            className="btn btn-warning btn-sm"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#modalEditar"
                                                            onClick={() => {
                                                                console.log(item);
                                                                setClienteSeleccionado(item);
                                                            }}
                                                        >
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm ms-2"
                                                            onClick={() =>
                                                                bajaCliente(
                                                                    item.idcliente
                                                                )
                                                            }
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <ModalEditarCatalogoClientes
                cliente={clienteSeleccionado}
                onGuardar={guardarCambios}
            />
        </div >
    );
}
export default GestionClientes;