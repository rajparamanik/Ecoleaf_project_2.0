import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    } = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast.success('Message sent successfully! We will get back to you soon.');
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-primary text-white py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">
            Have questions or suggestions? We'd love to hear from you.
          </p>
        </div>
      </div>
      
      <div className="container mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Your Name"
                    type="text"
                    name="name"
                    placeholder="Raj Paramanik"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  
                  <Input
                    label="Your Email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                </div>
                
                <Input
                  label="Subject"
                  type="text"
                  name="subject"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    className={`
                      block w-full rounded-md shadow-sm 
                      ${
                        errors.message
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-primary focus:border-primary'
                      }
                    `}
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    icon={<Send />}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">Sarbari, Raghunathpur, Purulia 723121</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600"> (+91) 86175 07071</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">
                      <a href="mailto:rgpstudent2023@ecoleaf.com" className="hover:text-primary transition-colors">
                        rgpstudent2023@ecoleaf.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Office Hours</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div> */}
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Community Inquiries</h3>
              <p className="text-gray-600 mb-4">
                For questions about our community, events, or volunteering opportunities, please email:
              </p>
              <a href="mailto:community@ecoleaf.com" className="text-primary font-medium hover:underline">
                community@ecoleaf.com
              </a>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-lg mb-4 px-2">Our Location</h3>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10037.191874662207!2d86.8137432266658!3d23.647535573825486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1749197462670!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EcoLeaf Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;