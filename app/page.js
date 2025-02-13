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

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formsubmit.co/mail@franzdoerr.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          _subject: 'New Waitlist Signup from auterix'
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
            <button className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Us
            </button>
          </div>
        </nav>

        <section className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Dein Auto, deine Regeln – mit Leasing-Option schneller verkaufen.
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Mit auterix machst du dein Inserat im Handumdrehen leasingfähig und erreichst mehr Käufer für einen schnelleren Verkauf.
            </p>
            <form onSubmit={handleSubmit} className="max-w-md">
              <div className="flex gap-2">
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
                  className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  Join Waitlist
                </button>
              </div>
              <div className="mt-2">
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
    </div>
  );
};

export default LandingPage;