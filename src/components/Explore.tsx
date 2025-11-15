import { MapPin } from 'lucide-react';
import { getUnsplashImage } from '../utils/imageResolver';

interface Attraction {
  title: string;
  description: string;
  image: string;
  distance?: string;
}

export function Explore() {
  const attractions: Attraction[] = [
    {
      title: 'Grand Anse Beach',
      description:
        'Experience one of the Caribbean\'s most beautiful beaches, with two miles of pristine white sand and crystal-clear waters perfect for swimming and water sports.',
      image: getUnsplashImage('Grand Anse Beach Grenada', 800, 600),
      distance: '0 min walk',
    },
    {
      title: 'St. George\'s',
      description:
        'Explore the colorful capital city with its historic forts, bustling market square, and charming harbourside. Visit Fort George for panoramic views of the island.',
      image: getUnsplashImage('St Georges Grenada harbor', 800, 600),
      distance: '10 min drive',
    },
    {
      title: 'Underwater Sculpture Park',
      description:
        'Discover a unique underwater art gallery featuring over 65 sculptures submerged in Molinere Bay. Perfect for snorkeling and diving enthusiasts.',
      image: getUnsplashImage('underwater sculpture park Grenada', 800, 600),
      distance: '15 min drive',
    },
    {
      title: 'Belmont Estate',
      description:
        'Step back in time at this 17th-century working cocoa plantation. Learn about chocolate production, enjoy organic farm-to-table dining, and explore lush gardens.',
      image: getUnsplashImage('Grenada cocoa plantation chocolate', 800, 600),
      distance: '30 min drive',
    },
    {
      title: 'Seven Sisters Waterfalls',
      description:
        'Hike through the rainforest to discover a series of stunning cascading waterfalls. Enjoy refreshing natural pools surrounded by tropical vegetation.',
      image: getUnsplashImage('Grenada waterfall rainforest', 800, 600),
      distance: '45 min drive',
    },
    {
      title: 'Spice Market',
      description:
        'Immerse yourself in the aromatic world of Grenada\'s famous spices. Shop for nutmeg, cinnamon, and locally made products at the vibrant Saturday market.',
      image: getUnsplashImage('Caribbean spice market Grenada', 800, 600),
      distance: '10 min drive',
    },
  ];

  return (
    <section id="explore" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
            Explore Grenada
          </h2>
          <p className="text-lg text-gray-700">
            Discover the natural beauty and cultural richness of the Spice Isle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={attraction.image}
                  alt={attraction.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-brand-navy">
                    {attraction.title}
                  </h3>
                  {attraction.distance && (
                    <div className="flex items-center gap-1 text-brand-primary text-sm font-semibold whitespace-nowrap ml-2">
                      <MapPin size={16} />
                      <span>{attraction.distance}</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed">{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
