import React, { useEffect, useState } from "react";
import axios from "axios";

interface ProfileData {
  name: string;
  email: string;
  bio: string;
}

interface ProfileCardProps {
  userId: string | null; 
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userId }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        setProfile(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (field: keyof ProfileData, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      await axios.put(`/api/users/${userId}`, profile);
      setIsEditing(false);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 animate-pulse">Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        <p>Error: {error}</p>
      </div>
    );

  if (!profile)
    return (
      <div className="p-4 bg-gray-100 rounded-lg text-gray-500">
        <p>No profile found.</p>
      </div>
    );

  return (
    <div className=" min-h-[400px] min-w-[600px] max-w-2xl w-full bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Edit
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-1">Name</p>
        {isEditing ? (
          <input
            type="text"
            value={profile.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        ) : (
          <p className="text-lg text-gray-800">{profile.name}</p>
        )}
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-1">Email</p>
        {isEditing ? (
          <input
            type="email"
            value={profile.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        ) : (
          <p className="text-lg text-gray-800">{profile.email}</p>
        )}
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-1">Bio</p>
        {isEditing ? (
          <textarea
            value={profile.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        ) : (
          <p className="text-gray-700">{profile.bio || "No bio yet."}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileCard