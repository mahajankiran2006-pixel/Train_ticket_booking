import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./contact.css";

// UserContact - Admin panel component to list & manage contacts
// Usage: place <UserContact /> in your admin dashboard page.

export default function UserContact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:5000/api/contact");
      setContacts(Array.isArray(res.data) ? res.data : res.data.contacts || []);
    } catch (err) {
      console.error("Failed to load contacts", err);
      setError(err.response?.data?.error || err.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = contacts.slice();

    if (q) {
      list = list.filter(c =>
        (c.fullname || "").toLowerCase().includes(q) ||
        (c.email || "").toLowerCase().includes(q) ||
        (c.phone || "").toLowerCase().includes(q) ||
        (c.subject || "").toLowerCase().includes(q) ||
        (c.message || "").toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      const aVal = a[sortKey] || "";
      const bVal = b[sortKey] || "";
      if (sortKey === "createdAt") {
        const ad = new Date(aVal).getTime();
        const bd = new Date(bVal).getTime();
        return sortDir === "asc" ? ad - bd : bd - ad;
      }
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return 0;
    });

    return list;
  }, [contacts, query, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageSlice = filtered.slice((page - 1) * perPage, page * perPage);

  const downloadCSV = () => {
    const rows = [
      ["Full Name", "Email", "Phone", "Subject", "Message", "Created At"],
      ...filtered.map(c => [
        c.fullname || "",
        c.email || "",
        c.phone || "",
        c.subject || "",
        (c.message || "").replace(/\n/g, " "),
        c.createdAt ? new Date(c.createdAt).toLocaleString() : ""
      ])
    ];

    const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact? This action cannot be undone.")) return;
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setContacts(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert(err.response?.data?.error || "Failed to delete contact");
    }
  };

  return (
    <div className="uc-container">
  {/* Header */}
  <div className="uc-header">
    <h2 className="uc-title">User Contacts</h2>
    <div className="uc-header-buttons">
      <button onClick={fetchContacts} className="uc-btn-refresh">Refresh</button>
      <button onClick={downloadCSV} className="uc-btn-export">Export CSV</button>
    </div>
  </div>

  {/* Search & Sort */}
  <div className="uc-search-sort">
    <div className="uc-search-wrapper">
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); setPage(1); }}
        className="uc-input-search"
        placeholder="Search by name, email, phone, subject or message"
      />
      <select
        value={sortKey}
        onChange={e => setSortKey(e.target.value)}
        className="uc-select-sort"
      >
        <option value="createdAt">Newest</option>
        <option value="fullname">Name</option>
        <option value="email">Email</option>
      </select>
      <button onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")} className="uc-btn-sortdir">
        {sortDir === "asc" ? "Asc" : "Desc"}
      </button>
    </div>
    <div className="uc-results-count">
      Showing <strong>{filtered.length}</strong> results
    </div>
  </div>

  {/* Table */}
  <div className="uc-table-container">
    {loading ? (
      <div className="uc-loading">Loading contacts...</div>
    ) : error ? (
      <div className="uc-error">{error}</div>
    ) : (
      <>
        <table className="uc-table">
          <thead className="uc-table-head">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageSlice.map((c, idx) => (
              <tr key={c._id} className="uc-table-row">
                <td>{(page-1)*perPage + idx + 1}</td>
                <td>{c.fullname}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.subject}</td>
                <td className="uc-message-cell">{c.message}</td>
                <td>{c.createdAt ? new Date(c.createdAt).toLocaleString() : "-"}</td>
                <td className="uc-actions">
                  <button onClick={() => navigator.clipboard.writeText(JSON.stringify(c))} className="uc-btn-copy">Copy</button>
                  <button onClick={() => window.open(`mailto:${c.email}?subject=${encodeURIComponent(c.subject || "Reply")}`)} className="uc-btn-reply">Reply</button>
                  <button onClick={() => handleDelete(c._id)} className="uc-btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="uc-pagination">
          <div>Page {page} of {totalPages}</div>
          <div className="uc-pagination-buttons">
            <button onClick={() => setPage(1)} disabled={page===1}>First</button>
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}>Prev</button>
            <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}>Next</button>
            <button onClick={() => setPage(totalPages)} disabled={page===totalPages}>Last</button>
          </div>
        </div>
      </>
    )}
  </div>
</div>

  );
}
