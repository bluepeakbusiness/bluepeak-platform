const API = "http://localhost:3000";

export async function askCEO(task) {
  const response = await fetch(`${API}/api/ceo-agent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });

  return await response.json();
}

export async function chatAI(message) {
  const response = await fetch(`${API}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  return await response.json();
}