"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "@/components/data-table";
import { ITransaction } from "@/lib/types";
import { Loader2 } from "lucide-react";

export default function TaskPage() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState(""); // For input value
  const [searchQuery, setSearchQuery] = useState(""); // For executed search value

  const fetchTransactions = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/data`,
        {
          params: { page, limit: 20, search },
        },
      );
      setTransactions(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearch = () => {
    setSearchQuery(searchInput); // Update the search query to execute search
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className=" h-full relative flex-1 flex-col space-y-8 p-8 md:flex">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="p-2 bg-stone-950 rounded-l-3xl border rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-r-3xl bg-stone-950 border text-white rounded active:bg-stone-900"
        >
          Search
        </button>
      </div>
      <DataTable
        data={transactions}
        columns={[
          {
            accessorKey: "signature",
            header: "Signature",
            cell: ({ row }) => (
              <div
                onClick={() =>
                  window.open(
                    `https://solscan.io/tx/${row.original.signature}`,
                    "_blank",
                  )
                }
                className="cursor-pointer text-blue-500 hover:underline"
              >
                {row.original.signature.slice(0, 4)}...
                {row.original.signature.slice(-4)}
              </div>
            ),
          },
          {
            accessorKey: "from",
            header: "From",
            cell: ({ row }) => (
              <div>
                <div className="cursor-pointer max-lg:block hidden hover:underline">
                  {row.original.from.slice(0, 4)}...
                  {row.original.from.slice(-4)}
                </div>
                <div className="cursor-pointer max-lg:hidden hover:underline">
                  {row.original.from}
                </div>
              </div>
            ),
          },
          { accessorKey: "amount", header: "Amount" },
          { accessorKey: "slot", header: "Slot" },
          { accessorKey: "blockTime", header: "Block Time" },
          { accessorKey: "activity_type", header: "Activity Type" },
        ]}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage, // Ensure this function is passed
        }}
      />
    </div>
  );
}
