import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import sir from '../assets/sir.png';
import raja1 from '../assets/raja1.jpg';
import raj from '../assets/raj.jpg';
import jhilik from '../assets/jhilik2.jpg';
import arayn from '../assets/aryan.jpg';
import soumen from '../assets/soumen.jpg';
import sujoy from '../assets/sujay.jpg';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-white py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About EcoLeaf</h1>
          <p className="text-xl">
            Our mission is to build a better tomorrow through tree education and community engagement.
          </p>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                EcoLeaf was founded in 2023 by a group of environmentalists, botanists, and tech enthusiasts 
                who shared a common vision: to create a comprehensive resource for tree education and to build 
                a community of tree enthusiasts around the world.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our founders recognized that while there was abundant information about trees scattered across 
                books, websites, and academic papers, there wasn't a single, user-friendly platform that brought 
                it all together in an accessible way.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, EcoLeaf has grown into a thriving community of thousands of members who share a passion 
                for trees and environmental conservation. Our database contains detailed information on hundreds 
                of tree species, and we're continuously expanding our resources.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/2693529/pexels-photo-2693529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Team working together" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We are committed to promoting environmental education and conservation through our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm text-center">
              <div className="bg-primary bg-opacity-10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Education</h3>
              <p className="text-gray-600">
                Provide accessible, accurate information about trees and their importance to our ecosystem.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm text-center">
              <div className="bg-primary bg-opacity-10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">
                Build a global community of tree enthusiasts who share knowledge and support conservation efforts.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm text-center">
              <div className="bg-primary bg-opacity-10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Conservation</h3>
              <p className="text-gray-600">
                Promote tree conservation and sustainable practices to help build a better tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Team Member</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Meet the passionate individuals behind EcoLeaf who are dedicated to our mission.
            </p>
          </div>
          {/* Team Leader */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-row items-center px-8 py-6" style={{ maxWidth: '420px' }}>
              <img
                src={sir}
                alt="Team Leader"
                className="w-24 h-24 object-cover rounded-full"
                style={{ border: '1px solid black' }}
              />
              <div className="flex flex-col items-start ml-6">
                <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#1e293b' }}>
                  Dr. Jogendra Garain
                </span>
                <span className="text-primary text-sm font-bold mt-1">
                  Team Leader
                </span>
              </div>
            </div>
          </div>
          {/* Other Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="h-64 overflow-hidden">
                
                   <img
                      src={raja1}
                      alt="Raja Pramanik"
                      className="w-full h-full object-cover"
                  />
                
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-1">Raja Pramanik</h3>
                <p className="text-primary text-sm mb-3">UI/UX Designer</p>
              </div>
            </div>
            
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="h-64 overflow-hidden">
                <ImageWithFallback
                  src={jhilik}
                  fallback="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Jhilik Dutta"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-1">Jhilik Dutta</h3>
                <p className="text-primary text-sm mb-3">Project Manager</p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="h-64 overflow-hidden">
                <ImageWithFallback
                  src={raj}
                  fallback="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Raj Paramanik"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-1">Raj Paramanik</h3>
                <p className="text-primary text-sm mb-3">Frontent/Backend Devloper</p>
              </div>
            </div>
            
            {/* Team Member 4 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="h-64 overflow-hidden">
                <ImageWithFallback
                  src={soumen}
                  alt="Soumen Kundu"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-1">Soumen Kundu</h3>
                <p className="text-primary text-sm mb-3">QA Engineer</p>
              </div>
            </div>
              {/* Team Member 5 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="h-64 overflow-hidden">
                <ImageWithFallback
                  src={sujoy}
                  fallback="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Sujoy Bauri"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-1">Sujoy Bauri</h3>
                <p className="text-primary text-sm mb-3">Business Analysis</p>
              </div>
            </div>
            {/* Team Member 6 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="h-64 overflow-hidden">
                <ImageWithFallback
                  src={arayn}
                  fallback="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Aryan Kumar Nonia"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-1">Aryan Kumar Nonia</h3>
                <p className="text-primary text-sm mb-3">SEO Specialists</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact */}
      <section className="py-16 bg-primary bg-opacity-10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Since our founding, we've made significant strides in tree education and conservation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-gray-700">Community Members</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-gray-700">Tree Species Cataloged</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">25,000+</div>
              <p className="text-gray-700">Trees Planted</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us in Building a Better Tomorrow</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Whether you're a tree expert or simply passionate about nature, there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button variant="primary" size="lg">
                Join Community
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" icon={<ArrowRight />} iconPosition="right">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;