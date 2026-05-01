const express = require("express");
const router = express.Router();
const { crear, listar, marcarLeido, eliminar } = require("../controllers/contactoController");
const { verificarToken, soloAdmin } = require("../middleware/auth");

router.post("/",              crear);                              // Público
router.get("/",               verificarToken, soloAdmin, listar); // Admin
router.put("/:id/leido",      verificarToken, soloAdmin, marcarLeido);
router.delete("/:id",         verificarToken, soloAdmin, eliminar);

module.exports = router;
