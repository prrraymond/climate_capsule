'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageOrientation, setImageOrientation] = useState('landscape');
  
  const backgroundImages = [
    {
    src: '/landscapes/nathan-anderson-OS3pW3b78Cg-unsplash.jpg',
    attribution: 'Photo by Nathan Anderson on Unsplash',
    link: 'https://unsplash.com/photos/mountain-during-winter-OS3pW3b78Cg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
    },
    {
    src: '/landscapes/jacalyn-beales-DR_rbQ5ZOTU-unsplash.jpg',
    attribution: 'Photo by Jacalyn Beales on Unsplash',
    link: 'https://unsplash.com/photos/waterfalls-DR_rbQ5ZOTU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
    },
    {
    src: '/landscapes/bodega-SCghkFegJfI-unsplash.jpg',
    attribution: 'Photo by Bodega on Unsplash',
    link: 'https://unsplash.com/photos/a-motorcycle-driving-down-a-road-in-front-of-a-mountain-SCghkFegJfI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
    },
    {
    src: '/landscapes/andrew-pons-lylCw4zcA7I-unsplash.jpg',
    attribution: 'Photo by Andrew Pons on Unsplash',
    link: 'https://unsplash.com/photos/close-up-of-a-yellow-and-blue-macaw-lylCw4zcA7I?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
    },
    {
    src: '/landscapes/alexandra-diaconu-VuBzplNNi0k-unsplash.jpg',
    attribution: 'Photo by Alexandra Diaconu on Unsplash',
    link: 'https://unsplash.com/photos/seascape-of-the-ocean-foam-VuBzplNNi0k?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
    },
    {
    src: '/landscapes/nathan-dumlao-moQKadTKb7A-unsplash.jpg',
    attribution: 'Photo by Nathan Dumlao on Unsplash',
    link: 'https://unsplash.com/photos/rock-mountain-during-foggy-day-moQKadTKb7A?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
    },
    {
    src: '/landscapes/IMG_0259.JPG',
    attribution: 'Photo by Paul Raymond',
    link: '#'
    }
  ];

  // Preload images and check orientation
  useEffect(() => {
    backgroundImages.forEach(image => {
      const img = new Image();
      img.src = image.src;
    });
  }, []);
  
  // Check image orientation when the current image changes
  useEffect(() => {
    const checkImageDimensions = () => {
      const img = new Image();
      img.onload = function() {
        const isPortrait = img.height > img.width;
        setImageOrientation(isPortrait ? 'portrait' : 'landscape');
      };
      img.src = backgroundImages[currentImageIndex].src;
    };
    
    checkImageDimensions();
  }, [currentImageIndex, backgroundImages]);

  // Image rotation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      )
    }, 8000)

    return () => clearInterval(timer)
  }, [backgroundImages.length])

  const scrollToSection = (elementId: string) => {
    document.getElementById(elementId)?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <div className="relative">
      {/* Hero Section with solid gradient background */}
      <div className="relative h-screen bg-gradient-to-br from-blue-900 to-blue-700">
        {/* Photo component with offset positioning */}
        <div className="absolute inset-0 flex justify-end items-center z-0 px-4 md:px-8 lg:px-16">
          <div 
            className={`relative w-full ${
              imageOrientation === 'portrait' 
                ? 'h-[80vh] max-w-xl' 
                : 'h-[70vh] max-w-6xl'
            } md:ml-[-10%] lg:ml-[-15%] overflow-hidden rounded-xl shadow-2xl transition-all duration-500`}
          >
            {backgroundImages.map((image, index) => (
              <div 
                key={image.src}
                className={`absolute inset-0 transition-opacity duration-1000
                          ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  backgroundImage: `url(${image.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: '100%'
                }}
              />
            ))}
            
            {/* Attribution overlay - positioned at bottom center */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-sm backdrop-blur-sm bg-black/50 px-3 py-1.5 rounded-full z-20">
              {backgroundImages[currentImageIndex].attribution}{' '}
              <a 
                href={backgroundImages[currentImageIndex].link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                View original
              </a>
            </div>
          </div>
        </div>

        {/* Semi-transparent overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
        
        {/* Content (now positioned with z-index to appear above the image) */}
        <div className="relative z-20 h-full">
          <nav className="p-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="text-white text-xl font-light tracking-wide">
                Climate Pledge
              </div>
              <Link 
                href="/auth" 
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full 
                          backdrop-blur-sm transition-all duration-200 font-quicksand"
              >
                Get Started
              </Link>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto px-6 pt-24">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-light text-white mb-8 leading-tight">
                Take Action for 
                <span className="text-emerald-400"> Climate Change</span>
              </h1>
              
              <p className="text-xl text-white/80 mb-12 leading-relaxed">
                Join a community of climate-conscious individuals making meaningful 
                changes in their daily lives. Track your progress, discover new ways 
                to reduce your impact, and be part of the solution.
              </p>

              <div className="flex gap-4">
                <Link 
                  href="/auth" 
                  className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white 
                            rounded-full text-lg transition-all duration-200"
                >
                  Make Your Pledge
                </Link>
                <button 
                  onClick={() => scrollToSection('how-it-works')} 
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white 
                            rounded-full text-lg backdrop-blur-sm transition-all duration-200"
                >
                  Learn More
                </button>
              </div>
            </div>
          </main>

          <div className="max-w-7xl mx-auto px-6 mt-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="backdrop-blur-sm bg-[#0000a0]/5 rounded-xl p-6 border border-[#0000a0]/10 hover:bg-[#0000a0]/10 transition-all duration-300">
                <div className="text-4xl font-light text-emerald-400 mb-2">12K+</div>
                <div className="text-white/90">Active Pledges</div>
              </div>
              <div className="backdrop-blur-sm bg-[#0000a0]/5 rounded-xl p-6 border border-[#0000a0]/10 hover:bg-[#0000a0]/10 transition-all duration-300">
                <div className="text-4xl font-light text-emerald-400 mb-2">45%</div>
                <div className="text-white/90">Average Impact Reduction</div>
              </div>
              <div className="backdrop-blur-sm bg-[#0000a0]/5 rounded-xl p-6 border border-[#0000a0]/10 hover:bg-[#0000a0]/10 transition-all duration-300">
                <div className="text-4xl font-light text-emerald-400 mb-2">6</div>
                <div className="text-white/90">Key Action Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your code remains unchanged */}
      
      {/* How It Works Section */}
      <div id="how-it-works" className="bg-gray-50 py-24">
        {/* Existing content */}
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-light text-gray-900 mb-16 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-[#0000a0]/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Choose Your Actions</h3>
              <p className="text-gray-600">
                Select from various categories of climate-positive actions that match your lifestyle and goals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-emerald-600">2</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your commitments and see the collective impact of your sustainable choices.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Join the Community</h3>
              <p className="text-gray-600">
                Connect with others, share your journey, and inspire positive change.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contribute Images Section */}
      <div className="bg-white py-24">
        {/* Existing content */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-light text-gray-900 mb-6">Share Your View</h2>
            <p className="text-xl text-gray-600 mb-12">
              Help inspire others by contributing your own environmental photography. 
              Share images of nature, sustainable practices, or climate action in your community.
            </p>
            <button className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white 
                            rounded-full text-lg transition-all duration-200">
              Submit a Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

