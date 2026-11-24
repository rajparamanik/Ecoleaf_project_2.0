import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import TreeCategory from './pages/TreeCategory';
import TreeDetail from './pages/TreeDetail';
import Contact from './pages/Contact';
import Community from './pages/Community';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import AIAssistantPage from './pages/AIAssistantPage';
import BuySell from './pages/buysell';
import College from './pages/College';
import PlantIdentifier from './pages/PlantIdentifier';

// Context
import { AuthProvider } from './context/AuthContext';

// Components
import AIAssistantWidget from './components/AIAssistantWidget';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="college" element={<College />} />
          <Route path="plant-identifier" element={<PlantIdentifier />} />
          <Route path="services" element={<Services />} />
          <Route path="trees" element={<TreeCategory />} />
          <Route path="trees/:id" element={<TreeDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="community" element={<Community />} />
          <Route path="ai-assistant" element={<AIAssistantPage />} />
          <Route path="/buy-sell" element={<BuySell />} />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;