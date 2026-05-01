const jwt = require("jsonwebtoken");
require("dotenv").config();

// ─── Verificar token ───────────────────────────────────────────────────────────
const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({
      exito: false,
      mensaje: "Acceso denegado. Token no proporcionado.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      exito: false,
      mensaje: "Token inválido o expirado.",
    });
  }
};

// ─── Solo administradores ──────────────────────────────────────────────────────
const soloAdmin = (req, res, next) => {
  if (req.usuario.rol !== "admin") {
    return res.status(403).json({
      exito: false,
      mensaje: "Acceso restringido. Se requiere rol de administrador.",
    });
  }
  next();
};

module.exports = { verificarToken, soloAdmin };
