import { ChevronRight, Leaf, BookOpen, UserPlus, Users, TreeDeciduous, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Services = () => {
  // Testimonials
  const testimonials = [
    {
      id: 1,
      content: "EcoLeaf has transformed the way we teach about trees in our school. The detailed information and beautiful visuals make learning engaging for students.",
      author: "Sarah Johnson",
      position: "Elementary School Teacher",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      content: "As an arborist, I regularly use EcoLeaf to reference information about different tree species. It's become an invaluable resource in my daily work.",
      author: "Michael Rodriguez",
      position: "Professional Arborist",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      content: "The community feature on EcoLeaf has connected me with like-minded tree enthusiasts. We've organized local tree planting events and made a real difference.",
      author: "Emma Thompson",
      position: "Community Organizer",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-white py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl">
            Discover how EcoLeaf can help you learn about trees and connect with nature enthusiasts.
          </p>
        </div>
      </div>
      
      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              EcoLeaf provides a range of services to help individuals, communities, and organizations 
              learn about trees and participate in environmental conservation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="h-48 bg-primary bg-opacity-10 flex items-center justify-center">
                <TreeDeciduous className="h-20 w-20 text-primary" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Tree Database</h3>
                <p className="text-gray-600 mb-4">
                  Access our comprehensive database of tree species, including detailed information about 
                  their characteristics, benefits, growing conditions, and more.
                </p>
                <Link to="/trees" className="text-primary font-medium inline-flex items-center hover:underline">
                  Explore Trees <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="h-48 bg-primary bg-opacity-10 flex items-center justify-center">
                <Users className="h-20 w-20 text-primary" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Community Platform</h3>
                <p className="text-gray-600 mb-4">
                  Connect with fellow tree enthusiasts, share your knowledge and experiences, 
                  and participate in discussions about trees and environmental conservation.
                </p>
                <Link to="/community" className="text-primary font-medium inline-flex items-center hover:underline">
                  Join Community <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="h-48 bg-primary bg-opacity-10 flex items-center justify-center">
                <BookOpen className="h-20 w-20 text-primary" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Educational Resources</h3>
                <p className="text-gray-600 mb-4">
                  Access a wealth of educational materials about trees, including articles, guides, 
                  videos, and interactive learning tools for all ages.
                </p>
                <a href="#" className="text-primary font-medium inline-flex items-center hover:underline">
                  Browse Resources <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
            
            {/* Service 4 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="h-48 bg-primary bg-opacity-10 flex items-center justify-center">
                <UserPlus className="h-20 w-20 text-primary" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Volunteer Opportunities</h3>
                <p className="text-gray-600 mb-4">
                  Find and participate in tree planting events, conservation projects, and other 
                  volunteer opportunities in your area or around the world.
                </p>
                <a href="#" className="text-primary font-medium inline-flex items-center hover:underline">
                  Get Involved <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
            
            {/* Service 5 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="h-48 bg-primary bg-opacity-10 flex items-center justify-center">
                <Leaf className="h-20 w-20 text-primary" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Tree Identification</h3>
                <p className="text-gray-600 mb-4">
                  Learn how to identify different tree species using our guides, tools, and tips. 
                  Perfect for nature walks, hiking, or simply exploring your neighborhood.
                </p>
                <a href="#" className="text-primary font-medium inline-flex items-center hover:underline">
                  Learn More <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
            
            {/* Service 6 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="h-48 bg-primary bg-opacity-10 flex items-center justify-center">
                <Heart className="h-20 w-20 text-primary" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Conservation Support</h3>
                <p className="text-gray-600 mb-4">
                  Support tree conservation efforts through donations, partnerships, and advocacy. 
                  Together, we can make a difference in protecting our forests.
                </p>
                <a href="#" className="text-primary font-medium inline-flex items-center hover:underline">
                  Support Now <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Getting started with EcoLeaf is easy. Here's how you can make the most of our platform.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:translate-x-px"></div>
              
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center mb-12 relative">
                <div className="w-full md:w-1/2 md:pr-12 text-center md:text-right order-2 md:order-1">
                  <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
                  <p className="text-gray-600">
                    Sign up for a free account to access all features of EcoLeaf, including our community platform.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center my-4 md:my-0 z-10 order-1 md:order-2">
                  1
                </div>
                <div className="w-full md:w-1/2 md:pl-12 order-3 hidden md:block"></div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center mb-12 relative">
                <div className="w-full md:w-1/2 md:pr-12 text-center md:text-right order-2 md:order-1 hidden md:block"></div>
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center my-4 md:my-0 z-10 order-1 md:order-2">
                  2
                </div>
                <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left order-3 md:order-3">
                  <h3 className="text-xl font-semibold mb-3">Explore Tree Database</h3>
                  <p className="text-gray-600">
                    Browse through our extensive collection of tree species and learn about their characteristics.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center mb-12 relative">
                <div className="w-full md:w-1/2 md:pr-12 text-center md:text-right order-2 md:order-1">
                  <h3 className="text-xl font-semibold mb-3">Connect with Community</h3>
                  <p className="text-gray-600">
                    Join discussions, share your knowledge, and connect with other tree enthusiasts.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center my-4 md:my-0 z-10 order-1 md:order-2">
                  3
                </div>
                <div className="w-full md:w-1/2 md:pl-12 order-3 hidden md:block"></div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-center relative">
                <div className="w-full md:w-1/2 md:pr-12 text-center md:text-right order-2 md:order-1 hidden md:block"></div>
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center my-4 md:my-0 z-10 order-1 md:order-2">
                  4
                </div>
                <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left order-3 md:order-3">
                  <h3 className="text-xl font-semibold mb-3">Get Involved</h3>
                  <p className="text-gray-600">
                    Participate in events, contribute to conservation efforts, and help build a better tomorrow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-primary bg-opacity-10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Here's what our community members have to say about EcoLeaf and its impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join EcoLeaf today and become part of a community dedicated to building a better tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button 
                variant="outline" 
                size="lg"
                className="text-white border-white hover:bg-white hover:bg-opacity-20 hover:text-white"
              >
                Sign Up Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="text-white border-white hover:bg-white hover:bg-opacity-20 hover:text-white"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;