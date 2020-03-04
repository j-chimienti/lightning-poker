export default async (args = {}) =>
  window
    .fetch("/action", {
      method: "POST",
      body: JSON.stringify(args),
      headers: { "Content-Type": "application/json" }
    })
    .then(raw => raw.json());
