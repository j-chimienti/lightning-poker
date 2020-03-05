export default async (args = {}, url = "action") =>
  window
    .fetch(`/${url}`, {
      method: "POST",
      body: JSON.stringify(args),
      headers: { "Content-Type": "application/json" }
    })
    .then(raw => raw.json());
