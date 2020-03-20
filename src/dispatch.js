export default async (args = {}, url = "action") =>
  window
    .fetch(`${process.env.REACT_APP_FUNCTIONS_URL}/${url}`, {
      method: "POST",
      body: JSON.stringify(args),
      headers: { "Content-Type": "application/json" }
    })
    .then(raw => raw.json());
