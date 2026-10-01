const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");

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

    const resultado = await pool.query(
      `
            SELECT *
            FROM usuario
            WHERE correo = $1
            `,
      [usuario.trim()]
    );

    if (resultado.rows.length === 0) {

      return res.json({
        success: false,
        mensaje: "Usuario o contraseña incorrectos"
      });

    }

    const usuarioDB = resultado.rows[0];

    const passwordValido = await bcrypt.compare(
      password.trim(),
      usuarioDB.contrasena
    );

    if (!passwordValido) {

      return res.json({
        success: false,
        mensaje: "Usuario o contraseña incorrectos"
      });

    }

    const token = jwt.sign(
      {
        id: usuarioDB.id_usuario,
        correo: usuarioDB.correo
      },
      SECRET_KEY,
      {
        expiresIn: "8h"
      }
    );

    delete usuarioDB.contrasena;

    res.json({
      success: true,
      token,
      usuario: usuarioDB
    });

  } catch (error) {

    console.error("ERROR EN LOGIN:", error);

    res.status(500).json({
      success: false,
      mensaje: "Error interno del servidor"
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

//Obtener clientes del catálogo de BD
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

//Enpoint para registrar un nuevo usuario
app.post("/usuarios", async (req, res) => {
  try {

    const {
      nombre,
      apepat,
      apemat,
      correo,
      password,
      perfil
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    console.log("PASSWORD ORIGINAL:", password);
    console.log("PASSWORD HASH:", passwordHash);

    const nuevoUsuario = await pool.query(
      `INSERT INTO usuario
            (
                nombre,
                apepat,
                apemat,
                correo,
                contrasena,
                id_perfil
            )
            VALUES (
            UPPER($1),UPPER($2),UPPER($3),$4,$5,$6)
            RETURNING *`,
      [
        nombre,
        apepat,
        apemat,
        correo,
        passwordHash,
        perfil
      ]
    );

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: nuevoUsuario.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al registrar usuario"
    });
  }
});


app.listen(3001, () => {
  console.log("================================");
  console.log("Servidor ejecutándose en puerto 3001");
  console.log("http://localhost:3001");
  console.log("================================");
});