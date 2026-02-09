import React, { useState, useEffect } from 'react';
import { useDatabase } from '../js/contexts/DatabaseContext';
import { Users, Shield, Clock, Search, Briefcase } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const { db } = useDatabase();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // @ts-ignore - Interface update pending sync
                const allUsers = await db.getAllUsers();
                setUsers(allUsers);
            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [db]);

    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <Shield className="text-purple-600 dark:text-purple-500" size={32} />
                        Admin Dashboard
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Monitor user activity and manage the platform.</p>
                </div>
                <div className="bg-white dark:bg-slate-800/50 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
                    <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Users</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{users.length}</div>
                </div>
            </header>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all shadow-sm dark:shadow-none placeholder:text-slate-400"
                />
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl dark:shadow-none">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                                <th className="p-6 font-bold">User</th>
                                <th className="p-6 font-bold">Role</th>
                                <th className="p-6 font-bold text-center">Activity</th>
                                <th className="p-6 font-bold">Joined</th>
                                <th className="p-6 font-bold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">Loading users...</td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">No users found matching "{searchTerm}"</td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg ${user.role === 'admin' ? 'bg-purple-600' : 'bg-cyan-600'}`}>
                                                    {user.username.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-slate-900 dark:text-white font-bold">{user.username}</div>
                                                    <div className="text-xs text-slate-500 font-medium">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                                ${user.role === 'admin'
                                                    ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                                                    : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20'
                                                }`}>
                                                {user.role === 'admin' ? <Shield size={12} /> : <Users size={12} />}
                                                {user.role || 'Student'}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col items-center">
                                                <span className="text-lg font-bold text-slate-900 dark:text-white">{user.attempted || 0}</span>
                                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">solved</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-slate-600 dark:text-slate-400 text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-slate-400" />
                                                {new Date(user.joined_at || Date.now()).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
