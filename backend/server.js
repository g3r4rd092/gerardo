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

//Obtener los proyectos del catálogo de BD
app.get("/projects", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT id_proyecto, nombre
      FROM proyecto
      ORDER BY nombre
    `);

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al mostrar proyectos"
    });
  }
});

//Obtener los impactos del catálogo de BD
app.get("/impacts", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT id, descripcion
      FROM impacto
      ORDER BY descripcion
    `);

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener impactos:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al mostrar impactos"
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

//Enpoint para registrar proyecto
app.post("/altaProyectos", async (req, res) => {
  try {


    const {
      nombre,
      id_cliente,
      fecha_inicio,
      fecha_fin,
      prioridad
    } = req.body;


    const nuevoProyecto = await pool.query(
      `INSERT INTO proyecto
            (
                nombre,
                id_cliente,
                fecha_inicio,
                fecha_fin,                
                prioridad
            )
            VALUES (
            UPPER($1),$2,$3,$4,$5)
            RETURNING *`,
      [
        nombre,
        id_cliente,
        fecha_inicio,
        fecha_fin,
        prioridad
      ]
    );

    res.status(201).json({
      mensaje: "Proyecto creado correctamemte",
      usuario: nuevoProyecto.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al crear proyecto"
    });
  }
});

//Enpoint para registrar estados de riesgo
app.post("/estadoRiesgo", async (req, res) => {
  try {

    const {
      descripcion
    } = req.body;



    const nuevoEstadoRiesgo = await pool.query(
      `INSERT INTO estado_riesgo
            (
                descripcion
            )
            VALUES (
            UPPER($1))
            RETURNING *`,
      [
        descripcion
      ]
    );

    res.status(201).json({
      mensaje: "Estado de riesgo registrado correctamente",
      usuario: nuevoEstadoRiesgo.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al registrar estado de riesgo"
    });
  }
});


//Enpoint para registrar impactos
app.post("/impactos", async (req, res) => {
  try {

    const {
      descripcion
    } = req.body;



    const nuevoImpacto = await pool.query(
      `INSERT INTO impacto
            (
                descripcion
            )
            VALUES (
            UPPER($1))
            RETURNING *`,
      [
        descripcion
      ]
    );

    res.status(201).json({
      mensaje: "Impacto agregado correctamente",
      usuario: nuevoImpacto.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al registrar impacto"
    });
  }
});

//Enpoint para crear nuevos riesgos
app.post("/riesgos", async (req, res) => {
  try {

    const {
      descripcion,
      proyecto,
      impacto,
      probabilidad,
      riesgo
    } = req.body;

    const porcentaje = parseFloat(probabilidad);

    const nuevoRiesgo = await pool.query(
      `INSERT INTO riesgo
            (
                descripcion,
                idproyecto,
                impacto,
                probabilidad,
                estado
            )
            VALUES (
            UPPER($1),$2,$3,$4,$5)
            RETURNING *`,
      [
        descripcion,
        proyecto,
        impacto,
        porcentaje,
        riesgo
      ]
    );

    res.status(201).json({
      mensaje: "Se ha creado el riesgo correctamente",
      usuario: nuevoRiesgo.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al registrar nuevo riesgo"
    });
  }
});


//Registro de actividades
app.post("/actividades", async (req, res) => {

  try {

    const {
      idproyecto,
      actividades
    } = req.body;

    for (const actividad of actividades) {

      await pool.query(
        `
                INSERT INTO actividad
                (
                    idproyecto,
                    idresponsable,
                    nombre,
                    fechainicio,
                    fechatermino,
                    porcentaje,
                    estadoactividad
                )
                VALUES
                (
                    $1,
                    $2,
                    UPPER($3),
                    $4,
                    $5,
                    0,
                    1
                )
                `,
        [
          idproyecto,
          actividad.idresponsable,
          actividad.nombre,
          actividad.fechainicio,
          actividad.fechatermino
        ]
      );

    }

    res.status(201).json({
      mensaje:
        "Actividades registradas correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje:
        "Error al registrar actividades"
    });

  }

});

//Endpoint para buscar un usuario por correo o id
app.get("/usuarios/:correo", async (req, res) => {

  try {

    const { correo } = req.params;

    const resultado = await pool.query(
      `
            SELECT *
            FROM usuario
            WHERE correo = $1
            `,
      [correo]
    );

    if (resultado.rows.length === 0) {

      return res.json({
        success: false
      });

    }

    res.json({
      success: true,
      usuario: resultado.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false
    });

  }

});

