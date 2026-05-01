const mongoose = require("mongoose");

const contactoSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  phone:   { type: String },
  subject: { type: String, default: "general" },
  message: { type: String, required: true },
  leido:   { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Contacto", contactoSchema);
