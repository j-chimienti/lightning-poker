export default async (args = {}) =>
  window
    .fetch(`${process.env.REACT_APP_FUNCTIONS_URL}/action`, {
      method: "POST",
      body: JSON.stringify(args),
      headers: { "Content-Type": "application/json" }
    })
    .then(raw => raw.json());
