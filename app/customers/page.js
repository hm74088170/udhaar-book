"use client";
import { useState } from "react";

export default function CustomersPage(){
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] =  useState("");

    function handleSubmit(e){
        e.preventDefault();
        if(name.trim().length <2) {
            setError("Name must be at least 2 letters");
            return;
        }
        if (!/^[0-9]{10}$/.test(phone)){
            setError("Phone must be exactly 10 digits");
            return;
        }
        setCustomers([...customers, {id: Date.now(), name: name.trim(), phone}]);
        setName("");
        setPhone("");
        setError("");
    }

    return (
        <main className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Customers</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
                <input className="border p-2 rounded" placeholder="Customer name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input className="border p-2 rounded" placeholder="Phone (10 digits)" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button className="bg-blue-600 text-white p-2 rounded">Add customer</button>
            </form>

            {customers.length === 0 ? (
                <p className="text-gray-500">No customers yet. Add your first one.</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {customers.map((c) => (
                        <li key={c.id} className="border p-3 rounded">
                            <p className="font-semibold">{c.name}</p>
                            <p className="text-sm text-grey-600">{c.phone}</p>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}