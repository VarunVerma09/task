import { useEffect, useState } from 'react';


export default function FeesModal({ uniId, open, onClose }){
const [fees, setFees] = useState(null);
useEffect(()=>{
if(open){
fetch((import.meta.env.VITE_API_BASE || 'http://localhost:5000')+`/api/university/${uniId}/fees`).then(r=>r.json()).then(setFees).catch(()=>setFees(null));
}
},[open, uniId]);


if(!open) return null;
return (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
<div className="bg-white rounded-lg max-w-md w-full p-6">
<h3 className="text-xl font-bold mb-4">Course-wise Fees</h3>
{!fees && <p>Loading...</p>}
{fees && (
<ul className="space-y-2">
{fees.fees.map(f=> (
<li key={f.course} className="flex justify-between"><span>{f.course}</span><span>{f.feeRange}</span></li>
))}
</ul>
)}
<div className="mt-4 text-right"><button onClick={onClose} className="btn">Close</button></div>
</div>
</div>
);
}