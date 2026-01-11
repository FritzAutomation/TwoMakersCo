"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface OrderStatusUpdateProps {
  orderId: string;
  currentStatus: string;
}

const statuses = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-100 text-blue-800" },
  { value: "shipped", label: "Shipped", color: "bg-purple-100 text-purple-800" },
  { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
];

export default function OrderStatusUpdate({
  orderId,
  currentStatus,
}: OrderStatusUpdateProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setStatus(newStatus);
        router.refresh();
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const currentStatusInfo = statuses.find((s) => s.value === status);

  return (
    <div className="flex items-center gap-4">
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-14 font-medium capitalize ${currentStatusInfo?.color}`}
      >
        {currentStatusInfo?.label}
      </span>

      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={loading}
        className="px-4 py-2 rounded border border-gray-300 text-16 focus:outline-none focus:border-brown disabled:opacity-50"
      >
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      {loading && <span className="text-14 text-gray-500">Updating...</span>}
    </div>
  );
}
