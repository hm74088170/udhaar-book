"use client";
import { getBalance } from "@/lib/balance";
import { useLocalStorage } from "@/lib/useLocalStorage";
import CustomerForm from "@/components/CustomerForm";
import CustomerList from "@/components/CustomerList";

const STORAGE_KEY = "udhaar-customers";

export default function CustomersPage(){
    const [customers, setCustomers, loaded] = useLocalStorage(STORAGE_KEY, [])

    function addCustomer(newCustomer) {
        if (customers.some((c) => c.phone === newCustomer.phone)){
            return "This phone number alrady exists";
        }
        setCustomers([...customers, { id: Date.now(), ...newCustomer, transactions: [] }]);
        return null;
    }
    function deleteCustomer(id) {
        setCustomers(customers.filter((c) => c.id !== id));
    }

    function addTransaction(customerId, entry){
        setCustomers(
            customers.map((c) => 
            c.id === customerId
            ? {...c, transactions: [...c.transactions, {id: Date.now(), date: new Date().toISOString(), ...entry },],}:c
            )
        );
    }

    function clearAll() {
        if (window.confirm("Delete ALL customers and entries? This cannotbe undone.")) {
            setCustomers([]);
        }
    }

    const totalPending = customers.reduce((sum, c) => {
        const balance = getBalance(c.transactions);
        return balance > 0 ? sum + balance : sum;
    }, 0)

    if(!loaded) {
        return <main className="p-6">Loading...</main>;
    }
   

    return (
        <main className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Customers</h1>
            <p className="mb-4 text-gray-700">
                Total pending credit:{" "}
                <span className="font-bold text-red-600">
                    ₹{totalPending.toLocaleString("en-IN")}
                </span>
            </p>
            <CustomerForm onAdd={addCustomer}/>
            <CustomerList customers={customers} onDelete={deleteCustomer} onAddTransaction={addTransaction}/>
            {customers.length > 0 && (
                <button
                onClick={clearAll}
                className="mt-8 text-sm text-red-600 underline"
                >
                    Clear all data
                </button>
            )}
        </main>
    );
}