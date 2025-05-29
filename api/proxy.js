import axios from "axios";

export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing 'url' query param." });
  }

  try {
    const response = await axios.get(targetUrl);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(response.data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch target URL", details: error.message });
  }
}
