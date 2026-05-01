const express = require("express");
const router = express.Router();
const {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar,
} = require("../controllers/productosController");
const { verificarToken, soloAdmin } = require("../middleware/auth");

/**
 * @route  GET /api/productos
 * @desc   Listar productos (filtros: ?categoria=&activo=&busqueda=)
 * @access Público
 */
router.get("/", listar);

/**
 * @route  GET /api/productos/:id
 * @desc   Obtener producto por ID
 * @access Público
 */
router.get("/:id", obtener);

/**
 * @route  POST /api/productos
 * @desc   Crear nuevo producto
 * @access Admin
 */
router.post("/", verificarToken, soloAdmin, crear);

/**
 * @route  PUT /api/productos/:id
 * @desc   Actualizar producto por ID
 * @access Admin
 */
router.put("/:id", verificarToken, soloAdmin, actualizar);

/**
 * @route  DELETE /api/productos/:id
 * @desc   Eliminar producto por ID
 * @access Admin
 */
router.delete("/:id", verificarToken, soloAdmin, eliminar);

module.exports = router;
