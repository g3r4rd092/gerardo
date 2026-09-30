const jwt = require("jsonwebtoken");

const SECRET_KEY = "s1st3m4g35t10npr0y3ct05";

const verificarToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            mensaje: "Token requerido"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            SECRET_KEY
        );

        req.usuario = decoded;

        next();

    } catch (error) {

        return res.status(403).json({
            success: false,
            mensaje: "Token inválido"
        });
    }
};

module.exports = verificarToken;