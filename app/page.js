import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1>Udhaar Book</h1>
      <Link href="/customers" className="text-blue-600 underline">Go to Customers</Link>
    </main>
  )
}