import React from "react";

interface Room {
  id: string;
  name: string;
  subtitle: string;
  beds: string;
  cover: string;      // path to local image
}

const rooms: Room[] = [
  {
    id: "14",
    name: "Room 14",
    subtitle: "Beautiful oceanfront escape",
    beds: "1 king bed · up to 2 guests",
    cover: "/hotel/rooms/14/Cover.jpg",
  },
  {
    id: "15",
    name: "Room 15",
    subtitle: "Relaxing beachside retreat",
    beds: "1 queen bed · up to 2 guests",
    cover: "/hotel/rooms/15/Cover.jpg",
  },
  {
    id: "16",
    name: "Room 16",
    subtitle: "Bright room with garden view",
    beds: "1 queen bed · up to 2 guests",
    cover: "/hotel/rooms/16/Cover.jpg",
  },
  {
    id: "23",
    name: "Room 23",
    subtitle: "Spacious family-style room",
    beds: "2 queen beds · up to 4 guests",
    cover: "/hotel/rooms/23/Cover.jpg",
  },
  {
    id: "25",
    name: "Room 25",
    subtitle: "Quiet corner room",
    beds: "1 king bed · up to 2 guests",
    cover: "/hotel/rooms/25/Cover.jpg",
  },
  {
    id: "28",
    name: "Room 28",
    subtitle: "Cozy room with modern touches",
    beds: "1 queen bed · up to 2 guests",
    cover: "/hotel/rooms/28/Cover.jpg",
  },
  {
    id: "30",
    name: "Room 30",
    subtitle: "Large room with panoramic ocean view",
    beds: "1 king bed · up to 2 guests",
    cover: "/hotel/rooms/30/Cover.jpg",
  },
  {
    id: "8",
    name: "Room 8",
    subtitle: "Oceanfront terrace suite",
    beds: "1 king bed · up to 2 guests",
    cover: "/hotel/rooms/8/Cover.jpg",
  },
];

export default function Rooms() {
  return (
    <section id="rooms" className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Our Rooms
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Each room has its own character, but they all share the same Grand Anse essentials:
            fresh breeze, natural light, and easy access to the beach.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => (
            <article
              key={room.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="aspect-[4/3] w-full bg-slate-100">
                <img
                  src={room.cover}
                  alt={room.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-slate-900">
                  {room.name}
                </h3>
                <p className="mt-2 text-slate-600">{room.subtitle}</p>
                <p className="mt-3 text-sm font-medium text-slate-500">{room.beds}</p>

                <div className="mt-4 flex-1 flex items-end">
                  <a
                    href="#contact"
                    className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900"
                  >
                    Enquire about this room
                    <span className="ml-1">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
