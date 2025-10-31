import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());

// ✅ Autorise toutes les origines (corrige CORS)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.post("/api/ai", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages))
    return res.status(400).json({ error: "Le corps doit contenir un tableau 'messages'." });

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer whVlWQp9hgeE0ljLK1f0GmXMHW6VqyGt", // 🔑 ta clé OpenRouter
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);
    res.json(data);
  } catch (err) {
    console.error("Erreur proxy :", err);
    res.status(500).json({ error: "Erreur serveur proxy", details: err.message });
  }
});

app.listen(3000, () => console.log("✅ Proxy IA en ligne sur http://localhost:3000"));
