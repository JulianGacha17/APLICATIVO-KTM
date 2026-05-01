const express = require("express");
const router = express.Router();
const {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar,
} = require("../controllers/usuariosController");
const { verificarToken, soloAdmin } = require("../middleware/auth");

// Todas las rutas de usuarios requieren autenticación y rol admin
router.use(verificarToken, soloAdmin);

/**
 * @route  GET /api/usuarios
 * @desc   Listar todos los usuarios
 * @access Admin
 */
router.get("/", listar);

/**
 * @route  GET /api/usuarios/:id
 * @desc   Obtener un usuario por ID
 * @access Admin
 */
router.get("/:id", obtener);

/**
 * @route  POST /api/usuarios
 * @desc   Crear nuevo usuario
 * @access Admin
 */
router.post("/", crear);

/**
 * @route  PUT /api/usuarios/:id
 * @desc   Actualizar usuario por ID
 * @access Admin
 */
router.put("/:id", actualizar);

/**
 * @route  DELETE /api/usuarios/:id
 * @desc   Eliminar usuario por ID
 * @access Admin
 */
router.delete("/:id", eliminar);

module.exports = router;
