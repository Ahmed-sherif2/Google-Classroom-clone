import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Clasroom.css";

// Classroom page - Stream is the main area. Classwork/People/Marks are tabs (placeholders).
export default function Classroom() {
  const location = useLocation();
  const navigate = useNavigate();
  const classroomData = location.state?.classroom || {};

  // Local state for showing announcement modal
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("stream");

  // Simple announcements list stored locally for demo purposes
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Welcome to the class!",
      body: "This is the stream where announcements appear.",
      date: new Date().toLocaleString(),
    },
  ]);

  // Form state for creating a new announcement
  const [form, setForm] = useState({ title: "", body: "" });

  // Toggle modal visibility
  const toggleModal = () => setShowModal((v) => !v);

  // Handle tab click
  const handleTabClick = (tabName) => {
    if (tabName === "people") {
      navigate("/people", { state: { classroom: classroomData } });
    } else {
      setActiveTab(tabName);
    }
  };

  // Handle announcement creation
  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!form.title.trim() && !form.body.trim()) return;
    const newAnnouncement = {
      id: Date.now(),
      title: form.title.trim() || "(No title)",
      body: form.body.trim(),
      date: new Date().toLocaleString(),
    };
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
    setForm({ title: "", body: "" });
    setShowModal(false);
  };

  return (
    <div className="classroom-page">
      {/* Top bar with class title, tabs and announcement button */}
      <div className="classroom-topbar">
        <div className="top-left">
          <h1 className="class-title">{classroomData.name || "Classroom"}</h1>

          {/* Tabs for Stream / Classwork / People / Marks (only Stream implemented) */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === "stream" ? "active" : ""}`}
              onClick={() => handleTabClick("stream")}
            >
              Stream
            </button>
            <button
              className={`tab ${activeTab === "classwork" ? "active" : ""}`}
              onClick={() => handleTabClick("classwork")}
            >
              Classwork
            </button>
            <button
              className={`tab ${activeTab === "people" ? "active" : ""}`}
              onClick={() => handleTabClick("people")}
            >
              People
            </button>
            <button
              className={`tab ${activeTab === "marks" ? "active" : ""}`}
              onClick={() => handleTabClick("marks")}
            >
              Marks
            </button>
          </div>
        </div>

        <div className="top-right">
          {/* Announcement button opens modal to create announcement */}
          <button className="announce-btn" onClick={toggleModal}>
            + Announcement
          </button>
        </div>
      </div>

      {/* Body: left = stream, right = sidebar */}
      <div className="classroom-body">
        <main className="stream">
          {/* Stream heading */}
          <div className="stream-header">
            <h2>Stream</h2>
            <p className="stream-sub">Recent announcements and posts</p>
          </div>

          {/* Announcements list */}
          <div className="stream-list">
            {announcements.map((a) => (
              <article className="announcement-card" key={a.id}>
                <div className="announcement-meta">
                  <strong className="announcement-title">{a.title}</strong>
                  <span className="announcement-date">{a.date}</span>
                </div>
                {a.body && <div className="announcement-body">{a.body}</div>}
              </article>
            ))}

            {announcements.length === 0 && (
              <div className="empty-stream">
                No posts yet. Create an announcement.
              </div>
            )}
          </div>
        </main>

        <aside className="sidebar">
          <div className="side-box code-box">
            <h3>Class code</h3>
            <div className="code">ABCD-1234</div>
            <button
              className="copy-btn"
              onClick={() => navigator.clipboard?.writeText("ABCD-1234")}
            >
              Copy
            </button>
          </div>

          <div className="side-box upcoming-box">
            <h3>Upcoming</h3>
            <ul>
              <li>Quiz: Chapter 2 — Due Tue</li>
              <li>Assignment: Lab report — Due Fri</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Announcement modal (simple) */}
      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Create announcement</h3>
            <form onSubmit={handlePostAnnouncement}>
              <input
                className="input"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm((s) => ({ ...s, title: e.target.value }))
                }
              />
              <textarea
                className="textarea"
                placeholder="Write your announcement..."
                rows={6}
                value={form.body}
                onChange={(e) =>
                  setForm((s) => ({ ...s, body: e.target.value }))
                }
              />

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-muted"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
