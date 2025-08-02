import express from "express";
import { getChatResponse } from "../services/openaiServices.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;
  try {
    const reply = await getChatResponse(message);
    res.json({ reply });
  } catch (error) {
    console.error("Error en /chat:", error.message);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

export default router;