const express = require("express");
const cors = require("cors");
const pool = require("./db");

const verificarToken = require("./middleware/auth");

//JWT
const jwt = require("jsonwebtoken");
const SECRET_KEY = "s1st3m4g35t10npr0y3ct05";

const app = express();

app.use(cors());
app.use(express.json());

// Ruta para acceso a usuarios autenticados por JWT
app.get(
  "/inicio",
  verificarToken,
  (req, res) => {

    res.json({
      success: true,
      mensaje: "Acceso autorizado",
      usuario: req.usuario
    });

  }
);

// Login
app.post("/login", async (req, res) => {
  try {
    const { usuario, password } = req.body;

    console.log("Correo:", usuario);
    console.log("Password:", password);

    const resultado = await pool.query(
      `SELECT *
             FROM usuario
             WHERE correo = $1
             AND contrasena = $2`,
      [usuario.trim(), password.trim()]
    );

    if (resultado.rows.length > 0) {

      const usuario = resultado.rows[0];

      const token = jwt.sign(
        {
          id: usuario.id_usuario,
          correo: usuario.correo
        },
        SECRET_KEY,
        {
          expiresIn: "8h"
        }
      );

      res.json({
        success: true,
        token,
        usuario
      });

    } else {
      res.json({
        success: false,
        mensaje: "Usuario o contraseña incorrectos"
      });
    }

  } catch (error) {
    console.error("ERROR EN LOGIN:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error interno del servidor"
    });
  }
});

//Obtener perfiles del catálogo de BD
app.get("/perfiles", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT idperfil, descripcion
      FROM perfil_usuario
      ORDER BY descripcion
    `);

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener perfiles:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al obtener perfiles"
    });
  }
});

//Obtener clientes del catálogo de BD
app.get("/clientes", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT idcliente, nombre
      FROM cliente
      ORDER BY nombre
    `);

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al obtener clientes"
    });
  }
});

//Obtener prioridades del catálogo de BD
app.get("/prioridades", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT idprioridad, descripcion
      FROM prioridad
      ORDER BY descripcion
    `);

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener prioridades:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al obtener prioridades"
    });
  }
});

//Obtener e incrementar +1 el consecutivo del proyecto
app.get("/consecutivo", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT MAX (id_proyecto + 1) AS consecutivo FROM proyecto
    `);

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener el consecutivo:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al obtener el consecutivo"
    });
  }
});


app.listen(3001, () => {
  console.log("================================");
  console.log("Servidor ejecutándose en puerto 3001");
  console.log("http://localhost:3001");
  console.log("================================");
});