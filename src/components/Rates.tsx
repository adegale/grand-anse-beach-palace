import { useState, useEffect } from 'react';
import { supabase, Room } from '../lib/supabase';

export function Rates() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('is_active', true)
        .order('base_rate_winter', { ascending: true });

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section id="rates" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rates" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
            Seasonal Rates
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            Rates shown are starting prices per night in USD
          </p>
          <p className="text-sm text-gray-600">
            Winter Season: December - April | Summer Season: May - November
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th className="px-6 py-4 text-left font-semibold">Room</th>
                  <th className="px-6 py-4 text-left font-semibold">Type</th>
                  <th className="px-6 py-4 text-left font-semibold">View</th>
                  <th className="px-6 py-4 text-right font-semibold">
                    Winter
                    <div className="text-xs font-normal text-gray-300">Dec - Apr</div>
                  </th>
                  <th className="px-6 py-4 text-right font-semibold">
                    Summer
                    <div className="text-xs font-normal text-gray-300">May - Nov</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rooms.map((room, index) => (
                  <tr
                    key={room.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-brand-sunshine/10 transition-colors`}
                  >
                    <td className="px-6 py-4 font-semibold text-brand-navy">
                      Room {room.number}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {room.name}
                      {room.has_kitchenette && (
                        <span className="ml-2 text-xs bg-brand-sunshine/20 text-brand-navy px-2 py-1 rounded-full">
                          Kitchenette
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{room.view}</td>
                    <td className="px-6 py-4 text-right font-semibold text-brand-navy">
                      ${room.base_rate_winter}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-brand-navy">
                      ${room.base_rate_summer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold text-brand-navy mb-4">Important Information</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-brand-primary mt-1">•</span>
                <span>
                  All rates are subject to availability and may vary based on length of stay
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-primary mt-1">•</span>
                <span>Minimum stay requirements may apply during peak season and holidays</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-primary mt-1">•</span>
                <span>Special discounts available for extended stays and groups</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-primary mt-1">•</span>
                <span>Contact us for custom quotes and package deals</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
