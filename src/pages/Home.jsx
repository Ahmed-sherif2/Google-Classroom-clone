import { useState } from "react";
import ClassroomCard from "../components/ClassroomCard/ClassroomCard";
import "./Home.css";

function Home() {
  // State to store classrooms - can be replaced with API data later
  const [classrooms, setClassrooms] = useState([
    {
      id: 1,
      name: "Introduction to React",
      section: "Period 1",
      description: "Learn the fundamentals of React development",
      color: "#667eea",
      icon: "⚛️",
    },
    {
      id: 2,
      name: "Web Design Basics",
      section: "Period 2",
      description: "Master CSS and responsive design principles",
      color: "#764ba2",
      icon: "🎨",
    },
    {
      id: 3,
      name: "JavaScript Advanced",
      section: "Period 3",
      description: "Deep dive into advanced JavaScript concepts",
      color: "#f093fb",
      icon: "📱",
    },
    {
      id: 4,
      name: "Database Design",
      section: "Period 4",
      description: "Learn database architecture and SQL",
      color: "#4facfe",
      icon: "🗄️",
    },
    {
      id: 5,
      name: "Full Stack Development",
      section: "Period 5",
      description: "Build complete web applications",
      color: "#43e97b",
      icon: "🚀",
    },
    {
      id: 6,
      name: "UI/UX Design",
      section: "Period 6",
      description: "Create beautiful and intuitive interfaces",
      color: "#fa709a",
      icon: "✨",
    },
  ]);

  return (
    <div className="home-page">
      {/* Main classrooms container */}
      <section className="classrooms-section">
        {/* Header section with title */}
        <div className="section-header">
          <h2>Your Classrooms</h2>
          <p>Continue learning and explore new courses</p>
        </div>

        {/* Classrooms grid - responsive layout that adjusts based on screen size */}
        <div className="classrooms-grid">
          {classrooms.length > 0 ? (
            classrooms.map((classroom) => (
              <ClassroomCard key={classroom.id} classroom={classroom} />
            ))
          ) : (
            // Empty state message when no classrooms exist
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3>No classrooms yet</h3>
              <p>Create or join a classroom to get started</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
