import React, { useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Quote, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const testimonials = [
  {
    name: 'Marlène Gravenberch',
    role: 'CEO,Leadership Refocused',
    content: 'Very satisfied with PRK GRAPHICZ—great service, fast delivery, quality work, and clear communication.',
    avatar: 'https://image2url.com/r2/default/images/1772563495250-a7302a89-6db4-4476-bbeb-f649e54ec0c3.png',
  },
  {
    name: 'Esten Cohen',
    role: 'CEO ,The Lyrical Office',
    content: 'PRK Graphicz delivers! We from The Lyrical Office recommend them for excellent, affordable graphic design.',
    avatar: 'https://image2url.com/r2/default/images/1772563717767-a04404d4-8c62-4fcf-af1b-7f7e542664bf.png',
  },
  {
    name: 'Sade Lansdorf',
    role: 'CEO, PUSH Forward',
    content: 'Grateful for punctual, creative, and cooperative partnership. Excellent designs! They truly understand our vision.',
    avatar: 'https://image2url.com/r2/default/images/1772563613566-55764184-525f-4ce7-bdd4-2fa916a8524b.png',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            message: formData.message,
            status: 'unread'
          }
        ]);

      if (error) throw error;

      setStatus('success');
      setFormData({ first_name: '', last_name: '', email: '', message: '' });
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-brand-primary"
              >
                Let's Talk
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-black/60 mb-12 max-w-md"
              >
                Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
              </motion.p>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-brand-primary text-brand-secondary rounded-2xl flex items-center justify-center transition-all duration-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-black/40 mb-1">Email Us</h4>
                    <p className="text-xl font-bold">prkgraphicz@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-brand-primary text-brand-secondary rounded-2xl flex items-center justify-center transition-all duration-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-black/40 mb-1">Call Us</h4>
                    <p className="text-xl font-bold">(597) 7174880</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-brand-primary text-brand-secondary rounded-2xl flex items-center justify-center transition-all duration-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-black/40 mb-1">Visit Us</h4>
                    <p className="text-xl font-bold">Paramaribo, Suriname</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 rounded-3xl border border-black/5 shadow-2xl shadow-black/5"
            >
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-brand-primary">Message Sent!</h3>
                  <p className="text-black/60 mb-8">Thank you for reaching out. We'll get back to you shortly.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 bg-brand-primary text-brand-secondary rounded-xl font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-widest text-black/40 mb-2">First Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        className="w-full px-4 py-4 bg-black/5 border border-transparent rounded-2xl focus:border-brand-primary/20 focus:bg-white transition-all outline-none font-medium"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-widest text-black/40 mb-2">Last Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        className="w-full px-4 py-4 bg-black/5 border border-transparent rounded-2xl focus:border-brand-primary/20 focus:bg-white transition-all outline-none font-medium"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-black/40 mb-2">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-4 bg-black/5 border border-transparent rounded-2xl focus:border-brand-primary/20 focus:bg-white transition-all outline-none font-medium"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-black/40 mb-2">Message</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-4 bg-black/5 border border-transparent rounded-2xl focus:border-brand-primary/20 focus:bg-white transition-all outline-none font-medium resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  
                  {status === 'error' && (
                    <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
                  )}

                  <button 
                    disabled={status === 'loading'}
                    className="w-full py-5 bg-brand-primary text-brand-secondary rounded-2xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/10 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                    <Send size={20} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Scrolling Reviews Section */}
          <div className="mt-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What our clients say</h2>
              <div className="w-20 h-1 bg-brand-secondary mx-auto rounded-full" />
            </div>
            
            <div className="relative overflow-hidden py-10">
              <div className="flex animate-marquee whitespace-nowrap gap-8">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div 
                    key={`${testimonial.name}-${index}`}
                    className="inline-block w-[400px] p-8 bg-white rounded-3xl border border-black/5 shadow-sm whitespace-normal flex-shrink-0"
                  >
                    <Quote size={32} className="text-brand-primary/10 mb-6" />
                    <p className="text-lg font-medium mb-8 leading-relaxed italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-bold text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-black/40 font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Gradient overlays for smooth fade */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fcfcfc] to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#fcfcfc] to-transparent z-10" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
