import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Search, Info } from 'lucide-react';
import Card from '../components/ui/Card';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import tree1 from '../assets/mangopic.jpg';
import tree2 from '../assets/gwava.jpg';
import tree3 from '../assets/banana.jpg';
import tree4 from '../assets/papaya.jpg';
import tree5 from '../assets/aa.jpg';
import tree6 from '../assets/jackfruit.jpg';
import tree7 from '../assets/ff.jpg';
import tree8 from '../assets/bambo.jpeg';
import tree9 from '../assets/teak.webp';
import tree10 from '../assets/rosewood.jpg';
import tree11 from '../assets/sal.webp';
import tree12 from '../assets/pepal.webp';
import tree13 from '../assets/banya.jpg';
import tree14 from '../assets/bb.jpg';
import tree15 from '../assets/palm.jpeg';
import tree16 from '../assets/lotus.webp';
import tree17 from '../assets/c.jpg';
import tree18 from '../assets/curry.jpeg';
import tree19 from '../assets/basil.jpeg';
import tree20 from '../assets/cinnamon.webp';
import tree21 from '../assets/clove-tree-with-aromatic-flower-buds-in-bloom-growing-in-spice-farm-in-zanzibar-tanzania.webp';
import tree22 from '../assets/nutmeg.jpeg';
import tree23 from '../assets/arecaplam.webp';
import tree24 from '../assets/rubber.jpg';
import tree25 from '../assets/mehogony.jpg';
import tree26 from '../assets/flame.webp';
import tree27 from '../assets/cannonbol.webp';
import tree28 from '../assets/corkscrew.webp';
import tree29 from '../assets/dragon.jpeg';
import tree30 from '../assets/floss.webp';
import tree31 from '../assets/rain tree.webp';
import tree32 from '../assets/monkey.webp';
import tree33 from '../assets/sago.webp';
import tree34 from '../assets/umbrella.webp';
import tree35 from '../assets/money.webp';



