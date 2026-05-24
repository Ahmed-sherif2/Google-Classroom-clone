import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getClassrooms } from "../services/api.js";
import ClassroomCard from "../components/ClassroomCard/ClassroomCard";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  // State to store classrooms fetched from API
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================
  // Load Classrooms on Component Mount
  // ============================================
  // Fetches classrooms from backend API
  useEffect(() => {
    const loadClassrooms = async () => {
      try {
        setLoading(true);
        const response = await getClassrooms();

        if (response.success) {
          setClassrooms(response.classrooms || []);
        } else {
          setError("Failed to load classrooms");
        }
      } catch (err) {
        console.error("Error loading classrooms:", err);
        // If classrooms fail to load, show demo classrooms
        setClassrooms([
          {
            _id: 1,
            name: "Introduction to React",
            section: "Period 1",
            description: "Learn the fundamentals of React development",
            color: "#667eea",
            icon: "⚛️",
          },
          {
            _id: 2,
            name: "Web Design Basics",
            section: "Period 2",
            description: "Master CSS and responsive design principles",
            color: "#764ba2",
            icon: "🎨",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadClassrooms();
  }, []);

  // ============================================
  // Handle Classroom Click
  // ============================================
  // Navigate to classroom detail page with data
  const handleClassroomClick = (classroom) => {
    navigate(`/classroom/${classroom._id || classroom.id}`, {
      state: { classroom },
    });
  };

  return (
    <div className="home-page">
      {/* Main classrooms container */}
      <section className="classrooms-section">
        {/* Header section with title */}

        <div className="section-header">
          <h2>Your Classrooms</h2>
          <p>Continue learning and explore new courses</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <p>Loading your classrooms...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="error-state">
            <p>{error}</p>
          </div>
        )}

        {/* Classrooms grid - responsive layout that adjusts based on screen size */}
        {!loading && (
          <div className="classrooms-grid">
            {classrooms.length > 0 ? (
              classrooms.map((classroom) => (
                <ClassroomCard
                  key={classroom._id || classroom.id}
                  classroom={classroom}
                  onClassroomClick={handleClassroomClick}
                />
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
        )}
      </section>
    </div>
  );
}

export default Home;
