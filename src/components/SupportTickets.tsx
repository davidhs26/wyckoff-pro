"use client";

import { useState, useEffect } from "react";

interface Ticket {
  id: number;
  subject: string;
  description: string;
  status: string;
  statusCode: number;
  priority: string;
  priorityCode: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export function SupportTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    priority: 2,
    type: "Question",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch("/api/freshdesk/tickets");
      if (response.ok) {
        const data = await response.json();
        setTickets(data.tickets || []);
      }
    } catch (error) {
      // Silently handle error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage("");

    try {
      const response = await fetch("/api/freshdesk/create-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Ticket #${data.ticketId} created successfully!`);
        setFormData({ subject: "", description: "", priority: 2, type: "Question" });
        setShowForm(false);
        fetchTickets(); // Refresh list
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create ticket");
      }
    } catch (error) {
      alert("Error creating ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (statusCode: number) => {
    switch (statusCode) {
      case 2: return "bg-blue-100 text-blue-800"; // Open
      case 3: return "bg-yellow-100 text-yellow-800"; // Pending
      case 4: return "bg-green-100 text-green-800"; // Resolved
      case 5: return "bg-gray-100 text-gray-800"; // Closed
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priorityCode: number) => {
    switch (priorityCode) {
      case 1: return "bg-gray-100 text-gray-600"; // Low
      case 2: return "bg-blue-100 text-blue-600"; // Medium
      case 3: return "bg-orange-100 text-orange-600"; // High
      case 4: return "bg-red-100 text-red-600"; // Urgent
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E0E3EB] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-[#131722]">Support</h3>
            <p className="text-sm text-[#5D6069]">Get help from our team</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#2962FF] hover:bg-[#1E53E5] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Ticket
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-800 font-medium">{successMessage}</span>
          <button 
            onClick={() => setSuccessMessage("")}
            className="ml-auto text-green-600 hover:text-green-800"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* New Ticket Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-[#F8F9FD] rounded-xl border border-[#E0E3EB]">
          <h4 className="font-semibold text-[#131722] mb-4">Create Support Ticket</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#5D6069] mb-1">Subject *</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief description of your issue"
                required
                className="w-full px-4 py-2.5 border border-[#E0E3EB] rounded-lg focus:outline-none focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5D6069] mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[#E0E3EB] rounded-lg focus:outline-none focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/20 bg-white"
                >
                  <option value="Question">Question</option>
                  <option value="Incident">Technical Issue</option>
                  <option value="Problem">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Billing">Billing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5D6069] mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-[#E0E3EB] rounded-lg focus:outline-none focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/20 bg-white"
                >
                  <option value={1}>Low</option>
                  <option value={2}>Medium</option>
                  <option value={3}>High</option>
                  <option value={4}>Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5D6069] mb-1">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Please describe your issue in detail..."
                required
                rows={4}
                className="w-full px-4 py-2.5 border border-[#E0E3EB] rounded-lg focus:outline-none focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/20 resize-none"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-[#5D6069] hover:text-[#131722] font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#2962FF] hover:bg-[#1E53E5] disabled:bg-gray-300 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                {submitting ? "Submitting..." : "Submit Ticket"}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tickets List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2962FF] mx-auto"></div>
          <p className="text-[#5D6069] mt-2 text-sm">Loading tickets...</p>
        </div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-8 bg-[#F8F9FD] rounded-xl">
          <svg className="w-12 h-12 text-[#5D6069] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-[#5D6069] font-medium">No tickets yet</p>
          <p className="text-[#5D6069] text-sm mt-1">Create a ticket if you need help</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div 
              key={ticket.id}
              className="p-4 border border-[#E0E3EB] rounded-xl hover:border-[#2962FF]/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-[#5D6069]">#{ticket.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(ticket.statusCode)}`}>
                      {ticket.status}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(ticket.priorityCode)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <h4 className="font-semibold text-[#131722] truncate">{ticket.subject}</h4>
                  <p className="text-sm text-[#5D6069] line-clamp-2 mt-1">{ticket.description}</p>
                </div>
                <div className="text-right text-xs text-[#5D6069] whitespace-nowrap">
                  <p>{new Date(ticket.createdAt).toLocaleDateString()}</p>
                  <p className="text-[10px]">{ticket.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

