import { ShoppingCart, Tag, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import b1 from '../assets/Hibiscus Red Two in One Color.jpg';
import b2 from '../assets/Jasmine Flower Beautiful Kodai Malli Plant.jpg';
import b3 from '../assets/Parijat Glorious Pavala Malli Flower Plant.jpg';
import b4 from '../assets/b4.jpg';
import b5 from '../assets/b5.jpg';
import b6 from '../assets/b6.jpg';
import b7 from '../assets/b7.jpg';
import b8 from '../assets/b8.jpg';
import b9 from '../assets/b9.jpg';
import b10 from '../assets/b10.jpg';
import b11 from '../assets/b11.jpg';
import b12 from '../assets/b12.jpg';
import b13 from '../assets/b13.jpg';
import b14 from '../assets/b14.jpg';
import b15 from '../assets/b15.jpg';
import b16 from '../assets/b16.jpg';
import b17 from '../assets/b17.jpg';
import b18 from '../assets/b18.jpg';
import b19 from '../assets/b19.jpg';
import b20 from '../assets/b20.jpg';
import b21 from '../assets/b21.jpg';
import b22 from '../assets/b22.jpg';
import b23 from '../assets/b23.jpg';
import b24 from '../assets/b24.jpg';
import b25 from '../assets/b25.jpg';
import b26 from '../assets/b26.jpg';
import b27 from '../assets/b27.jpg';
import b28 from '../assets/b28.jpg';
import b29 from '../assets/b29.jpg';
import b30 from '../assets/b30.jpg';


const BuySell = () => {
    const navigate = useNavigate();

    const handleSellInCommunity = (title: string, price: string, description?: string) => {
        const prefill = `Selling: ${title} — ${price}${description ? ` — ${description}` : ''}`;
        navigate('/community', { state: { prefill } });
    };

    return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary text-white py-12">
        <div className="container">
          <Link to="/services" className="inline-flex items-center text-white opacity-90 hover:opacity-100 mb-4">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Services
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3"> 
            <ShoppingCart className="w-8 h-8 text-white" /> Buy & Sell
          </h1>
          <p className="text-xl max-w-3xl">A simple marketplace to buy and sell tree-related goods, seedlings, and tools — built for the EcoLeaf community.</p>
        </div>
      </div>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Example Feature Cards */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <Tag className="w-7 h-7 text-primary" />
                <h3 className="text-xl font-semibold">List Items</h3>
              </div>
              <p className="text-gray-600">Start small, grow big — nurture life from a seedling.Fresh beginnings in every sprout.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <ShoppingCart className="w-7 h-7 text-primary" />
                <h3 className="text-xl font-semibold">Browse & Buy</h3>
              </div>
              <p className="text-gray-600">Filter by location, price, and category to find great items from fellow community members.</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white">✓</div>
                <h3 className="text-xl font-semibold">Safe Transactions</h3>
              </div>
              <p className="text-gray-600">We recommend meeting locally and following safe payment practices. EcoLeaf does not process payments directly in this version.</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Recent Listings</h2>
            <p className="text-gray-600 mb-6">Example listings for demonstration — integrate with a backend or use local storage to make this fully functional.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample listing */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <img
                        src={b1}
                        alt="b1" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold">Hibiscus Red Two in One Color</div>
                    <div className="text-primary font-bold">₹49.00</div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Hibiscus red two-in-one color is a perfect houseplant with good red flowers. This plant is categorized under flower plant, ornamental & loose, and cut flower plant.</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Hibiscus Red Two in One Color','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                    <Button size="sm"><a href='https://santhionlineplants.com/products/hibiscus-red-two-in-one-color'>Buy Now</a></Button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                      <img
                        src={b2}
                        alt="b2" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold">Jasmine Flower : Beautiful Kodai Malli Plant</div>
                    <div className="text-primary font-bold">₹51.00</div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">The  Parijatham Plant small (Gardenia) is a good-looking house plant with attractive flowers. This plant is categorized under flower ornamental,cut flower & flower plant.</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Jasmine Flower : Beautiful Kodai Malli Plant','₹51.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                    <Button size="sm"><a href='https://santhionlineplants.com/products/jasmine-flower-beautiful-kodai-malli-plant'>Buy Now</a></Button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b3}
                            alt="b3" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Parijat : Glorious Pavala Malli Flower Plant</div>
                            <div className="text-primary font-bold">₹70.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Get the most trending & popular houseplant parijat. We offer this divine flowering plant at an affordable cost. This plant is praised for its vibrant colored fragrant flowers, & it..</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Parijat : Glorious Pavala Malli Flower Plant','₹70.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/parijat'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b4}
                            alt="b4" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Bulb Sampangi plant</div>
                            <div className="text-primary font-bold">₹65.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Bulb Sampangi plant is the most important tropical ornamental houseplant. This plant is categorized under flower plant, bulbous plant and cut flower plants.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Bulb Sampangi plant','₹65.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/bulb-sampangi-plant'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b5}
                            alt="b5" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Barbados Cherry Plant</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Get the fruitful plant Barbados cherry from us. The Barbados cherry plant is a vitamin C-rich fruit with more benefits. You will be rewarded with many years of delicious fruits...</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Barbados Cherry Plant','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/barbados-cherry-plant'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b6}
                            alt="b6" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Mulberry fruit Plant</div>
                            <div className="text-primary font-bold">₹59.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Get the delicious fruit plant mulberry at a reasonable cost from us. This mulberry plant has multipurpose uses with leaves & fruits. Get a variety of fruit plants from us..</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Mulberry fruit Plant','₹59.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/mulberry-fruit-plant'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b7}
                            alt="b7" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Excellent Arka Kiran Guava (Pink Koiyya Plant)</div>
                            <div className="text-primary font-bold">₹65.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Guava is a tropical fruit tree. It has many health and nutritional benefits. Arka Kiran is a hybrid variety developed by IIHR, Bengaluru. It is a dual-purpose variety. Since it...</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Excellent Arka Kiran Guava (Pink Koiyya Plant)','₹65.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/arka-kiran-guava'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b8}
                            alt="b8" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Balaji Lemon Plant</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">The Balaji lemon plant is a good house plant with high-yielding fruits. This plant is categorized under fruit plants, grafted fruit plants, & outdoor plants.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Balaji Lemon Plant','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/balaji-lemon-plant'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b9}
                            alt="b9" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Chiku Plant (Sapota)</div>
                            <div className="text-primary font-bold">₹45.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">The Sapota Plant is an evergreen tree native to Central America. Moreover, this Plant has many commercial and health benefits.

Name: It is also known as Sapodilla, Chikoo, Chico, Naseberry,...</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Hibiscus Red Two in One Color','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/chiku-plant-sapota'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b10}
                            alt="b10" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Custard Apple Plant-Seetha Palam</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Custard Apple Plant is an excellent houseplant having edible fruit and is a well-growing plant. This plant is categorized under tree crop, fruit crop, and outdoor plant.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Custard Apple Plant-Seetha Palam','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/custard-apple-plant-seetha-palam'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b11}
                            alt="b11" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Tissue culture Grand nain (G9) banana plant</div>
                            <div className="text-primary font-bold">₹59.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">A pocket guide containing identification tips and care information — brand new.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Tissue culture Grand nain (G9) banana plant','₹59.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/tissue-culture-grand-nain-g9-banana-plant'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>


                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b12}
                            alt="b12" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Henna Plant (Maruthani)</div>
                            <div className="text-primary font-bold">₹90.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">A pocket guide containing identification tips and care information — brand new.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Henna Plant (Maruthani)','₹90.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/henna-plant-maruthani'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b13}
                            alt="b13" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Holy Basil Plant-krishna Tulsi plant</div>
                            <div className="text-primary font-bold">₹39.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">The Holy Basil plant is a perennial plant native to the Indian subcontinent. It is a highly aromatic plant. Moreover, this plant has many medicinal values and also spiritual values.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Holy Basil Plant-krishna Tulsi plant','₹39.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/holy-basil-plant-krishna-tulsi'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b14}
                            alt="b14" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Black Turmeric-Karumanjal</div>
                            <div className="text-primary font-bold">₹99.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Buy the superhero of herbal plants Black Turmeric – Karumanjal at a reasonable cost. Not only for colour but at the same time it has powerful health properties that...</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Black Turmeric-Karumanjal','₹99.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/black-turmeric-karumanjal'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b15}
                            alt="b15" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Pirandai Herbal plant</div>
                            <div className="text-primary font-bold">₹40.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">The Pirandai plant is an excellent house plant with a creeping character. This plant is categorized under herbal, creeper, and succulent.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Pirandai Herbal plant','₹40.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/pirandai-herbal-plant'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b16}
                            alt="b16" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Neem Plant – Azadirachta indica</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">A pocket guide containing identification tips and care information — brand new.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Neem Plant – Azadirachta indica','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/neem-plant-azadirachta-indica'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b17}
                            alt="b17" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Coleus yellow ovate leaf</div>
                            <div className="text-primary font-bold">₹45.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Coleus yellow ovate plant is the superb house plant with attractive leaves. This plant is categorized under indoor, ornamental & foliage plants.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Coleus yellow ovate leaf','₹45.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/coleus-yellow-ovate-leaf'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b18}
                            alt="b18" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Money Plant</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">The Money Plant, also known as the Jade Plant, is one of the most well-known and well-liked of the various succulent Crassula used as indoor plants. It is available in..</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Money Plant','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/money-plant'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b19}
                            alt="b19" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Coleus Premium Sun Crimpson Gold</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">A pocket guide containing identification tips and care information — brand new.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Coleus Premium Sun Crimpson Gold','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/coleus-premium-sun-crimpson-gold'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b20}
                            alt="b20" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Bright Yellow Cosmos Flower</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Get the finest Yellow Cosmos Flower Seeds for your garden at a reasonable cost. Cosmos seeds grow & bloom faster compared to other flowers. This flower brings brightness to your..</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Bright Yellow Cosmos Flower','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/bright-yellow-cosmos-flower-seeds-sunshine-garden'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b21}
                            alt="b21" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Tuberose white multipetal bulb (Pearl)</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">A pocket guide containing identification tips and care information — brand new.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Tuberose white multipetal bulb (Pearl)','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/tuberose-white-multipetal-bulb-pearl'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b22}
                            alt="b22" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Aparajita light blue seeds</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">A pocket guide containing identification tips and care information — brand new.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Aparajita light blue seeds','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/aparajita-light-blue-seeds'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b23}
                            alt="b23" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">weet corn seed</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">We offer the best quality sweet corn seed from Santhi online plants. It is suitable for all types of gardening such as home gardening, balcony gardening & others. Growing..</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('weet corn seed','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/sweet-corn-seed'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b24}
                            alt="b24" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Green pea seeds – Pachchai pattaani</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">A pocket guide containing identification tips and care information — brand new.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Green pea seeds – Pachchai pattaani','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/green-pea-seeds-pachchai-pattaani'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b25}
                            alt="b25" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Dark pink cosmos flower seeds</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">A pocket guide containing identification tips and care information — brand new.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Dark pink cosmos flower seeds','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://santhionlineplants.com/products/dark-pink-cosmos-flower-seeds'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b26}
                            alt="b26" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Double colour Cosmos pink with yellow shade flowers seeds</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">A pocket guide containing identification tips and care information — brand new.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Double colour Cosmos pink with yellow shade flowers seeds','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                           <Button size="sm"><a href='https://santhionlineplants.com/products/double-colour-cosmos-pink-with-yellow-shade-flowers-seeds'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b27}
                            alt="b27" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Lucky Bamboo Plant</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Easy to grow and care for, the Lucky Bamboo plant is a popular indoor plant because of more reasons than just its care requirements. According to Feng Shui, this is one of the best lucky plants for homes, and its reputation as such greatly adds to its charm and allure. Additionally, it is also a great gifting option that works as a personal pick-me-up</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Lucky Bamboo Plant','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://www.ugaoo.com/products/lucky-bamboo-plant-3-layer'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b28}
                            alt="b28" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Cactus Plant</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Cacti are the favourite of new plant parents, owing to the minimal maintenance that they require. Cacti can adapt to their natural habitat and change their shape to one that is most suited to conserve and store water. It looks equally beautiful in both traditional and modern minimalistic setup and provide an excellent contrast to foliage plants.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Cactus Plant','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://www.ugaoo.com/products/cactus-plant-elongated'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b29}
                            alt="b29" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Haworthia Maculata Plant</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">Looking for a desk plant that does not disappoint? The Haworthia Maculata is your best bet! With fleshy leaves and pointy edges, the Haworthia Maculata plant is a stunning indoor succulent. The speckled white variegations make the leaves appear almost translucent, giving the plant a very mysterious and alluring appearance.</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Haworthia Maculata Plant','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://www.ugaoo.com/products/haworthia-maculata-plant'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <img
                            src={b30}
                            alt="b30" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">Kashmiri Saffron (Kesar)</div>
                            <div className="text-primary font-bold">₹49.00</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">The Kashmiri Saffron (Kesar) Bulbs are premium-quality bulbs sourced from the finest saffron-growing regions. These bulbs are specially selected to ensure high germination, better yield, and premium saffron threads. Kashmiri saffron is renowned worldwide for its superior aroma, deep red color, and medicinal properties</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleSellInCommunity('Kashmiri Saffron (Kesar)','₹49.00','Healthy plants with 2-in-1 colors')}> Sell in Community</Button>
                            <Button size="sm"><a href='https://plantsguru.com/products/saffron-bulbs'>Buy Now</a></Button>
                        </div>
                    </div>
              </div>

            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Want this to be fully functional? I can add listings backed by a database and a simple listing form.</p>

              <Button variant="outline"><a href='https://santhionlineplants.com/'>Search For More</a></Button>
              
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuySell;
