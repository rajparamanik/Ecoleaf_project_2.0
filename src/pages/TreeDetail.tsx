import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Leaf, ThumbsUp, Calendar, ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button';

// Mocked tree data
const treeData = [
  {
    id: 'oak',
    name: 'Oak Tree',
    scientificName: 'Quercus',
    region: 'Northern Hemisphere',
    benefits: [
      'Provides habitat for wildlife',
      'Produces acorns that feed animals',
      'Strong wood for construction',
      'Excellent shade tree',
      'Helps prevent soil erosion'
    ],
    type: 'deciduous',
    lifespan: '200-300 years',
    height: '65-100 feet (20-30 meters)',
    nativeRegions: ['North America', 'Europe', 'Asia'],
    growthRate: 'Slow to medium',
    soilPreference: 'Well-drained, acidic soil',
    sunPreference: 'Full sun',
    description: 'Oak trees are known for their strength, longevity, and importance to wildlife. They are deciduous trees belonging to the genus Quercus and the family Fagaceae. There are approximately 500 species of oak trees found throughout the northern hemisphere.',
    mainImage: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    additionalImages: [
      'https://images.pexels.com/photos/60575/smoke-tree-cotinus-red-tree-60575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/33535/maple-oak-leaves-forest-fall.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    funFacts: [
      'Some oak trees don\'t produce acorns until they are 50 years old',
      'Oak trees can live for over 1,000 years',
      'The oak is the national tree of many countries'
    ],
    plantingTips: [
      'Plant in well-drained soil with adequate space',
      'Water regularly during the first two years',
      'Add mulch around the base but not touching the trunk',
      'Prune in late winter when the tree is dormant'
    ]
  },
  {
    id: 'pine',
    name: 'Pine Tree',
    scientificName: 'Pinus',
    region: 'Northern Hemisphere',
    benefits: [
      'Timber production',
      'Wildlife habitat',
      'Watershed protection',
      'Windbreaks',
      'Erosion control'
    ],
    type: 'evergreen',
    lifespan: '100-1,000 years, depending on species',
    height: '50-150 feet (15-45 meters)',
    nativeRegions: ['North America', 'Europe', 'Asia'],
    growthRate: 'Fast to medium',
    soilPreference: 'Well-drained, acidic soil',
    sunPreference: 'Full sun',
    description: 'Pine trees are evergreen conifers characterized by their needle-like leaves and distinctive cones. They belong to the genus Pinus and are among the most commercially important tree species worldwide.',
    mainImage: 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    additionalImages: [
      'https://images.pexels.com/photos/1684820/pexels-photo-1684820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/808517/pexels-photo-808517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    funFacts: [
      'The oldest living pine tree is over 4,800 years old',
      'Pine trees produce both male and female cones',
      'Pine trees communicate through underground fungal networks'
    ],
    plantingTips: [
      'Plant in full sun with well-drained soil',
      'Space trees at least 20 feet apart',
      'Water deeply but infrequently',
      'Apply mulch to conserve moisture and control weeds'
    ]
  }
];

const TreeDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the tree by ID
  const tree = treeData.find(t => t.id === id);
  
  // If tree not found, show a message
  if (!tree) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tree Not Found</h2>
          <p className="mb-6">Sorry, we couldn't find information about this tree.</p>
          <Link to="/trees">
            <Button variant="primary">Back to Trees</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div 
        className="relative h-80 md:h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${tree.mainImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container relative z-10 h-full flex flex-col justify-end pb-8 text-white">
          <Link to="/trees" className="flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Tree Categories
          </Link>
          <div className="flex items-center mb-2">
            <span className="bg-primary bg-opacity-80 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
              {tree.type.charAt(0).toUpperCase() + tree.type.slice(1)}
            </span>
            <span className="italic">{tree.scientificName}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{tree.name}</h1>
          <div className="flex items-center mt-2">
            <MapPin className="h-5 w-5 mr-1" />
            <span>{tree.region}</span>
          </div>
        </div>
      </div>
      
      <div className="container mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">About {tree.name}</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {tree.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-primary">Characteristics</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="font-medium w-1/3">Type:</span>
                      <span>{tree.type.charAt(0).toUpperCase() + tree.type.slice(1)}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-1/3">Lifespan:</span>
                      <span>{tree.lifespan}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-1/3">Height:</span>
                      <span>{tree.height}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-1/3">Growth Rate:</span>
                      <span>{tree.growthRate}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-primary">Growing Conditions</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="font-medium w-1/3">Soil:</span>
                      <span>{tree.soilPreference}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-1/3">Sunlight:</span>
                      <span>{tree.sunPreference}</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-medium mb-1">Native to:</span>
                      <ul className="list-disc pl-5">
                        {tree.nativeRegions.map((region, index) => (
                          <li key={index}>{region}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <ThumbsUp className="h-5 w-5 mr-2 text-primary" />
                  Benefits
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  {tree.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Planting Tips */}
              <div className="border-t border-gray-200 pt-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Planting & Care Tips</h3>
                <ul className="space-y-2">
                  {tree.plantingTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary font-bold mr-2">{index + 1}.</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Gallery */}
              {tree.additionalImages?.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold mb-4">Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tree.additionalImages.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <img src={image} alt={`${tree.name} ${index + 1}`} className="w-full h-64 object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fun Facts */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-primary" />
                Fun Facts
              </h3>
              <ul className="space-y-3">
                {tree.funFacts.map((fact, index) => (
                  <li key={index} className="flex items-start pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <span className="text-primary font-bold mr-2">•</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Similar Trees */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Similar Trees</h3>
              <ul className="space-y-4">
                {treeData
                  .filter(t => t.type === tree.type && t.id !== tree.id)
                  .slice(0, 3)
                  .map(similarTree => (
                    <li key={similarTree.id}>
                      <Link to={`/trees/${similarTree.id}`} className="flex items-center hover:text-primary">
                        <div className="h-12 w-12 rounded overflow-hidden mr-3">
                          <img src={similarTree.mainImage} alt={similarTree.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-medium">{similarTree.name}</h4>
                          <p className="text-xs text-gray-500 italic">{similarTree.scientificName}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            
            {/* Resources */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">External Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center text-primary hover:underline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Tree Identification Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-primary hover:underline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Conservation Efforts
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-primary hover:underline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Planting Guides
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeDetail;