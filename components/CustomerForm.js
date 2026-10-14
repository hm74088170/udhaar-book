"use client";
import { useState } from "react";

export default function CustomerForm({ onAdd }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("")
    const [error, setError] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        if (name.trim().length < 2){
            setError("Name must be at least 2 letters");
            return;
        }
        if (!/^[6-9][0-9]{9}$/.test(phone)){
            setError("Enter a valid 10-digit mobile number");
            return;
        }
        const problem = onAdd({ name: name.trim(), phone });
        if (problem) {
            setError(problem);
            return;
        }
        setName("");
        setPhone("");
        setError("");
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
            <input className="border p-2 rounded" placeholder="Customer name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input className="border p-2 rounded" placeholder="Phone (10 digit)" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button className="bg-blue-600 text-white p-2 rounded">Add customer</button>
        </form>
    )
}