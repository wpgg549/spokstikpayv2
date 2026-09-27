export default async function handler(req, res) {
  const { type, query, url } = req.query;

  let targetUrl = "";

  if (type === "search") {
    if (!query) return res.status(400).json({ error: "Query pencarian kosong!" });
    targetUrl = `https://api.theresav.eu/api/search/spotify?query=${encodeURIComponent(query)}`;
  } else if (type === "download") {
    if (!url) return res.status(400).json({ error: "URL Spotify kosong!" });
    targetUrl = `https://api.theresav.eu/api/download/spotify?url=${encodeURIComponent(url)}`;
  } else {
    // Default fallback jika di-ping kosong untuk tes latensi
    return res.status(200).json({ status: "OK", message: "Proxy Active" });
  }

  try {
    const apiResponse = await fetch(targetUrl, {
      headers: {
        "x-apikey": "KbNmF"
      }
    });

    const data = await apiResponse.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', apiResponse.headers.get('content-type') || 'application/json');

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
