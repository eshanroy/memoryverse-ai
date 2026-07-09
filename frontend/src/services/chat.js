import api from "./api";

export async function askAura(question) {
  const response = await api.post("/chat", {
    question,
  });

  return response.data;
}