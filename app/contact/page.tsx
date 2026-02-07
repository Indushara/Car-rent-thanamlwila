'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('This demo form doesn\'t send emails yet. If you want, I can wire it to email, WhatsApp, or a backend API.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4 bg-black text-white">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-black">
            <span className="text-white font-bold text-sm">TR</span>
          </div>
          <Link href="/" className="text-white font-semibold hover:opacity-80 whitespace-nowrap">
            Thanamlwila Car Rental
          </Link>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          <Link href="/cars" className="text-white hover:opacity-80 transition">Cars</Link>
          <Link href="/book" className="text-white hover:opacity-80 transition">Book</Link>
          <Link href="/contact" className="text-white hover:opacity-80 transition">Contact</Link>
          <Link href="/reservations" className="text-white hover:opacity-80 transition">Reservations</Link>
        </div>
        
        <div className="flex items-center gap-1 ml-4 lg:ml-0">
          <Button href="/cars" variant="primary" size="sm" className="whitespace-nowrap">Browse cars</Button>
          <Button href="/book" variant="secondary" size="sm" className="whitespace-nowrap">Book now</Button>
        </div>
      </nav>
      
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact</h1>
        <p className="text-gray-400 mb-12 max-w-2xl">
          Questions, custom pickup, or long-term rentals? Send a message and we'll help fast.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Send a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">NAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">MESSAGE</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What can we help with?"
                  rows={6}
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
                  required
                />
              </div>
              
              <Button type="submit" variant="secondary" size="lg" fullWidth>
                Send (demo)
              </Button>
              
              <p className="text-gray-400 text-sm">
                This demo form doesn't send emails yet. If you want, I can wire it to email, WhatsApp, or a backend API.
              </p>
            </form>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-8">
            <div className="bg-gray-100 rounded-lg p-8 mb-6 relative overflow-hidden">
              <div className="absolute top-4 left-4 w-16 h-32 bg-gray-700 rounded-lg"></div>
              <div className="absolute top-8 right-8 w-20 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Business details</h3>
              <div className="space-y-3 text-gray-300">
                <div>
                  <span className="text-gray-400">Email: </span>
                  <a href="mailto:rentals@example.com" className="text-white underline hover:text-blue-400">
                    rentals@example.com
                  </a>
                </div>
                <div>
                  <span className="text-gray-400">Phone: </span>
                  <span className="text-white">+94 00 000 0000</span>
                </div>
                <div>
                  <span className="text-gray-400">Hours: </span>
                  <span className="text-white">Mon-Sun 8:00-20:00</span>
                </div>
                <div>
                  <span className="text-gray-400">Pickup: </span>
                  <span className="text-white">Airport, Downtown, Hotels (by request)</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Service area</h3>
              <p className="text-gray-400 text-sm">NYC and surrounding areas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
