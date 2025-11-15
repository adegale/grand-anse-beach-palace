import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Rooms } from './components/Rooms';
import { Explore } from './components/Explore';
import { Rates } from './components/Rates';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Admin } from './pages/Admin';

function App() {
  const isAdminRoute = window.location.pathname === '/admin';

  if (isAdminRoute) {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <Rooms />
      <Explore />
      <Rates />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
