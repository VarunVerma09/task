export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';


export async function fetchUniversity(id){
const res = await fetch(`${API_BASE}/university/${id}`);
return res.json();
}


export async function fetchFees(id){
const res = await fetch(`${API_BASE}/university/${id}/fees`);
return res.json();
}


export async function submitLead(payload){
const res = await fetch(`${API_BASE}/leads`, { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
return res.json();
}