//Enpoint para actualizar un usuario existente
app.put("/usuarios/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const {
      nombre,
      apepat,
      apemat,
      correo,
      perfil
    } = req.body;

    await pool.query(
      `
            UPDATE usuario
            SET nombre = UPPER($1),
                apepat = UPPER($2),
                apemat = UPPER($3),
                correo = $4,
                id_perfil = $5
            WHERE id_empleado = $6
            `,
      [
        nombre,
        apepat,
        apemat,
        correo,
        perfil,
        id
      ]
    );

    res.json({
      mensaje: "Usuario actualizado correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al actualizar usuario"
    });

  }
});

//Obtener estados de proyectos del catálogo de BD
app.get("/estados-proyectos", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT idproyecto, descripcion
      FROM estado_proyecto
      ORDER BY descripcion
    `);

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener estados de proyectos:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al obtener estados de proyectos"
    });
  }
});


//Obtener los riesgos registrados en el catálogo de BD
app.get("/riesgos", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT
      r.idriesgo,
      r.descripcion,
      r.idproyecto,
      r.impacto AS idimpacto,
      r.estado AS idestadoriesgo,
      p.nombre AS proyecto,
      i.descripcion AS impacto,
      er.descripcion AS riesgo,
      r.probabilidad
      FROM riesgo r
      JOIN proyecto p
      ON r.idproyecto = p.id_proyecto
      JOIN impacto i
      ON r.impacto = i.id
      JOIN estado_riesgo er
      ON r.estado = er.idestadoriesgo
    `);

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener catálogo de riesgos:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al obtener catálogo de riesgos"
    });
  }
});

//Obtener los proyectos registrados en el catálogo de BD
app.get("/altaProyectos", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT p.id_proyecto,
      p.nombre,
      p.id_cliente,
     TO_CHAR(
        p.fecha_inicio,
        'YYYY-MM-DD'
    ) AS fecha_inicio,

    TO_CHAR(
        p.fecha_fin,
        'YYYY-MM-DD'
    ) AS fecha_fin,
      p.id_estatus,
      p.porcentaje,
      p.prioridad as idprioridad,
      c.nombre as cliente,
      ep.descripcion as estado_proyecto,
      pr.descripcion as prioridad
      FROM proyecto p
      JOIN cliente c
      ON p.id_cliente = c.idcliente
      JOIN estado_proyecto ep
      ON p.id_estatus = ep.idproyecto
      JOIN prioridad pr
      ON p.prioridad = pr.idprioridad
      ORDER BY p.id_proyecto
    `);

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener catálogo de proyectos:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al obtener catálogo de proyectos"
    });
  }
});


//Endpoint para buscar un proyecto o id
app.get("/proyecto/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const resultado = await pool.query(
      `
            SELECT id_proyecto, nombre
            FROM proyecto
            WHERE id_proyecto = $1
            `,
      [id]
    );

    if (resultado.rows.length === 0) {

      return res.json({
        success: false
      });

    }

    res.json({
      success: true,
      proyecto: resultado.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false
    });

  }

});

//Obtener responsables del catálogo de BD
app.get("/responsables", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT id_empleado, nombre, apepat, apemat
      FROM usuario
      ORDER BY nombre
    `);

    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener responsables:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error al obtener responsables"
    });
  }
});


// Obtener estados de riesgo
app.get("/estadoRiesgo", async (req, res) => {
  try {

    const estados = await pool.query(`
      SELECT
        idestadoriesgo,
        descripcion
      FROM estado_riesgo
      ORDER BY idestadoriesgo
    `);

    res.json(estados.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener estados de riesgo"
    });
  }
});

// Obtener estados de riesgo
app.get("/impactos", async (req, res) => {
  try {

    const impactos = await pool.query(`
      SELECT
        id,
        descripcion
      FROM impacto
      ORDER BY id
    `);

    res.json(impactos.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener estados de riesgo"
    });
  }
});

// Actualizar estado de riesgo
app.put("/estadoRiesgo/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const { descripcion } = req.body;

    const estadoActualizado = await pool.query(
      `
            UPDATE estado_riesgo
            SET descripcion = UPPER($1)
            WHERE idestadoriesgo = $2
            RETURNING *
            `,
      [
        descripcion,
        id
      ]
    );

    res.status(200).json({
      mensaje: "Estado de riesgo actualizado correctamente",
      estadoRiesgo: estadoActualizado.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al actualizar estado de riesgo"
    });

  }

});


