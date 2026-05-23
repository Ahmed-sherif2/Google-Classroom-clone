import { useState } from "react";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    role: "Student",
    bio: "Passionate about web development and learning new technologies.",
    joinDate: "January 15, 2024",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    courses: 5,
    avatar: "👤",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">{profile.avatar}</div>
          <div className="profile-title">
            <h2>{profile.name}</h2>
            <p className="profile-role">{profile.role}</p>
          </div>
          {!isEditing && (
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="edit-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="form-textarea"
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button className="btn btn-save" onClick={handleSave}>
                Save Changes
              </button>
              <button className="btn btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-content">
            <div className="info-card">
              <h3>Personal Information</h3>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{profile.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">{profile.phone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Location:</span>
                <span className="info-value">{profile.location}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Member Since:</span>
                <span className="info-value">{profile.joinDate}</span>
              </div>
            </div>

            <div className="info-card">
              <h3>Bio</h3>
              <p className="bio-text">{profile.bio}</p>
            </div>

            <div className="stats-container">
              <div className="stat">
                <span className="stat-value">{profile.courses}</span>
                <span className="stat-name">Active Courses</span>
              </div>
              <div className="stat">
                <span className="stat-value">12</span>
                <span className="stat-name">Assignments</span>
              </div>
              <div className="stat">
                <span className="stat-value">85%</span>
                <span className="stat-name">Average Grade</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
