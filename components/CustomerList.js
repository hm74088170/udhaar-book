import TransactionForm from "./TransactionForm";
import { getBalance } from "@/lib/balance";

export default function CustomerList({
  customers,
  onDelete,
  onAddTransaction,
}) {
  if (customers.length === 0) {
    return (
      <p className="text-grey-500">No customers yet. Add your first one.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {customers.map((c) => {
        const balance = getBalance(c.transactions);
        return (
          <li key={c.id} className="border p-3 rounded ">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-grey-600">{c.phone}</p>
              </div>
              <button
                onClick={() => onDelete(c.id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
            <p className={`mt-2 font-bold ${balance > 0 ? "text-red-600" : "text-green-700"}`}>
                {balance > 0 && `Owes ₹${balance.toLocaleString("en-IN")}`}
                {balance < 0 && `Advance ₹${Math.abs(balance).toLocaleString("en-IN")}`}
                {balance === 0 && "All settled"}
            </p>

            <TransactionForm onAdd={(entry) => onAddTransaction(c.id, entry)}/>
            
            {c.transactions.length > 0 && (
                <ul className="mt-3 text-sm text-gray-700 flex flex-col gap-1">
                    {[...c.transactions].reverse().map((t) => (
                        <li key={t.id} className="flex justify-between">
                            <span>
                                {new Date(t.date).toLocaleDateString("en-IN")} .{" "}
                                {t.type === "credit" ? "Credit" : "Payment"}
                                {t.note && `. ${t.note}`}
                            </span>
                            <span>₹{t.amount.toLocaleString("en-IN")}</span>
                        </li>
                    ))}
                </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