// Actualizar estado de riesgo
app.put("/impactos/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const { descripcion } = req.body;

    const impactoActualizado = await pool.query(
      `
            UPDATE impacto
            SET descripcion = UPPER($1)
            WHERE id = $2
            RETURNING *
            `,
      [
        descripcion,
        id
      ]
    );

    res.status(200).json({
      mensaje: "Se ha modificado la descripción de impacto correctamente",
      impacto: impactoActualizado.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al modificar descripción de impacto"
    });

  }

});

//Endpoint para modificar riesgo en el catálogo
app.put("/riesgos/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const {
      descripcion,
      idproyecto,
      idimpacto,
      probabilidad,
      idestadoriesgo
    } = req.body;

    const resultado = await pool.query(
      `
            UPDATE riesgo
            SET
                descripcion = UPPER($1),
                idproyecto = $2,
                impacto = $3,
                probabilidad = $4,
                estado = $5
            WHERE idriesgo = $6
            RETURNING *
            `,
      [
        descripcion,
        idproyecto,
        idimpacto,
        probabilidad,
        idestadoriesgo,
        id
      ]
    );

    res.status(200).json({
      mensaje: "Riesgo actualizado correctamente",
      riesgo: resultado.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al actualizar riesgo"
    });

  }

});

//Endpoint para modificar proyectos en el catálogo
app.put("/altaProyectos/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const {
      nombre,
      id_cliente,
      fecha_inicio,
      fecha_fin,
      prioridad
    } = req.body;

    const resultado = await pool.query(
      `
            UPDATE proyecto
            SET
                nombre = UPPER($1),
                id_cliente = $2,
                fecha_inicio = $3,
                fecha_fin = $4,
                prioridad = $5
            WHERE id_proyecto = $6
            RETURNING *
            `,
      [
        nombre,
        id_cliente,
        fecha_inicio,
        fecha_fin,
        prioridad,
        id
      ]
    );

    res.status(200).json({
      mensaje: "Se ha modificado el proyecto",
      proyecto: resultado.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: error.message
    });

  }

});

// Eliminar estado de riesgo
app.delete("/estadoRiesgo/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const resultado = await pool.query(
      `
            DELETE FROM estado_riesgo
            WHERE idestadoriesgo = $1
            RETURNING *
            `,
      [id]
    );

    if (resultado.rows.length === 0) {

      return res.status(404).json({
        mensaje: "Estado de riesgo no encontrado"
      });

    }

    res.status(200).json({
      mensaje: "Estado de riesgo eliminado correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al eliminar estado de riesgo"
    });

  }

});

// Eliminar impacto delcatálogo
app.delete("/impactos/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const resultado = await pool.query(
      `
            DELETE FROM impacto
            WHERE id = $1
            RETURNING *
            `,
      [id]
    );

    if (resultado.rows.length === 0) {

      return res.status(404).json({
        mensaje: "Impacto no encontrado"
      });

    }

    res.status(200).json({
      mensaje: "El impacto se ha eliminado del sistema"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al eliminar impacto"
    });

  }

});

// Endpoint para baja de usuario
app.delete("/usuarios/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const resultado = await pool.query(
      `
            DELETE FROM usuario
            WHERE id_empleado = $1
            RETURNING *
            `,
      [id]
    );

    if (resultado.rows.length === 0) {

      return res.status(404).json({
        mensaje: "Empleado no encontrado"
      });

    }

    res.status(200).json({
      mensaje: "Se ha dado de baja al empleado"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al eliminar estado de riesgo"
    });

  }

});

// Eliminar riesgo del catálogo
app.delete("/riesgos/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const resultado = await pool.query(
      `
            DELETE FROM riesgo
            WHERE idriesgo = $1
            RETURNING *
            `,
      [id]
    );

    if (resultado.rows.length === 0) {

      return res.status(404).json({
        mensaje: "Riesgo no encontrado en catálogo"
      });

    }

    res.status(200).json({
      mensaje: "Riesgo eliminado del catálogo correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al eliminar riesgo del catálogo"
    });

  }

});

