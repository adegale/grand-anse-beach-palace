// src/components/Rooms.tsx
import { useEffect, useState } from 'react';
import { supabase, getRoomImageUrl } from '../lib/supabase';
import { Users, Bed } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  description: string;
  capacity: number;
  rate: number;
  image_paths: string[];
}

export function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('name');

      if (error) throw error;
      setRooms(data || []);

    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  }

  // Extract room number from room name (e.g., "Room 6" -> 6)
  function getRoomNumber(roomName: string): number {
    const match = roomName.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  if (loading) {
    return (
      <section id="rooms" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading rooms...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rooms" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Accommodations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our selection of comfortable rooms, each offering stunning ocean views
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => {
            const roomNumber = getRoomNumber(room.name);
            const firstImage = room.image_paths?.[0];
            const imageUrl = firstImage ? getRoomImageUrl(roomNumber, firstImage) : '';

            return (
              <div
                key={room.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedRoom(room)}
              >
                <div className="h-64 bg-gray-200">
                  <img
                    src={imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {room.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {room.description}
                  </p>
                  <div className="flex items-center gap-4 mb-4 text-gray-700">
                    <div className="flex items-center gap-1">
                      <Users size={20} />
                      <span>{room.capacity} guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed size={20} />
                      <span>Queen bed</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      ${room.rate}
                      <span className="text-sm text-gray-600">/night</span>
                    </span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Room Detail Modal */}
        {selectedRoom && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRoom(null)}
          >
            <div
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
                >
                  <span className="text-2xl">×</span>
                </button>
                
                {/* Image Gallery */}
                <div className="grid grid-cols-2 gap-2 p-4">
                  {selectedRoom.image_paths.map((imagePath, index) => {
                    const roomNumber = getRoomNumber(selectedRoom.name);
                    const imageUrl = getRoomImageUrl(roomNumber, imagePath);
                    
                    return (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`${selectedRoom.name} - Photo ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg"
                        loading="lazy"
                      />
                    );
                  })}
                </div>

                <div className="p-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedRoom.name}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {selectedRoom.description}
                  </p>
                  
                  <div className="flex items-center gap-6 mb-6 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Users size={24} />
                      <span className="text-lg">Up to {selectedRoom.capacity} guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed size={24} />
                      <span className="text-lg">Queen bed</span>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-blue-600">
                        ${selectedRoom.rate}
                        <span className="text-lg text-gray-600">/night</span>
                      </span>
                      <a
                        href="#contact"
                        onClick={() => setSelectedRoom(null)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors text-lg font-semibold"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}