"use client";
import { useState } from "react";

export default function TransactionForm({ onAdd }){
    const [type, setType] = useState("credit");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [error, setError] = useState("");


    function handleSubmit(e){
        e.preventDefault();
        const value = Number(amount);
        if (!value || value <= 0){
            setError("Enter an amount greater than 0");
            return;
        }
        onAdd({ type, amount: value, note: note.trim() });
        setAmount("");
        setNote("");
        setError("");
    }
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-3">
            <div className="flex gap-2">
                <select className="border p-2 rounded" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="credit">Credit (gave goods)</option>
                    <option value="payment">Payment (got money)</option>
                </select>
                <input className="border p-2 rounded w-full" placeholder="Amount ₹" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <input className="border p-2 rounded" placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button className="bg-green-600 text-white p-2 rounded">Save entry</button>
        </form>
    );
}