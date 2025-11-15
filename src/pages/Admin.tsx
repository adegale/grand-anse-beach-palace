import { useState, useEffect } from 'react';
import { supabase, Room } from '../lib/supabase';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchRooms();
    }
  }, []);

  async function fetchRooms() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('number', { ascending: true });

      if (error) throw error;
      setRooms(data || []);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setError('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASS || 'admin123';

    if (password === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      fetchRooms();
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const toggleRoomActive = async (roomId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('rooms')
        .update({ is_active: !currentStatus })
        .eq('id', roomId);

      if (error) throw error;

      setRooms((prev) =>
        prev.map((room) =>
          room.id === roomId ? { ...room, is_active: !currentStatus } : room
        )
      );
    } catch (err) {
      console.error('Error updating room:', err);
      alert('Failed to update room status');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-brand-navy mb-2">Admin Login</h1>
              <p className="text-gray-600">Grand Anse Beach Palace</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-brand-navy mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-brand-primary text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-brand-primary hover:underline focus:outline-none focus:underline"
              >
                Back to website
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="flex items-center gap-2 text-brand-navy hover:text-brand-primary transition-colors focus:outline-none focus:underline"
            >
              <ArrowLeft size={20} />
              <span>Back to Website</span>
            </a>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-brand-navy mb-6">Room Management</h1>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-48 mx-auto"></div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-brand-navy">Room</th>
                    <th className="text-left py-4 px-4 font-semibold text-brand-navy">Name</th>
                    <th className="text-left py-4 px-4 font-semibold text-brand-navy">View</th>
                    <th className="text-left py-4 px-4 font-semibold text-brand-navy">Capacity</th>
                    <th className="text-left py-4 px-4 font-semibold text-brand-navy">Winter Rate</th>
                    <th className="text-left py-4 px-4 font-semibold text-brand-navy">Summer Rate</th>
                    <th className="text-center py-4 px-4 font-semibold text-brand-navy">Status</th>
                    <th className="text-center py-4 px-4 font-semibold text-brand-navy">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, index) => (
                    <tr
                      key={room.id}
                      className={`border-b border-gray-100 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="py-4 px-4 font-semibold text-brand-navy">
                        {room.number}
                      </td>
                      <td className="py-4 px-4 text-gray-700">{room.name}</td>
                      <td className="py-4 px-4 text-gray-700">{room.view}</td>
                      <td className="py-4 px-4 text-gray-700">{room.max_guests}</td>
                      <td className="py-4 px-4 text-gray-700">${room.base_rate_winter}</td>
                      <td className="py-4 px-4 text-gray-700">${room.base_rate_summer}</td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                            room.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {room.is_active ? (
                            <>
                              <Eye size={14} /> Active
                            </>
                          ) : (
                            <>
                              <EyeOff size={14} /> Inactive
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => toggleRoomActive(room.id, room.is_active)}
                          className={`px-4 py-2 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 ${
                            room.is_active
                              ? 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500'
                              : 'bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-500'
                          }`}
                        >
                          {room.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
              {error}
            </div>
          )}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="font-semibold text-brand-navy mb-2">Admin Panel Information</h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• Toggle room visibility by clicking the Activate/Deactivate buttons</li>
            <li>• Only active rooms will appear on the public website</li>
            <li>• Changes take effect immediately</li>
            <li>• Set VITE_ADMIN_PASS in your .env file to change the admin password</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
