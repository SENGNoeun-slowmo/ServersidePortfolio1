// components/Contact.tsx
'use client';

import React, { useState } from 'react';
import { 
  FaEnvelope, 
  FaPhone, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaPaperPlane,
  FaMapMarkerAlt 
} from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Here you would normally send to Formspree, EmailJS, your backend, etc.
    // This is just a simulation
    await new Promise(resolve => setTimeout(resolve, 1200));

    // For demo: randomly simulate success/error
    if (Math.random() > 0.2) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <section 
      id="contact" 
      className="py-16 md:py-24 px-5 sm:px-8 lg:px-12 bg-gray-50 dark:bg-gray-950"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="
            text-4xl md:text-5xl font-bold 
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
            bg-clip-text text-transparent
          ">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's talk about it — I'm always open to new opportunities 
            and interesting conversations.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Let's Connect
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <a 
                      href="mailto:hello@sengvuthy.dev" 
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      hello@sengvuthy.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-gray-900 dark:text-gray-200">Phnom Penh, Cambodia</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Find me on</p>
                  <div className="flex gap-4">
                    <a 
                      href="https://github.com/yourusername" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-xl"
                    >
                      <FaGithub />
                    </a>
                    <a 
                      href="https://linkedin.com/in/yourprofile" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-[#0a66c2] transition-colors text-xl"
                    >
                      <FaLinkedin />
                    </a>
                    <a 
                      href="https://x.com/yourhandle" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-[#1da1f2] transition-colors text-xl"
                    >
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3">
            <form 
              onSubmit={handleSubmit}
              className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="
                      w-full px-4 py-3 rounded-lg 
                      bg-white dark:bg-gray-800 
                      border border-gray-300 dark:border-gray-700 
                      focus:border-indigo-500 dark:focus:border-indigo-500 
                      focus:ring-2 focus:ring-indigo-500/20 
                      outline-none transition-all
                    "
                    placeholder="Sokha"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="
                      w-full px-4 py-3 rounded-lg 
                      bg-white dark:bg-gray-800 
                      border border-gray-300 dark:border-gray-700 
                      focus:border-indigo-500 dark:focus:border-indigo-500 
                      focus:ring-2 focus:ring-indigo-500/20 
                      outline-none transition-all
                    "
                    placeholder="hello@example.com"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="
                    w-full px-4 py-3 rounded-lg 
                    bg-white dark:bg-gray-800 
                    border border-gray-300 dark:border-gray-700 
                    focus:border-indigo-500 dark:focus:border-indigo-500 
                    focus:ring-2 focus:ring-indigo-500/20 
                    outline-none transition-all resize-none
                  "
                  placeholder="Hi Seng, I have an interesting project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`
                  mt-6 w-full md:w-auto px-8 py-3 rounded-lg font-medium
                  flex items-center justify-center gap-2
                  transition-all duration-300
                  ${status === 'sending' 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                  }
                `}
              >
                {status === 'sending' ? (
                  <>Sending...</>
                ) : status === 'success' ? (
                  <>Message Sent! ✓</>
                ) : status === 'error' ? (
                  <>Something went wrong — Try again</>
                ) : (
                  <>
                    Send Message <FaPaperPlane className="text-sm" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="mt-4 text-center text-green-600 dark:text-green-400 text-sm">
                  Thank you! I'll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="mt-4 text-center text-red-600 dark:text-red-400 text-sm">
                  Oops! Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}