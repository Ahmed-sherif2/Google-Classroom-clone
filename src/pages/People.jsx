import { useState } from "react";
import "./People.css";

function People() {
  const [people, setPeople] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Teacher",
      joinDate: "Jan 15, 2024",
      avatar: "👨‍🏫",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Student",
      joinDate: "Jan 20, 2024",
      avatar: "👩‍🎓",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.j@example.com",
      role: "Student",
      joinDate: "Jan 22, 2024",
      avatar: "👨‍🎓",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.brown@example.com",
      role: "Student",
      joinDate: "Jan 25, 2024",
      avatar: "👩‍🎓",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      role: "Student",
      joinDate: "Feb 01, 2024",
      avatar: "👨‍🎓",
    },
  ]);

  return (
    <div className="people-page">
      <div className="people-container">
        <div className="section-header">
          <h2>Classroom Members</h2>
          <p>View all students and teachers in this class</p>
        </div>

        <div className="people-stats">
          <div className="stat-card">
            <span className="stat-number">{people.length}</span>
            <span className="stat-label">Total Members</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">1</span>
            <span className="stat-label">Teachers</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{people.length - 1}</span>
            <span className="stat-label">Students</span>
          </div>
        </div>

        <div className="people-list">
          {people.map((person) => (
            <div key={person.id} className="person-card">
              <div className="person-avatar">{person.avatar}</div>
              <div className="person-info">
                <h3 className="person-name">{person.name}</h3>
                <p className="person-email">{person.email}</p>
                <div className="person-meta">
                  <span
                    className={`role-badge role-${person.role.toLowerCase()}`}
                  >
                    {person.role}
                  </span>
                  <span className="join-date">Joined {person.joinDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default People;
