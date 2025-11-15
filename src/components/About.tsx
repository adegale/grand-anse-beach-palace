import { getUnsplashImage } from '../utils/imageResolver';

export function About() {
  const images = [
    getUnsplashImage('Grand Anse Beach Grenada', 800, 600),
    getUnsplashImage('Grenada beach resort', 800, 600),
    getUnsplashImage('Caribbean sunset Grenada', 800, 600),
    getUnsplashImage('tropical garden Caribbean', 800, 600),
    getUnsplashImage('St Georges Grenada', 800, 600),
    getUnsplashImage('Caribbean beachfront hotel', 800, 600),
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
            Welcome to Paradise
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Nestled on the pristine shores of Grand Anse Beach, one of the Caribbean's most
              stunning beaches, Grand Anse Beach Palace offers a perfect blend of comfort,
              tranquility, and island charm.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Our beachfront guesthouse provides easy access to the soft white sands and
              crystal-clear turquoise waters that make Grenada a true tropical paradise. Whether
              you're seeking a romantic getaway, family vacation, or a peaceful retreat, our
              carefully appointed rooms offer the perfect home base for your Caribbean adventure.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Experience authentic Grenadian hospitality, breathtaking ocean views, and the gentle
              sound of waves just steps from your door. Welcome to your island escape.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group"
            >
              <img
                src={image}
                alt={`Grand Anse Beach Palace view ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
