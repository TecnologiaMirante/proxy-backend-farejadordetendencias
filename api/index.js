const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing "url" query parameter.' });
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    // Propaga os headers de CORS
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return res.status(200).json(data);
    } else {
      const text = await response.text();
      return res.status(200).send(text);
    }
  } catch (err) {
    console.error("Proxy error:", err.message);
    return res
      .status(500)
      .json({ error: "Failed to fetch target URL.", detail: err.message });
  }
};
