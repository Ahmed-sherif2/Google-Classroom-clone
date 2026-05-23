import "./ClassroomCard.css";

function ClassroomCard({ classroom, onClassroomClick }) {
  // Props for the classroom: name, description, color, image, etc.
  // color - background color for the card
  // name - classroom name
  // description - short description
  // section - classroom section/code
  // icon - emoji or icon for the classroom

  const handleClick = () => {
    console.log(`Opening classroom: ${classroom.name}`);
    if (onClassroomClick) {
      onClassroomClick(classroom);
    }
  };

  return (
    <div
      className="classroom-card"
      style={{ backgroundColor: classroom.color || "#667eea" }}
      onClick={handleClick}
    >
      {/* Classroom icon/emoji at the top */}
      <div className="card-icon">
        <span>{classroom.icon || "📚"}</span>
      </div>

      {/* Card content section */}
      <div className="card-content">
        {/* Classroom name */}
        <h3 className="card-title">{classroom.name}</h3>

        {/* Classroom section/code */}
        {classroom.section && (
          <p className="card-section">{classroom.section}</p>
        )}

        {/* Classroom description */}
        {classroom.description && (
          <p className="card-description">{classroom.description}</p>
        )}
      </div>

      {/* Hover overlay with action button */}
      <div className="card-overlay">
        <button className="card-button">Open Class →</button>
      </div>
    </div>
  );
}

export default ClassroomCard;
