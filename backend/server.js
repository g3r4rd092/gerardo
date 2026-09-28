const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
  try {
    const { usuario, password } = req.body;

    console.log("Usuario recibido:", usuario);

    const resultado = await pool.query(
      "SELECT * FROM usuario WHERE correo = $1",
      [usuario]
    );

    console.log(resultado.rows);

    if (resultado.rows.length === 0) {
      return res.status(401).json({
        success: false,
        mensaje: "Usuario no encontrado"
      });
    }

    const usuarioBD = resultado.rows[0];

    // Si las contraseñas están cifradas usar bcrypt.compare()
    if (usuarioBD.password !== password) {
      return res.status(401).json({
        success: false,
        mensaje: "Contraseña incorrecta"
      });
    }

    res.json({
      success: true,
      mensaje: "Login correcto"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      mensaje: "Error del servidor"
    });
  }
});

app.listen(3001, () => {
  console.log("Servidor ejecutándose en puerto 3001");
});