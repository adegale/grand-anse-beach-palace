import { useState, useEffect, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    arrival: '',
    departure: '',
    roomType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const room = params.get('room');
    if (room) {
      setFormData((prev) => ({ ...prev, roomType: decodeURIComponent(room) }));
    }

    const handleRoomSelected = (event: CustomEvent) => {
      setFormData((prev) => ({ ...prev, roomType: event.detail }));
    };

    window.addEventListener('roomSelected', handleRoomSelected as EventListener);
    return () => {
      window.removeEventListener('roomSelected', handleRoomSelected as EventListener);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const form = e.currentTarget;
      const formDataToSend = new FormData(form);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSend as unknown as Record<string, string>).toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          arrival: '',
          departure: '',
          roomType: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-700">
            Ready to experience paradise? Contact us to plan your stay
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-brand-navy mb-6">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-brand-primary/10 p-3 rounded-full">
                  <MapPin className="text-brand-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-navy mb-1">Address</h4>
                  <p className="text-gray-600">
                    Grand Anse Beach
                    <br />
                    St. George's, Grenada
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-primary/10 p-3 rounded-full">
                  <Phone className="text-brand-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-navy mb-1">Phone</h4>
                  <p className="text-gray-600">+1 (473) 444-4000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-primary/10 p-3 rounded-full">
                  <Mail className="text-brand-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-navy mb-1">Email</h4>
                  <p className="text-gray-600">grandansepalace@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-primary/10 p-3 rounded-full">
                  <Clock className="text-brand-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-navy mb-1">Check-in / Check-out</h4>
                  <p className="text-gray-600">
                    Check-in: 2:00 PM
                    <br />
                    Check-out: 11:00 AM
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-brand-sunshine/10 rounded-2xl">
              <h4 className="font-semibold text-brand-navy mb-2">Why Choose Us?</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">✓</span>
                  <span>Prime beachfront location on Grand Anse Beach</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">✓</span>
                  <span>Comfortable, well-appointed rooms with modern amenities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">✓</span>
                  <span>Authentic Grenadian hospitality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">✓</span>
                  <span>Easy access to restaurants and island attractions</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />

              <div style={{ display: 'none' }}>
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-brand-navy mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-brand-navy mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="arrival"
                    className="block text-sm font-semibold text-brand-navy mb-2"
                  >
                    Arrival Date
                  </label>
                  <input
                    type="date"
                    id="arrival"
                    name="arrival"
                    value={formData.arrival}
                    onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="departure"
                    className="block text-sm font-semibold text-brand-navy mb-2"
                  >
                    Departure Date
                  </label>
                  <input
                    type="date"
                    id="departure"
                    name="departure"
                    value={formData.departure}
                    onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="roomType"
                  className="block text-sm font-semibold text-brand-navy mb-2"
                >
                  Preferred Room Type
                </label>
                <input
                  type="text"
                  id="roomType"
                  name="roomType"
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  placeholder="e.g., Deluxe Ocean View"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-brand-navy mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your stay requirements..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
                  Thank you for your message! We'll get back to you shortly.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                  There was an error submitting your message. Please try again or email us
                  directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-primary text-white py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
