const express = require("express");
const router = express.Router();
const { registro, login, perfil } = require("../controllers/authController");
const { verificarToken } = require("../middleware/auth");

/**
 * @route  POST /api/auth/registro
 * @desc   Registrar nuevo usuario
 * @access Público
 */
router.post("/registro", registro);

/**
 * @route  POST /api/auth/login
 * @desc   Iniciar sesión y obtener token JWT
 * @access Público
 */
router.post("/login", login);

/**
 * @route  GET /api/auth/perfil
 * @desc   Ver perfil del usuario autenticado
 * @access Privado
 */
router.get("/perfil", verificarToken, perfil);

module.exports = router;
