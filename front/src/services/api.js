const API_URL = "http://localhost:3000"; //porta do back

export async function getPatients() {
  const res = await fetch(`${API_URL}/patients`);
  return res.json();
}

export async function createPatient(data) {
  const res = await fetch(`${API_URL}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updatePatient(id, data) {
  const res = await fetch(`${API_URL}/patients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function generateEvolution(patientId) {
  const res = await fetch(`${API_URL}/ai/evolution`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ patientId }),
  });
  return res.json();
}