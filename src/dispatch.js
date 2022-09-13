
const Dispatch = async (args = {}) =>
  window
    .fetch("/api/action", {
      method: "POST",
      body: JSON.stringify(args),
      headers: { "Content-Type": "application/json" },
    })
    .then((raw) => raw.json());

export default Dispatch;
