const axios = require("axios");

module.exports = async function (req, res) {
  // Permitir CORS para seu app
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, charset");

  // Requisição preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Apenas GET permitido
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Faltando parâmetro "url".' });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Erro ao buscar dados:",
      error.response?.data || error.message
    );

    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
};