// Eliminar proyecto del catálogo
app.delete("/altaProyectos/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const resultado = await pool.query(
      `
            DELETE FROM proyecto
            WHERE id_proyecto = $1
            RETURNING *
            `,
      [id]
    );

    if (resultado.rows.length === 0) {

      return res.status(404).json({
        mensaje: "Proyecto no encontrado en catálogo"
      });

    }

    res.status(200).json({
      mensaje: "Riesgo eliminado del catálogo correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al eliminar riesgo del catálogo"
    });

  }

});

//Dashboard general
app.get("/dashboard", async (req, res) => {

  try {

    const resultado = await pool.query(`
            SELECT

            (
                SELECT COUNT(*)
                FROM proyecto
            ) AS proyectos,

            (
                SELECT COUNT(*)
                FROM actividad
            ) AS actividades,

            (
                SELECT COUNT(*)
                FROM riesgo
            ) AS riesgos,            

            (
                SELECT COUNT(*)
                FROM proyecto
                WHERE id_estatus = 1
            ) AS en_progreso,

            (
                SELECT COUNT(*)
                FROM proyecto
                WHERE id_estatus = 2
            ) AS en_riesgo,

            (
                SELECT COUNT(*)
                FROM proyecto
                WHERE id_estatus = 3
            ) AS retrasado,
             (
                SELECT COUNT(*)
                FROM actividad
                WHERE estadoactividad = 1
            ) AS en_progreso,

            (
                SELECT COUNT(*)
                FROM actividad
                WHERE estadoactividad = 2
            ) AS en_riesgo,

            (
                SELECT COUNT(*)
                FROM actividad
                WHERE estadoactividad = 3
            ) AS retrasadas,
             (
                SELECT COUNT(*)
                FROM actividad
                WHERE estadoactividad = 3
            ) AS retrasado,
			(
                SELECT COUNT(*)
                FROM riesgo
                WHERE estado = 1
            ) AS finalizado,

            (
                SELECT COUNT(*)
                FROM riesgo
                WHERE estado = 5
            ) AS abierto,

            (
                SELECT COUNT(*)
                FROM riesgo
                WHERE estado = 2
            ) AS en_mitigacion

        `);

    res.json(resultado.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener dashboard"
    });

  }

});

// Dashboard - proyectos por estatus
app.get("/dashboard/estatus-proyectos", async (req, res) => {

  try {

    const resultado = await pool.query(`
           SELECT
            (SELECT COUNT(*) FROM proyecto) AS proyectos,

            (
              SELECT COUNT(*)
              FROM proyecto
              WHERE id_estatus = 1
            ) AS en_progreso,

            (
                SELECT COUNT(*)
                FROM proyecto
                WHERE id_estatus = 2
            ) AS en_riesgo,

            (
                SELECT COUNT(*)
                FROM proyecto
                WHERE id_estatus = 3
            ) AS retrasados
        `);

    res.json(resultado.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener estatus de proyectos"
    });

  }

});

// Dashboard - actividades por estatus
app.get("/dashboard/estatus-actividades", async (req, res) => {

  try {

    const resultado = await pool.query(`
           SELECT
            (SELECT COUNT(*) FROM actividad) AS actividad,

            (
              SELECT COUNT(*)
              FROM actividad
              WHERE estadoactividad = 1
            ) AS en_progreso,

            (
                SELECT COUNT(*)
                FROM actividad
                WHERE estadoactividad = 2
            ) AS en_riesgo,

            (
                SELECT COUNT(*)
                FROM actividad
                WHERE estadoactividad = 3
            ) AS retrasadas
        `);

    res.json(resultado.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener estatus de proyectos"
    });

  }

});

// Dashboard - actividades por estatus
app.get("/dashboard/estatus-riesgos", async (req, res) => {

  try {

    const resultado = await pool.query(`
           SELECT
            (SELECT COUNT(*) FROM riesgo) AS riesgo,

            (
              SELECT COUNT(*)
              FROM riesgo
              WHERE estado = 1
            ) AS finalizado,

            (
                SELECT COUNT(*)
                FROM riesgo
              WHERE estado = 5
            ) AS abierto,

            (
                SELECT COUNT(*)
                FROM riesgo
              WHERE estado = 2
            ) AS en_mitigacion
        `);

    res.json(resultado.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener estatus de proyectos"
    });

  }

});


app.listen(3001, () => {
  console.log("================================");
  console.log("Servidor ejecutándose en puerto 3001");
  console.log("http://localhost:3001");
  console.log("================================");
});



