'use client';

[Previous imports and StarryBackground component remain the same...]

const ContactModal = ({ isOpen, onClose }) => {
  // Contact Modal code remains unchanged...
};

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/franz@auterix.com', {
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
        console.error('Waitlist submission failed:', await response.text());
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
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
              Kontakt
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
                  placeholder="Gebe deine E-Mail-Adresse ein" 
                  className="flex-1 px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitStatus === 'success'}
                />
                <button 
                  type="submit" 
                  className={`px-6 py-3 rounded-lg transition-colors duration-150 whitespace-nowrap ${
                    submitStatus === 'success'
                      ? 'bg-gray-600 cursor-not-allowed'
                      : submitStatus === 'submitting'
                      ? 'bg-blue-600'
                      : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700'
                  }`}
                  disabled={submitStatus === 'submitting' || submitStatus === 'success'}
                >
                  {submitStatus === 'submitting' ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Wird hinzugefügt...
                    </div>
                  ) : (
                    'Warteliste beitreten'
                  )}
                </button>
              </div>
              <div className="mt-4">
                {submitStatus === 'success' && (
                  <p className="text-sm text-gray-300">Du wurdest erfolgreich hinzugefügt. Unser Team meldet sich umgehend bei dir sobald wir live sind.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-sm text-red-400">Etwas ist schiefgelaufen. Bitte versuche es erneut.</p>
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