const localTreeData = [
	{
		id: 'mango',
		name: 'Mango',
		type: 'fruit',
		mainImage: tree1,
		additionalImages: [tree1, tree1],
		description:
			'Mango is a large, evergreen tropical tree known for its sweet, juicy fruit. It is one of the most beloved and widely cultivated fruits in India. The tree features dense green foliage and produces small fragrant flowers that develop into fleshy fruits.',
		uses: [
			'Fruit: Eaten fresh, used in juices, pickles, desserts.',
			'Medicinal: Leaves and bark used in Ayurveda.',
			'Timber: Used for furniture and packing.',
		],
		habitat: ['Tropical and subtropical regions of India.'],
		growthInfo: [
			'Height: 10–35m',
			'Lifespan: 100+ years',
			'Soil: Loamy, pH 5.5–7.5',
		],
		funFacts: [
			'Mango is called the "King of Fruits" in India.',
			'India is the largest producer of mangoes in the world.',
		],
		plantingTips: [
			'Plant in full sun.',
			'Water regularly during the first few years.',
			'Prune to shape the tree and remove dead branches.',
		],
	},
	{
		id: 'guava',
		name: 'Guava',
		type: 'fruit',
		mainImage: tree2,
		additionalImages: [tree2, tree2],
		description:
			'Guava is a tropical fruit tree known for its nutritious fruit that is rich in Vitamin C and fiber. It is hardy and can grow in a variety of conditions.',
		uses: [
			'Fruit: Fresh, juices, jams.',
			'Medicinal: Leaves for tea, treating diarrhea.',
		],
		habitat: ['Tropical and subtropical climates across India.'],
		growthInfo: [
			'Height: 3–10m',
			'Lifespan: 25–40 years',
			'Soil: Sandy loam, pH 5.5–7',
		],
		funFacts: [
			'Guava leaves are often used to make herbal tea.',
			'The guava fruit is known for its strong aroma.',
		],
		plantingTips: [
			'Requires well-drained soil and full sun.',
			'Water moderately, more during dry spells.',
			'Prune annually to maintain shape and remove dead wood.',
		],
	},
	{
		id: 'banana',
		name: 'Banana',
		type: 'fruit',
		mainImage: tree3,
		additionalImages: [tree3, tree3],
		description:
			'Banana is a fast-growing, herbaceous plant that produces elongated, edible fruits in bunches.',
		uses: [
			'Fruit: Eaten raw, cooked, dried.',
			'Medicinal: Digestion, blood pressure.',
		],
		habitat: ['Tropical regions of India.'],
		growthInfo: [
			'Height: 2–6m',
			'Lifespan: 1–2 years per plant',
			'Soil: Loamy, pH 6–7.5',
		],
		funFacts: [
			'Bananas are berries, but strawberries are not.',
			'The banana plant is the largest herbaceous flowering plant.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in dry periods.',
			'Provide support to the plant as it grows, to keep the fruit off the ground.',
		],
	},
	{
		id: 'papaya',
		name: 'Papaya',
		type: 'fruit',
		mainImage: tree4,
		additionalImages: [tree4, tree4],
		description:
			'Papaya is a fast-growing, short-lived, soft-stemmed tree-like plant known for its large, sweet, orange-fleshed fruit.',
		uses: [
			'Fruit: Eaten ripe or raw.',
			'Medicinal: Green fruit and leaves aid digestion.',
		],
		habitat: ['Tropical and subtropical areas.'],
		growthInfo: [
			'Height: 2–4m',
			'Lifespan: 3–5 years',
			'Soil: Loamy, pH 6.0–6.5',
		],
		funFacts: [
			'Papayas contain an enzyme called papain, which can tenderize meat.',
			'The papaya tree is not a true tree, but a large herb.',
		],
		plantingTips: [
			'Needs full sun and well-drained soil.',
			'Water regularly, especially in dry periods.',
			'Protect from strong winds which can damage the plant.',
		],
	},
	{
		id: 'amla',
		name: 'Amla / Indian Gooseberry',
		type: 'fruit',
		mainImage: tree5,
		additionalImages: [tree5, tree5],
		description:
			'Amla is a small to medium-sized deciduous tree known for its round, greenish-yellow fruit that is extremely rich in Vitamin C and antioxidants.',
		uses: ['Fruit: Raw, pickled, juice.', 'Medicinal: Immunity, digestion.'],
		habitat: ['Tropical and subtropical climates.'],
		growthInfo: [
			'Height: 8–18m',
			'Lifespan: 60–70 years',
			'Soil: Loamy, pH 6.0–8.0',
		],
		funFacts: [
			'Amla is considered a superfood due to its high nutrient content.',
			'It is one of the three ingredients in the Ayurvedic formulation Triphala.',
		],
		plantingTips: [
			'Prefers well-drained soil and full sun to partial shade.',
			'Water regularly, especially in the first few years.',
			'Prune to remove dead or diseased branches and to shape the tree.',
		],
	},
	{
		id: 'jackfruit',
		name: 'Jackfruit',
		type: 'fruit',
		mainImage: tree6,
		additionalImages: [tree6, tree6],
		description:
			'Jackfruit is a large, tropical tree known for its massive, edible fruit that is the largest tree-borne fruit in the world. The fruit has a distinctive sweet aroma and is rich in nutrients.',
		uses: [
			'Fruit: Eaten raw or cooked, used in desserts.',
			'Timber: Used for furniture, flooring.',
			'Latex: Used in traditional medicine.',
		],
		habitat: ['Tropical lowland forests.'],
		growthInfo: [
			'Height: 10–20m',
			'Lifespan: 50–150 years',
			'Soil: Well-drained, pH 6–7',
		],
		funFacts: [
			'Jackfruit is the national fruit of Bangladesh.',
			'The wood of the jackfruit tree is resistant to termites and is used for making furniture.',
		],
		plantingTips: [
			'Requires a warm, tropical climate and well-drained soil.',
			'Water regularly, especially during dry spells.',
			'Prune to remove dead or diseased branches and to shape the tree.',
		],
	},
	{
		id: 'neem',
		name: 'Neem',
		type: 'medicinal',
		mainImage: tree7,
		additionalImages: [tree7, tree7],
		description:
			'Neem is a fast-growing tree known for its wide-ranging medicinal properties. Almost every part of the tree is used in traditional medicine, and its seeds are the source of neem oil, a natural pesticide.',
		uses: [
			'Medicinal: Treating fever, infections, and skin diseases.',
			'Pesticide: Natural insect repellent.',
			'Timber: Durable and resistant to termites.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 15–20m',
			'Lifespan: 100+ years',
			'Soil: Wide range, pH 6–8',
		],
		funFacts: [
			'Neem is often called the "Village Pharmacy" due to its medicinal properties.',
			'All parts of the neem tree are used in some form in traditional medicine.',
		],
		plantingTips: [
			'Thrives in a variety of soils but prefers well-drained sandy loam.',
			'Water moderately, more during dry spells.',
			'Prune to maintain shape and remove any dead or diseased branches.',
		],
	},
	{
		id: 'bamboo',
		name: 'Bamboo',
		type: 'evergreen',
		mainImage: tree8,
		additionalImages: [tree8, tree8],
		description:
			'Bamboo is a group of woody plants in the grass family, known for their tall, slender stems and rapid growth. Bamboo species are highly valued for their versatility and strength.',
		uses: [
			'Timber: Construction, furniture, crafts.',
			'Paper: Pulp for paper production.',
			'Food: Young shoots are edible.',
			'Erosion control: Stabilizes soil.',
		],
		habitat: ['Tropical and subtropical forests.'],
		growthInfo: [
			'Height: 5–30m',
			'Lifespan: 20–120 years',
			'Soil: Well-drained, pH 6–8',
		],
		funFacts: [
			'Some species of bamboo can grow up to 91 cm (35 in) in a single day.',
			'Bamboo is the fastest-growing plant on Earth.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Bamboo prefers a sunny location but can tolerate partial shade.',
		],
	},
	{
		id: 'teak',
		name: 'Teak',
		type: 'timber',
		mainImage: tree9,
		additionalImages: [tree9, tree9],
		description:
			'Teak is a large deciduous tree species native to South and Southeast Asia, known for its high-quality timber that is resistant to water, insects, and decay.',
		uses: [
			'Timber: High-value furniture, flooring, and boat building.',
			'Essential oil: Used in perfumes and as a pesticide.',
		],
		habitat: ['Tropical and subtropical forests.'],
		growthInfo: [
			'Height: 10–40m',
			'Lifespan: 100+ years',
			'Soil: Well-drained, pH 6–8',
		],
		funFacts: [
			'Teak wood contains natural oils that make it resistant to water and pests.',
			'It is one of the most durable and long-lasting types of wood.',
		],
		plantingTips: [
			'Requires well-drained soil and full sun.',
			'Water regularly, especially in the first few years.',
			'Prune to remove dead or diseased branches and to shape the tree.',
		],
	},
	{
		id: 'rosewood',
		name: 'Rosewood',
		type: 'timber',
		mainImage: tree10,
		additionalImages: [tree10, tree10],
		description:
			'Rosewood is a dense and durable hardwood, highly valued for its deep color and beautiful grain. It is often used in high-end furniture and musical instruments.',
		uses: [
			'Timber: Luxury furniture, cabinetry, and flooring.',
			'Essential oil: Used in aromatherapy and perfumes.',
		],
		habitat: ['Tropical and subtropical forests.'],
		growthInfo: [
			'Height: 10–20m',
			'Lifespan: 60–100 years',
			'Soil: Well-drained, pH 6–8',
		],
		funFacts: [
			'Rosewood is often used to make guitar bodies and other musical instruments.',
			'It has a sweet, floral scent when freshly cut.',
		],
		plantingTips: [
			'Prefers well-drained soil and full sun to partial shade.',
			'Water regularly, especially in the first few years.',
			'Prune to remove dead or diseased branches and to shape the tree.',
		],
	},
	{
		id: 'sal',
		name: 'Sal',
		type: 'timber',
		mainImage: tree11,
		additionalImages: [tree11, tree11],
		description:
			'Sal is a large deciduous tree species native to the Indian subcontinent, known for its high-quality timber and as the primary source of sal wood.',
		uses: [
			'Timber: Furniture, flooring, and construction.',
			'Resin: Used in incense and traditional medicine.',
		],
		habitat: ['Tropical and subtropical forests.'],
		growthInfo: [
			'Height: 15–30m',
			'Lifespan: 100+ years',
			'Soil: Well-drained, pH 6–8',
		],
		funFacts: [
			'Sal trees are often found in mixed deciduous forests.',
			'The resin from the sal tree is used to make traditional incense.',
		],
		plantingTips: [
			'Requires well-drained soil and full sun.',
			'Water regularly, especially in the first few years.',
			'Prune to remove dead or diseased branches and to shape the tree.',
		],
	},
	{
		id: 'peepal',
		name: 'Peepal',
		type: 'deciduous',
		mainImage: tree12,
		additionalImages: [tree12, tree12],
		description:
			'Peepal, also known as the sacred fig, is a species of fig native to the Indian subcontinent. It is considered sacred in Hinduism and Buddhism and is known for its heart-shaped leaves.',
		uses: [
			'Ornamental: Widely planted as a shade tree in gardens and along roads.',
			'Religious: Sacred in Hinduism and Buddhism.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 20–30m',
			'Lifespan: 60–80 years',
			'Soil: Wide range, pH 6–8',
		],
		funFacts: [
			'The Peepal tree can live for over 100 years.',
			'It is believed that Gautama Buddha attained enlightenment under a Peepal tree.',
		],
		plantingTips: [
			'Prefers well-drained soil and full sun.',
			'Water regularly, especially in the first few years.',
			'Prune to remove dead or diseased branches and to shape the tree.',
		],
	},
	{
		id: 'banyan',
		name: 'Banyan',
		type: 'deciduous',
		mainImage: tree13,
		additionalImages: [tree13, tree13],
		description:
			'Banyan is a fig tree species native to the Indian subcontinent, known for its wide-spreading canopy and aerial roots that grow into thick, pillar-like structures.',
		uses: [
			'Ornamental: Planted for shade and as an ornamental tree.',
			'Medicinal: Used in traditional medicine.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 10–30m',
			'Lifespan: 60–80 years',
			'Soil: Wide range, pH 6–8',
		],
		funFacts: [
			'The Banyan tree is the national tree of India.',
			'It can take root and grow in a variety of conditions, including on other trees.',
		],
		plantingTips: [
			'Requires well-drained soil and full sun.',
			'Water regularly, especially in the first few years.',
			'Prune to remove dead or diseased branches and to shape the tree.',
		],
	},
	{
		id: 'coconut',
		name: 'Coconut',
		type: 'fruit',
		mainImage: tree14,
		additionalImages: [tree14, tree14],
		description:
			'Coconut is a large palm tree species native to the tropical coastal regions of the Indian subcontinent. It is known for its large, edible fruit and versatile uses.',
		uses: [
			'Fruit: Eaten raw or used to make coconut water, milk, and oil.',
			'Timber: Used for construction and crafts.',
			'Ornamental: Planted for shade and decoration.',
		],
		habitat: ['Tropical coastal areas.'],
		growthInfo: [
			'Height: 20–30m',
			'Lifespan: 60–80 years',
			'Soil: Well-drained, pH 5–8',
		],
		funFacts: [
			'Coconuts can travel long distances by floating on water.',
			'The coconut palm is often called the "Tree of Life" for its many uses.',
		],
		plantingTips: [
			'Prefers sandy, well-drained soil and full sun.',
			'Water regularly, especially in the first few years.',
			'Protect from strong winds which can damage the fronds and fruit.',
		],
	},
	{
		id: 'date-palm',
		name: 'Date Palm',
		type: 'fruit',
		mainImage: tree15,
		additionalImages: [tree15, tree15],
		description:
			'Date Palm is a flowering plant species in the palm family, native to the Middle East and South Asia. It is cultivated for its sweet, edible fruits called dates.',
		uses: [
			'Fruit: Eaten fresh or dried, used in desserts and smoothies.',
			'Ornamental: Planted for its graceful appearance and shade.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 15–25m',
			'Lifespan: 100+ years',
			'Soil: Well-drained, pH 6–8',
		],
		funFacts: [
			'Dates are a staple food in many Middle Eastern countries.',
			'The date palm can produce fruit for over 100 years.',
		],
		plantingTips: [
			'Requires well-drained soil and full sun.',
			'Water regularly, especially in the first few years.',
			'Protect from strong winds which can damage the fronds and fruit.',
		],
	},
	{
		id: 'lotus',
		name: 'Lotus',
		type: 'evergreen',
		mainImage: tree16,
		additionalImages: [tree16, tree16],
		description:
			'Lotus is a perennial plant species native to the tropical and subtropical regions of the world. It is known for its large, fragrant flowers that bloom above the water surface.',
		uses: [
			'Ornamental: Planted in ponds and water gardens for its beautiful flowers.',
			'Religious: Sacred in Hinduism and Buddhism.',
		],
		habitat: ['Freshwater lakes, ponds, and marshes.'],
		growthInfo: [
			'Height: 1–2m (above water)',
			'Lifespan: 30–50 years',
			'Soil: Loamy, pH 6–7',
		],
		funFacts: [
			'The lotus flower can bloom for up to three days before wilting.',
			'Lotus seeds can remain viable for hundreds of years.',
		],
		plantingTips: [
			'Plant in rich, loamy soil with good drainage.',
			'Water regularly, keeping the soil consistently moist.',
			'Provide full sun to partial shade for optimal growth.',
		],
	},
	{
		id: 'marigold-tree',
		name: 'Marigold Tree',
		type: 'deciduous',
		mainImage: tree17,
		additionalImages: [tree17, tree17],
		description:
			'Marigold Tree, also known as African Marigold, is a species of flowering plant native to the Americas. It is widely cultivated for its bright orange and yellow flowers.',
		uses: [
			'Ornamental: Planted in gardens and landscapes for its vibrant flowers.',
			'Religious: Used in Hindu religious ceremonies and as a garland.',
		],
		habitat: ['Gardens, landscapes, and agricultural fields.'],
		growthInfo: [
			'Height: 0.3–1m',
			'Lifespan: 1 year (annual)',
			'Soil: Well-drained, pH 6–7.5',
		],
		funFacts: [
			'Marigolds are often used in companion planting to deter pests.',
			'The flowers are edible and can be used in salads and garnishes.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Deadhead spent flowers to encourage more blooms.',
		],
	},
	{
		id: 'curry-tree',
		name: 'Curry Tree',
		type: 'medicinal',
		mainImage: tree18,
		additionalImages: [tree18, tree18],
		description:
			'Curry Tree is a tropical to subtropical tree species in the family Rutaceae, native to the Indian subcontinent. It is valued for its aromatic leaves used in cooking and its medicinal properties.',
		uses: [
			'Medicinal: Used in traditional medicine for digestive disorders, diabetes, and skin conditions.',
			'Culinary: Leaves used as a spice in Indian cuisine.',
			'Ornamental: Planted for its fragrant foliage.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 4–6m',
			'Lifespan: 20–30 years',
			'Soil: Well-drained, pH 6–7.5',
		],
		funFacts: [
			'The leaves of the curry tree are used to make a popular Indian spice mix called "curry powder".',
			'In traditional medicine, curry leaves are believed to have anti-diabetic properties.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Prune to maintain shape and remove any dead or diseased branches.',
		],
	},
	{
		id: 'basil-tree',
		name: 'Basil Tree',
		type: 'medicinal',
		mainImage: tree19,
		additionalImages: [tree19, tree19],
		description:
			'Basil Tree, also known as Holy Basil or Tulsi, is a perennial plant in the mint family, native to the Indian subcontinent. It is highly regarded for its aromatic leaves and is considered sacred in Hinduism.',
		uses: [
			'Medicinal: Used in Ayurveda for respiratory conditions, stress, and inflammation.',
			'Culinary: Leaves used as a herb in cooking.',
			'Ornamental: Grown in gardens for its fragrant foliage and flowers.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 0.3–1m',
			'Lifespan: 1 year (annual)',
			'Soil: Well-drained, pH 6–7.5',
		],
		funFacts: [
			'Basil is a key ingredient in many Asian cuisines, including Thai and Vietnamese.',
			'Holy Basil is considered a sacred plant in Hindu belief and is often grown around temples.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Pinch back the tips of the plant to encourage bushier growth.',
		],
	},
	{
		id: 'cinnamon-tree',
		name: 'Cinnamon Tree',
		type: 'timber',
		mainImage: tree20,
		additionalImages: [tree20, tree20],
		description:
			'Cinnamon Tree, also known as Ceylon Cinnamon, is a small evergreen tree native to Sri Lanka and southern India. It is valued for its aromatic bark, which is the source of true cinnamon spice.',
		uses: [
			'Medicinal: Used in traditional medicine for its anti-inflammatory and antioxidant properties.',
			'Spice: Bark used as a spice in cooking and baking.',
			'Ornamental: Grown for its attractive foliage and bark.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 5–10m',
			'Lifespan: 20–30 years',
			'Soil: Well-drained, pH 6–7.5',
		],
		funFacts: [
			'Cinnamon is one of the oldest known spices, used since ancient times.',
			'The spice is made by drying the inner bark of the tree and grinding it into a powder.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Protect from strong winds which can damage the branches and bark.',
		],
	},
	{
		id: 'clove-tree',
		name: 'Clove Tree',
		type: 'medicinal',
		mainImage: tree21,
		additionalImages: [tree21, tree21],
		description:
			'Clove Tree is an evergreen tree native to the Maluku Islands in Indonesia, but widely cultivated in India. It is known for its aromatic flower buds, which are used as a spice and in traditional medicine.',
		uses: [
			'Medicinal: Used for its analgesic and antiseptic properties, and to treat digestive issues.',
			'Spice: Dried flower buds used as a spice in cooking and baking.',
			'Ornamental: Grown for its attractive foliage and flowers.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 10–20m',
			'Lifespan: 20–40 years',
			'Soil: Well-drained, pH 6–7.5',
		],
		funFacts: [
			'Cloves are the dried flower buds of the clove tree and are used as a spice.',
			'The clove tree can grow up to 20 meters tall in the wild.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Protect from strong winds which can damage the branches and flowers.',
		],
	},
	{
		id: 'nutmeg-tree',
		name: 'Nutmeg Tree',
		type: 'medicinal',
		mainImage: tree22,
		additionalImages: [tree22, tree22],
		description:
			'Nutmeg Tree is a tropical evergreen tree native to the Banda Islands in Indonesia, but widely cultivated in India. It is valued for its aromatic seeds, which are used as a spice and in traditional medicine.',
		uses: [
			'Medicinal: Used for its anti-inflammatory and digestive properties.',
			'Spice: Dried seeds used as a spice in cooking and baking.',
			'Ornamental: Grown for its attractive foliage and as a shade tree.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 10–20m',
			'Lifespan: 20–40 years',
			'Soil: Well-drained, pH 6–7.5',
		],
		funFacts: [
			'Nutmeg is one of the most expensive spices by weight.',
			'The tree also produces a fruit called mace, which is also used as a spice.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Protect from strong winds which can damage the branches and fruit.',
		],
	},
	{
		id: 'areca-palm',
		name: 'Areca Palm',
		type: 'evergreen',
		mainImage: tree23,
		additionalImages: [tree23, tree23],
		description:
			'Areca Palm, also known as Butterfly Palm, is a species of palm native to Madagascar. It is widely cultivated as an ornamental plant for its feathery, arching fronds.',
		uses: [
			'Ornamental: Planted in gardens, parks, and as a houseplant for its decorative foliage.',
			'Air purification: Known to remove toxins from the air.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 6–12m',
			'Lifespan: 20–30 years',
			'Soil: Well-drained, pH 6–7.5',
		],
		funFacts: [
			'Areca palms are often used in indoor landscaping due to their air-purifying properties.',
			'The palm can tolerate a range of light conditions, from full sun to shade.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, keeping the soil moist but not waterlogged.',
			'Fertilize every few months with a balanced fertilizer to promote growth.',
		],
	},
	{
		id: 'rubber-tree',
		name: 'Rubber Tree',
		type: 'timber',
		mainImage: tree24,
		additionalImages: [tree24, tree24],
		description:
			'Rubber Tree is a tropical tree native to the Amazon rainforest, but widely cultivated in India and other tropical regions for its latex, which is the primary source of natural rubber.',
		uses: [
			'Rubber: Latex harvested for rubber production.',
			'Timber: Wood used for furniture and construction.',
		],
		habitat: ['Tropical rainforests and plantations.'],
		growthInfo: [
			'Height: 20–30m',
			'Lifespan: 25–50 years',
			'Soil: Well-drained, pH 6–7.5',
		],
		funFacts: [
			'Rubber trees are tapped for their latex, which is used to make natural rubber.',
			'The tree can be tapped for latex for up to 30 years.',
		],
		plantingTips: [
			'Requires well-drained soil and full sun.',
			'Water regularly, especially in the first few years.',
			'Protect from strong winds which can damage the branches and latex vessels.',
		],
	},
	{
		id: 'mahogany',
		name: 'Mahogany',
		type: 'timber',
		mainImage: tree25,
		additionalImages: [tree25, tree25],
		description:
			'Mahogany is a tropical hardwood tree native to the Americas, but widely planted in tropical and subtropical regions for its valuable timber.',
		uses: [
			'Timber: High-quality furniture, cabinetry, and flooring.',
			'Ornamental: Planted for shade and as an ornamental tree.',
		],
		habitat: ['Tropical and subtropical forests.'],
		growthInfo: [
			'Height: 15–30m',
			'Lifespan: 100+ years',
			'Soil: Well-drained, pH 6–8',
		],
		funFacts: [
			'Mahogany wood is known for its durability and resistance to water.',
			'The tree can grow up to 60 meters tall in the wild.',
		],
		plantingTips: [
			'Requires well-drained soil and full sun.',
			'Water regularly, especially in the first few years.',
			'Prune to remove dead or diseased branches and to shape the tree.',
		],
	},
	{
		id: 'flame-of-the-forest',
		name: 'Flame of the Forest',
		type: 'deciduous',
		mainImage: tree26,
		additionalImages: [tree26, tree26],
		description:
			'Flame of the Forest, also known as Bastard Teak, is a species of tree native to the Indian subcontinent. It is known for its bright orange-red flowers that bloom in bunches, resembling flames.',
		uses: [
			'Ornamental: Planted for its striking flowers and as a shade tree.',
			'Medicinal: Used in traditional medicine for various ailments.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 10–15m',
			'Lifespan: 50–150 years',
			'Soil: Well-drained, pH 6–8',
		],
		funFacts: [
			'The flowers of the Flame of the Forest tree are used to make a natural dye.',
			'In some cultures, the tree is considered sacred and is planted near temples.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Prune to remove dead or diseased branches and to shape the tree.',
		],
	},
	{
		id: 'cannonball-tree',
		name: 'Cannonball Tree',
		type: 'deciduous',
		mainImage: tree27,
		additionalImages: [tree27, tree27],
		description:
			'Cannonball Tree is a large tree native to the tropical forests of Central and South America, but also grown in India. It is known for its large, round fruits that resemble cannonballs.',
		uses: [
			'Ornamental: Planted for its unique fruits and as a shade tree.',
			'Medicinal: Used in traditional medicine.',
		],
		habitat: ['Tropical forests and plantations.'],
		growthInfo: [
			'Height: 20–30m',
			'Lifespan: 50–150 years',
			'Soil: Well-drained, pH 6–8',
		],
		funFacts: [
			'The cannonball tree gets its name from the large, round fruits that resemble cannonballs.',
			'The tree is often planted in temple gardens in India due to its religious significance.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Protect from strong winds which can damage the branches and fruits.',
		],
	},
	{
		id: 'corkscrew-tree',
		name: 'Corkscrew Tree',
		type: 'evergreen',
		mainImage: tree28,
		additionalImages: [tree28, tree28],
		description:
			'Corkscrew Tree is a species of flowering plant native to Southeast Asia and widely cultivated in India. It is known for its twisted, corkscrew-like branches and beautiful flowers.',
		uses: [
			'Ornamental: Planted for its unique growth form and attractive flowers.',
			'Medicinal: Used in traditional medicine.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 3–10m',
			'Lifespan: 20–50 years',
			'Soil: Well-drained, pH 6–7.5',
		],
		funFacts: [
			'The corkscrew tree is often used in bonsai due to its interesting shape.',
			'Its flowers are attractive to a variety of pollinators, including bees and butterflies.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Prune to maintain shape and remove any dead or diseased branches.',
		],
	},
	{
		id: 'dragon-tree',
		name: 'Dragon Tree',
		type: 'evergreen',
		mainImage: tree29,
		additionalImages: [tree29, tree29],
		description:
			'Dragon Tree is a tree species native to the Canary Islands, Cape Verde, and Madeira, but also grown in India. It is known for its distinctive appearance with a thick, gnarled trunk and spiky leaves.',
		uses: [
			'Ornamental: Planted for its unique appearance and as a landscape tree.',
			'Medicinal: Used in traditional medicine.',
		],
		habitat: ['Subtropical and tropical regions.'],
		growthInfo: [
			'Height: 10–20m',
			'Lifespan: 50–150 years',
			'Soil: Well-drained, pH 6–8',
		],
		funFacts: [
			'The dragon tree is known for its longevity, with some trees living for over 1000 years.',
			'It produces a red resin known as dragon’s blood, which has been used in dyes, medicines, and incense.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Protect from strong winds which can damage the leaves and branches.',
		],
	},
	{
		id: 'floss-silk-tree',
		name: 'Floss Silk Tree',
		type: 'deciduous',
		mainImage: tree30,
		additionalImages: [tree30, tree30],
		description:
			'Floss Silk Tree, also known as Silk Cotton Tree, is a large tree native to tropical and subtropical regions of the Americas, but also grown in India. It is known for its large, showy flowers and fluffy seed fibers.',
		uses: [
			'Ornamental: Planted for its striking flowers and as a shade tree.',
			'Medicinal: Used in traditional medicine.',
		],
		habitat: ['Tropical and subtropical forests.'],
		growthInfo: [
			'Height: 10–25m',
			'Lifespan: 50–150 years',
			'Soil: Well-drained, pH 6–8',
		],
		funFacts: [
			'The floss silk tree can grow up to 25 meters tall and 3 meters in diameter.',
			'Its flowers are large, white, and fragrant, blooming at night and falling by morning.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Protect from strong winds which can damage the flowers and branches.',
		],
	},
	{
		id: 'rain-tree',
		name: 'Rain Tree',
		type: 'deciduous',
		mainImage: tree31,
		additionalImages: [tree31, tree31],
		description:
			'Rain Tree, also known as Samanea, is a species of flowering tree native to Central America and widely planted in tropical regions. It is known for its large, spreading canopy and pink flowers.',
		uses: [
			'Ornamental: Planted for its shade and attractive flowers.',
			'Timber: Wood used for furniture and construction.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 15–25m',
			'Lifespan: 50–150 years',
			'Soil: Well-drained, pH 6–8',
		],
		funFacts: [
			'The rain tree gets its name from the fact that it often grows in areas with high rainfall.',
			'Its flowers are rich in nectar and attract a variety of birds and insects.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Prune to remove dead or diseased branches and to shape the tree.',
		],
	},
	{
		id: 'monkey-puzzle-tree',
		name: 'Monkey Puzzle Tree',
		type: 'evergreen',
		mainImage: tree32,
		additionalImages: [tree32, tree32],
		description:
			'Monkey Puzzle Tree, also known as Chilean Pine, is a tree species native to central and southern Chile. It is known for its unique, spiky appearance and is often used as an ornamental tree in gardens and parks.',
		uses: [
			'Ornamental: Planted for its distinctive appearance and as a specimen tree.',
			'Timber: Wood used for furniture and construction.',
		],
		habitat: ['Temperate rainforests and plantations.'],
		growthInfo: [
			'Height: 20–30m',
			'Lifespan: 1000+ years',
			'Soil: Well-drained, pH 6–8',
		],
		funFacts: [
			'The monkey puzzle tree is so named because its spiky branches make it difficult for monkeys to climb.',
			'It is one of the few conifers that bear edible seeds, which are rich in protein and healthy fats.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Protect from strong winds which can damage the branches and leaves.',
		],
	},
	{
		id: 'sago-palm',
		name: 'Sago Palm',
		type: 'evergreen',
		mainImage: tree33,
		additionalImages: [tree33, tree33],
		description:
			'Sago Palm is a cycadaceous plant native to southern Japan, but widely cultivated in tropical and subtropical regions. It is known for its stout trunk and large, feathery leaves.',
		uses: [
			'Ornamental: Planted for its dramatic foliage and as a landscape specimen.',
			'Medicinal: Used in traditional medicine.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 1–3m',
			'Lifespan: 50–70 years',
			'Soil: Well-drained, pH 6–7.5',
		],
		funFacts: [
			'Sago palms are not true palms, but are more closely related to ferns and mosses.',
			'The plant is dioecious, meaning that there are male and female plants, and only the female plants produce seeds.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Protect from strong winds which can damage the leaves and trunk.',
		],
	},
	{
		id: 'umbrella-tree',
		name: 'Umbrella Tree',
		type: 'evergreen',
		mainImage: tree34,
		additionalImages: [tree34, tree34],
		description:
			'Umbrella Tree, also known as Octopus Tree, is a species of flowering plant native to Australia and New Guinea, but widely cultivated in tropical regions. It is known for its distinctive, umbrella-like canopy.',
		uses: [
			'Ornamental: Planted for its unique shape and as a shade tree.',
			'Timber: Wood used for furniture and construction.',
		],
		habitat: ['Tropical and subtropical regions.'],
		growthInfo: [
			'Height: 10–15m',
			'Lifespan: 50–150 years',
			'Soil: Well-drained, pH 6–8',
		],
		funFacts: [
			'The umbrella tree can grow up to 20 meters tall in the wild.',
			'Its leaves are large and glossy, and can be up to 90 cm long.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, especially in the first few years.',
			'Prune to remove dead or diseased branches and to shape the tree.',
		],
	},
	{
		id: 'money-tree',
		name: 'Money Tree',
		type: 'evergreen',
		mainImage: tree35,
		additionalImages: [tree35, tree35],
		description:
			'Money Tree is a tropical wetland tree native to Central and South America, but widely cultivated in Asia. It is known for its braided trunk and large, palmate leaves.',
		uses: [
			'Ornamental: Planted as a houseplant or in gardens for its decorative foliage.',
			'Air purification: Known to remove toxins from the air.',
		],
		habitat: ['Tropical wetlands and riverbanks.'],
		growthInfo: [
			'Height: 10–20m',
			'Lifespan: 10–30 years',
			'Soil: Well-drained, pH 6–7.5',
		],
		funFacts: [
			'The money tree is often associated with the Chinese practice of feng shui, where it is believed to bring good luck and prosperity.',
			'Its leaves are said to resemble the shape of a hand, which is a symbol of blessing in many cultures.',
		],
		plantingTips: [
			'Plant in well-drained soil with plenty of organic matter.',
			'Water regularly, keeping the soil moist but not waterlogged.',
			'Fertilize every few months with a balanced fertilizer to promote growth.',
		],
	},
];

