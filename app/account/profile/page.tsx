"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import AccountSidebar from "@/components/layout/AccountSidebar";

export default function ProfilePage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-[#F8F6F3] py-8 mb-6">
        <h1 className="text-center text-3xl font-bold">Profile</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 pb-12 flex gap-10">
        <AccountSidebar />

        <div className="flex-1 bg-[#F8F6F3] rounded-2xl p-8">
          <div className="flex gap-6 mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="flex-1 input-field"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <div className="w-16" />
            <input
              type="text"
              placeholder="Last Name"
              className="flex-1 input-field"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>
          <input type="email" placeholder="Email" className="input-field mb-4" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="tel" placeholder="Phone" className="input-field mb-4" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input type="text" placeholder="Address" className="input-field mb-6" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <button className="bg-[#C9A98C] hover:bg-[#B8906A] text-white px-8 py-4 rounded-xl font-medium transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
