import Menu from "../components/Menu";

function Inicio() {
    return (
        <div className="d-flex">

            <Menu />

            <main className="flex-grow-1">
                <div className="container-fluid p-4">

                    <h1>Bienvenido al Sistema PPM</h1>

                    <hr />

                    <p>
                        Has iniciado sesión correctamente.
                    </p>

                </div>
            </main>

        </div>
    );
}

export default Inicio;