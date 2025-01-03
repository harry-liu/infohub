"use client";
import { useState } from "react";

export default function Trading() {
  const [trades, setTrades] = useState<
    { id: number; note: string; price: number; hands: number }[]
  >([]);

  function handleAddTrade(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const note = (
      e.currentTarget.elements.namedItem("note") as HTMLInputElement
    )?.value;
    const price = Number(
      (e.currentTarget.elements.namedItem("price") as HTMLInputElement)?.value
    );
    const hands = Number(
      (e.currentTarget.elements.namedItem("hands") as HTMLInputElement)?.value
    );
    setTrades([...trades, { id: Date.now(), note, price, hands }]);
    e.currentTarget.reset();
  }

  return (
    <div className="p-6">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Trading History</h1>
        <form onSubmit={handleAddTrade} className="flex gap-2">
          <input
            name="note"
            placeholder="Describe your trade"
            className="border p-1"
          />
          <input
            name="price"
            placeholder="Price"
            className="border p-1"
            type="number"
          />
          <input
            name="hands"
            placeholder="Hands"
            className="border p-1"
            type="number"
          />
          <button type="submit" className="bg-blue-500 text-white px-2">
            Add
          </button>
        </form>
        <ul>
          {trades.map((trade) => (
            <li key={trade.id}>
              {trade.note} - ${trade.price} x {trade.hands}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
