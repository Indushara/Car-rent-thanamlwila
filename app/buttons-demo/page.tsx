'use client';

import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';
import FloatingActionButton from '@/components/FloatingActionButton';
import { useState } from 'react';

export default function ButtonsDemoPage() {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Advanced Button Set</h1>
        <p className="text-gray-400 mb-12">A comprehensive collection of button components with various styles and features.</p>
        
        {/* Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Button Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger Button</Button>
          </div>
        </section>

        {/* Sizes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </section>

        {/* With Icons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Buttons with Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Add Item
            </Button>
            <Button 
              variant="secondary"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              }
              iconPosition="left"
            >
              Back
            </Button>
            <Button 
              variant="outline"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              }
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </section>

        {/* States */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Button States</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button loading={loading} onClick={handleLoading}>
              {loading ? 'Loading...' : 'Click to Load'}
            </Button>
            <Button disabled>Disabled</Button>
            <Button href="/cars">Link Button</Button>
          </div>
        </section>

        {/* Full Width */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Full Width Button</h2>
          <Button fullWidth size="lg">Full Width Button</Button>
        </section>

        {/* Button Groups */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Button Groups</h2>
          <div className="space-y-4">
            <ButtonGroup spacing="sm">
              <Button variant="primary">First</Button>
              <Button variant="outline">Second</Button>
              <Button variant="outline">Third</Button>
            </ButtonGroup>
            <ButtonGroup spacing="md" orientation="vertical">
              <Button variant="primary" fullWidth>Vertical 1</Button>
              <Button variant="outline" fullWidth>Vertical 2</Button>
              <Button variant="outline" fullWidth>Vertical 3</Button>
            </ButtonGroup>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Action Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary"
              size="lg"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            >
              Book Now
            </Button>
            <Button 
              variant="secondary"
              size="lg"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            >
              Add to Cart
            </Button>
          </div>
        </section>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        }
        onClick={() => alert('FAB clicked!')}
        label="Add new item"
        position="bottom-right"
      />
    </div>
  );
}
