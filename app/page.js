'use client';

import React, { useEffect, useState } from 'react';

const StarryBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          speed: Math.random() * 10 + 10
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.speed}s infinite linear`
          }}
        />
      ))}
    </div>
  );
};

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formsubmit.co/franz@auterix.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'New Contact Request from auterix',
          _cc: 'martin@auterix.com'
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form state after modal is closed
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSuccess(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 relative">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        
        {isSuccess ? (
          <div className="text-center py-8">
            <h2 className="text-xl font-bold mb-4">Deine Nachricht wurde erfolgreich versandt.</h2>
            <p className="text-gray-300">Unser Team meldet sich umgehend bei dir.</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-400"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-400"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-400"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 active:bg-blue-700 transition-colors duration-150 relative"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formsubmit.co/franz@auterix.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          _subject: 'New Waitlist Signup from auterix',
          _cc: 'martin@auterix.com'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <StarryBackground />
      <div className="relative z-10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold lowercase">auterix</div>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 active:bg-blue-700 transition-colors duration-150"
            >
              Contact Us
            </button>
          </div>
        </nav>

        <section className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Dein Auto, Deine Regeln – Leasingoption nutzen, schnell und sicher verkaufen.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Mit auterix machst du dein Auto in wenigen Minuten leasbar und verkaufst problemlos in kurzer Zeit.
            </p>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 active:bg-blue-700 transition-colors duration-150 whitespace-nowrap"
                >
                  Join Waitlist
                </button>
              </div>
              <div className="mt-4">
                {submitStatus === 'success' && (
                  <p className="text-sm text-green-400">Thank you for joining our waitlist!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
                )}
                {!submitStatus && (
                  <p className="text-sm text-gray-400">
                    Be the first to know when we launch. No spam, ever.
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>

        <footer className="container mx-auto px-6 py-8 border-t border-gray-800">
          <div className="text-center text-gray-400">
            © 2025 Auterix. All rights reserved.
          </div>
        </footer>
      </div>
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default LandingPage;
