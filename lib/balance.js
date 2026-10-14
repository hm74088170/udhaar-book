export function getBalance(transactions) {
    return transactions.reduce((total, t) => {
        return t.type === "credit" ? total + t.amount : total - t.amount;
    }, 0);
}