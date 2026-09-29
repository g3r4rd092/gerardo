const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Login
app.post("/login", async (req, res) => {
  try {

    const { usuario, password } = req.body;

    console.log("================================");
    console.log("Intento de login");
    console.log("Correo:", JSON.stringify(usuario));
    console.log("Password:", JSON.stringify(password));

    
    const datos = await respuesta.json();

    if (datos.success) {
      localStorage.setItem("usuario", JSON.stringify(datos.usuario));

      navigate("/inicio");
    } else {
      alert(datos.mensaje);
    }

    const resultado = await pool.query(
      `SELECT *
             FROM usuario
             WHERE correo = $1
             AND contrasena = $2`,
      [usuario.trim(), password.trim()]
    );

    console.log("Registros encontrados:", resultado.rows.length);

    if (resultado.rows.length === 0) {

      console.log("Credenciales incorrectas");

      return res.status(401).json({
        success: false,
        mensaje: "Correo o contraseña incorrectos"
      });
    }

    console.log("Login correcto");

    return res.json({
      success: true,
      mensaje: "Login correcto",
      usuario: {
        nombre: resultado.rows[0].nombre
      }
    });

  } catch (error) {

    console.error("ERROR EN LOGIN:");
    console.error(error);

    return res.status(500).json({
      success: false,
      mensaje: "Error del servidor"
    });
  }
});

app.listen(3001, () => {
  console.log("================================");
  console.log("Servidor ejecutándose en puerto 3001");
  console.log("http://localhost:3001");
  console.log("================================");
});