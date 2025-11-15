// src/components/Hero.tsx
export function Hero() { 
  // TEMP FIX: load the local hero image directly
  const heroImageUrl = "/hero.jpg";

  // const heroImageUrl = getHeroImageUrl(); // disable this for now

  return (
    <div className="relative h-screen">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Hero Text */}
      <div className="relative h-full flex items-center justify-center text-white px-4">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to Grand Anse Beach Palace
          </h1>

          <p className="text-xl md:text-2xl mb-8">
            Experience Caribbean luxury on Grenada's most beautiful beach
          </p>

          <a
            href="#rooms"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-all"
          >
            Explore Our Rooms
          </a>
        </div>
      </div>
    </div>
  );
}
