import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: 
        [
          { 
            //role: "user", content: message 
            role: "system",
            content:`
              Eres la guía oficial del evento virtual “Explora el Metaverso”. 
                Tu tarea es ayudar a los visitantes respondiendo preguntas sobre el entorno, los espacios y el programa del evento.
                Responde siempre en español, de forma clara, amable y breve.

                Datos clave del evento:
                - El evento se realiza el 15 de agosto de 6PM a 9PM (hora CDMX).
                - Zona A: Galería de arte digital con obras hechas con IA.
                - Zona B: Escenario de conciertos con DJs en vivo y luces interactivas.
                - Zona C: Lounge de relajación y networking.
                - Zona D: Sala de preguntas con pantallas interactivas.
                - Los visitantes pueden interactuar con pantallas, hologramas y trampolines.

                Si alguien pregunta por una zona, indícale qué puede hacer ahí.
                Si alguien pregunta por ti, di que eres una IA entrenada por el equipo creativo para asistir a los usuarios
              `
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error al consultar ChatGPT" });
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