const categoriesList = [
	{ id: 'all', name: 'All Trees' },
	{ id: 'fruit', name: 'Fruit Trees' },
	{ id: 'timber', name: 'Timber Trees' },
	{ id: 'medicinal', name: 'Medicinal Trees' },
	{ id: 'evergreen', name: 'Evergreen Trees' },
	{ id: 'deciduous', name: 'Deciduous Trees' },
];

const TreeCategory = () => {
	const { id: categoryId } = useParams();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');
	const [categories] = useState(categoriesList);

	// Fix: Use the correct data source for treeData and provide a typed Tree interface
	type Tree = {
		id: string;
		name: string;
		mainImage: string;
		additionalImages: string[];
		description: string;
		uses?: string[];
		habitat?: string[];
		growthInfo?: string[];
		funFacts?: string[];
		plantingTips?: string[];
		benefits?: string[];
		region?: string;
		type?: string;
		scientificName?: string;
	};
	const [treeData] = useState<Tree[]>(localTreeData);
	const [selectedTree, setSelectedTree] = useState<Tree | null>(null);

	// ensure selectedTree is read to avoid "declared but its value is never read" lint error
	useEffect(() => {
		// noop read to satisfy linter when selectedTree is only used in JSX conditionals
		if (selectedTree) {
			void selectedTree;
		}
	}, [selectedTree]);

	// Update selectedCategory when route param changes
	useEffect(() => {
		if (categoryId && categoryId !== selectedCategory) {
			setSelectedCategory(categoryId);
		}
	}, [categoryId]);

	const [loading] = useState(false);

	// Category + search filter (do not forcibly exclude types like 'flowering' or 'ornamental')
	const filteredTrees = (treeData as any[]).filter((tree: any) => {
		const q = searchQuery.toLowerCase();
		const name = (tree.name || '').toLowerCase();
		const sci = (tree.scientificName || '').toLowerCase();
	
		const matchesSearch = name.includes(q) || sci.includes(q);
	
		const strictCategory = selectedCategory === 'all' || (tree.type || '') === selectedCategory;
	
		return matchesSearch && strictCategory;
	});

	// Get the current category name
	const currentCategory =
		categories.find((cat) => cat.id === selectedCategory)?.name || 'All Trees';

	return (
		<div className="bg-gray-50 min-h-screen pb-12">
			<div className="bg-primary text-white py-12">
				<div className="container">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">
						{currentCategory}
					</h1>
					<p className="text-xl">
						Explore and learn about different tree species from around the world.
					</p>
				</div>
			</div>

			<div className="container mt-8">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					{/* Sidebar */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
							<h3 className="font-semibold mb-4 flex items-center">
								<Filter className="h-5 w-5 mr-2" />
								Categories
							</h3>
							<ul className="space-y-2">
								{categories.map((category) => (
									<li key={category.id}>
										<button
											onClick={() => setSelectedCategory(category.id)}
											className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
												selectedCategory === category.id
													? 'bg-primary text-white'
													: 'text-gray-700 hover:bg-gray-100'
											}`}
										>
											{category.name}
										</button>
									</li>
								))}
							</ul>
						</div>

						<div className="bg-white rounded-lg shadow-sm p-6">
							<h3 className="font-semibold mb-4 flex items-center">
								<Info className="h-5 w-5 mr-2" />
								Did You Know?
							</h3>
							<div className="text-gray-600 space-y-4">
								<p>
									Trees are the longest living organisms on Earth, and never die
									of old age.
								</p>
								<p>
									A single tree can absorb as much as 48 pounds of carbon dioxide
									per year.
								</p>
								<p>
									Trees can communicate with each other through underground fungi
									networks.
								</p>
							</div>
						</div>
					</div>

					{/* Main content */}
					<div className="lg:col-span-3">
						{/* Search */}
						<div className="bg-white rounded-lg shadow-sm p-4 mb-6">
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Search className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type="text"
									placeholder="Search trees by name or scientific name..."
									className="pl-10 w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
						</div>

						{/* Tree grid */}
						{loading ? (
							<div className="bg-white rounded-lg shadow-sm p-8 text-center">
								<h3 className="text-xl font-semibold mb-2">Loading trees...</h3>
							</div>
						) : filteredTrees.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredTrees.map((tree) => (
									<button
										key={tree.id}
										onClick={() => setSelectedTree(tree)}
										className="text-left"
									>
										<Card className="h-full min-h-[350px] flex flex-col justify-between">
											<div>
												<Card.Image
													src={tree.mainImage}
													alt={tree.name}
													className="h-48 w-full object-cover"
												/>
												<div className="flex items-center text-sm text-gray-500 mb-2 px-4 pt-2">
													<span className="bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full text-xs font-medium">
														{tree.type
															? tree.type.charAt(0).toUpperCase() + tree.type.slice(1)
															: 'Unknown'}
													</span>
												</div>
												<Card.Body>
													<Card.Title>{tree.name}</Card.Title>
													<p className="text-gray-600 italic mb-2">
														{tree.scientificName || 'N/A'}
													</p>
													<p className="text-gray-600 mb-2 line-clamp-2">
														{tree.description}
													</p>
													{tree.region && (
														<div className="text-sm text-gray-500 mb-1">
															<span className="font-medium">Region:</span> {tree.region}
														</div>
													)}
													{tree.benefits && tree.benefits.length > 0 && (
														<div className="text-sm text-gray-500 mb-1">
															<span className="font-medium">Benefits:</span> {tree.benefits.join(', ')}
														</div>
													)}
												</Card.Body>
											</div>
										</Card>
									</button>
								))}
							</div>
						) : null}

						{/* Tree Detail Modal */}
						{selectedTree && (
							<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
								<div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
									<button
										className="absolute top-2 right-2 text-gray-500 hover:text-primary"
										onClick={() => setSelectedTree(null)}
									>
										×
									</button>
									<div className="flex gap-4 mb-4">
										<ImageWithFallback
											src={selectedTree.mainImage}
											alt={selectedTree.name}
											className="w-full md:w-64 h-48 object-cover rounded"
										/>
										<div className="flex-1">
											<h2 className="text-2xl font-bold mb-1">{selectedTree.name}</h2>
											<p className="italic text-gray-600 mb-2">{selectedTree.scientificName}</p>
											<p className="mb-2">{selectedTree.description}</p>
											<div className="mb-2">
												<span className="font-medium">Region:</span> {selectedTree.region || 'Unknown'}
											</div>
											<div className="mb-2">
												<span className="font-medium">Benefits:</span> {(selectedTree.benefits || []).join(', ')}
											</div>
											{selectedTree.uses && (
												<div className="mb-2">
													<span className="font-medium">Uses:</span>
													<ul className="list-disc ml-5">
														{selectedTree.uses.map((use, i) => (
															<li key={i}>{use}</li>
														))}
													</ul>
												</div>
											)}
											{selectedTree.habitat && (
												<div className="mb-2">
													<span className="font-medium">Habitat:</span>
													<ul className="list-disc ml-5">
														{selectedTree.habitat.map((h, i) => (
															<li key={i}>{h}</li>
														))}
													</ul>
												</div>
											)}
											{selectedTree.growthInfo && (
												<div className="mb-2">
													<span className="font-medium">Growth Info:</span>
													<ul className="list-disc ml-5">
														{selectedTree.growthInfo.map((g, i) => (
															<li key={i}>{g}</li>
														))}
													</ul>
												</div>
											)}
											{selectedTree.funFacts && (
												<div className="mb-2">
													<span className="font-medium">Fun Facts:</span>
													<ul className="list-disc ml-5">
														{selectedTree.funFacts.map((f, i) => (
															<li key={i}>{f}</li>
														))}
													</ul>
												</div>
											)}
											{selectedTree.plantingTips && (
												<div className="mb-2">
													<span className="font-medium">Planting Tips:</span>
													<ul className="list-disc ml-5">
														{selectedTree.plantingTips.map((tip, i) => (
															<li key={i}>{tip}</li>
														))}
													</ul>
												</div>
											)}
											{selectedTree.additionalImages && selectedTree.additionalImages.length > 0 && (
												<div className="mb-2">
													<span className="font-medium">Gallery:</span>
													<div className="flex gap-2 mt-1 flex-wrap">
														{selectedTree.additionalImages.map((img, i) => (
															<ImageWithFallback
																key={i}
																src={img}
																alt={`${selectedTree.name} ${i + 1}`}
																className="w-20 h-16 object-cover rounded"
															/>
														))}
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						)}
						{/* End Tree Detail Modal */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TreeCategory;