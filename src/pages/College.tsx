import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import college1 from '../assets/college1.webp';
import college2 from '../assets/college2.webp';
import college3 from '../assets/college3.webp';
import college4 from '../assets/college4.jpg';
import college5 from '../assets/college5.jpg';
import college6 from '../assets/college6.jpg';
import college7 from '../assets/college7.jpg';
import college8 from '../assets/college8.jpeg';
import college9 from '../assets/college9.jpeg';
import college10 from '../assets/college10.jpeg';
import college11 from '../assets/college11.jpeg';
import college12 from '../assets/college12.jpeg';


const College = () => {
  // Sample gallery items - you can customize these with your photos
  const galleryItems = [
    {
      id: 1,
      title: 'Campus View',
      image: college1,
      description: 'Add your photo description here'
    },
    {
      id: 2,
      title: 'College Building',
      image: college2,
      description: 'Add your photo description here'
    },
    {
      id: 3,
      title: 'College Tree',
      image: college3,
      description: 'Add your photo description here'
    },
    {
      id: 4,
      title: 'College Event',
      image: college4,
      description: 'Add your photo description here'
    },
    {
      id: 5,
      title: 'Tree in College',
      image: college5,
      description: 'Add your photo description here'
    },
    {
      id: 6,
      title: 'college life',
      image: college6,
      description: 'Add your photo description here'
    },    
    {
      id: 7,
      title: 'college campus',
      image: college7,
      description: 'Add your photo description here'
    },   
    {
      id: 8,
      title: 'college tree',
      image: college8,
      description: 'Add your photo description here'
    },
    {
      id: 9,
      title: 'famous tree in college',
      image: college9,
      description: 'Add your photo description here'
    },
    {
      id: 10,
      title: 'Best Tree In college',
      image: college10,
      description: 'Add your photo description here'
    },
    {
      id: 11,
      title: 'Tree in College',
      image: college11,
      description: 'Add your photo description here'
    },
    {
      id: 12,
      title: 'College Tree',
      image: college12,
      description: 'Add your photo description here'
    },

  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-white py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">College Gallery</h1>
          <p className="text-xl">
            Explore our campus and facilities through photos
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Photo */}
                <div className="h-64 overflow-hidden bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Add More?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Customize this gallery with your own photos and content to showcase your college or institution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Contact Us
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" icon={<ArrowRight />} iconPosition="right">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default College;
