import React, { useEffect, useState, useRef } from 'react';
import { User, Settings, MapPin, Link as LinkIcon, Mail, Calendar, Edit3, Loader2, Camera } from 'lucide-react';
import { useDatabase } from '../js/contexts/DatabaseContext';
import { UserStats } from '../types';

const Profile: React.FC = () => {
  const { db, user: authUser } = useDatabase();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserStats>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (authUser?.id) {
          const stats = await db.getUserStats(authUser.id);
          setUserStats(stats);
        } else {
          // Try fetching mock user if no auth user (e.g. dev mode)
          const stats = await db.getUserStats('current-user');
          setUserStats(stats);
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, [db, authUser]);

  // Initialize form data when user stats load
  useEffect(() => {
    if (userStats) {
      setFormData({
        fullName: userStats.fullName || authUser?.user_metadata?.full_name || '',
        bio: userStats.bio || '',
        location: userStats.location || '',
        website: userStats.website || '',
        skills: userStats.skills || [],
        username: userStats.username || authUser?.user_metadata?.username || ''
      });
    }
  }, [userStats, authUser]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!authUser?.id) return;
    setIsSaving(true);
    try {
      await db.updateUserStats(authUser.id, formData);

      // Optimistically update local state or reload
      setUserStats(prev => ({ ...prev, ...formData } as UserStats));
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
    setFormData({ ...formData, skills });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !authUser?.id) return;

    setIsUploading(true);
    try {
      const newAvatarUrl = await db.uploadAvatar(authUser.id, file);

      // Update local stats immediately
      setUserStats(prev => prev ? ({ ...prev, avatarUrl: newAvatarUrl }) : null);

      // Also update display if needed (displayUser derives from userStats)
    } catch (error) {
      console.error("Failed to upload avatar", error);
      alert("Failed to upload avatar. Image might be too large (limit 100KB).");
    } finally {
      setIsUploading(false);
      // Reset input so same file can be selected again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-cyan-500" size={48} />
      </div>
    );
  }

  // Use auth metadata if available, otherwise stats, otherwise defaults
  const displayUser = {
    username: userStats?.username || authUser?.user_metadata?.username || 'Guest User',
    fullName: userStats?.fullName || authUser?.user_metadata?.full_name || 'Guest',
    bio: userStats?.bio || 'No bio provided.',
    location: userStats?.location || 'Unknown Location',
    website: userStats?.website || '#',
    email: userStats?.email || authUser?.email || 'N/A',
    joinedDate: userStats?.joinedDate || (authUser?.created_at ? new Date(authUser.created_at).toLocaleDateString() : 'Joined Recently'),
    skills: userStats?.skills || [],
    avatarUrl: userStats?.avatarUrl || authUser?.user_metadata?.avatar_url || `https://picsum.photos/seed/${authUser?.id || 'guest'}/128/128`
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto text-slate-900 dark:text-white animate-in fade-in duration-500 relative">
      {/* Edit Modal Overlay */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Edit Profile</h2>
              <button onClick={() => setIsEditing(false)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                <Edit3 size={20} className="rotate-45" /> {/* Close icon substitute */}
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Website</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={e => setFormData({ ...formData, website: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  value={formData.skills?.join(', ')}
                  onChange={handleSkillChange}
                  placeholder="React, TypeScript, Python..."
                  className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-2"
                >
                  {isSaving && <Loader2 className="animate-spin" size={16} />}
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
        <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-slate-900" />
        <div className="px-8 pb-8 -mt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-end space-x-6">
              <div className="relative">
                <img src={displayUser.avatarUrl} className="w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-900 bg-slate-900 object-cover" />
                <button
                  onClick={handleAvatarClick}
                  disabled={isUploading}
                  className="absolute bottom-2 right-2 p-1.5 bg-cyan-600 dark:bg-cyan-600 text-white rounded-lg border-2 border-white dark:border-slate-900 shadow-lg hover:bg-cyan-500 dark:hover:bg-cyan-500 transition-colors disabled:opacity-50"
                >
                  {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="mb-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{displayUser.fullName}</h1>
                <p className="text-slate-500 dark:text-slate-400">@{displayUser.username}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 mb-2">
              <button onClick={handleEditClick} className="px-6 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors text-slate-900 dark:text-white">Edit Profile</button>
              <button className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-900 dark:text-white"><Settings size={18} /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-sm">
              <MapPin size={16} />
              <span>{displayUser.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-sm">
              <LinkIcon size={16} />
              <a href={displayUser.website} className="hover:text-cyan-600 dark:hover:text-cyan-400" target="_blank" rel="noreferrer">
                {displayUser.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-sm">
              <Mail size={16} />
              <span>{displayUser.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-sm">
              <Calendar size={16} />
              <span>{displayUser.joinedDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Stats & Bio */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-none">
            <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">About</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {displayUser.bio}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-none">
            <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">Stats</h3>
            {/* Stats would go here if we had them in displayUser or similar */}
            <div className="text-slate-500">Stats visualization coming soon...</div>
          </div>
        </div>

        {/* Right Column - Activity & Skills */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-none">
            <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {displayUser.skills.length > 0 ? (
                displayUser.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-cyan-50 dark:bg-orange-600/10 border border-cyan-200 dark:border-orange-500/20 rounded-lg text-cyan-600 dark:text-orange-400 text-xs font-bold">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 text-sm">No skills listed yet.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
