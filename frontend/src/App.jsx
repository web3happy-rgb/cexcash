import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import HomePage from './pages/HomePage.jsx';
import RewardsPage from './pages/RewardsPage.jsx';
import RewardsMatrixPage from './pages/RewardsMatrixPage.jsx';
import HowItWorksPage from './pages/HowItWorksPage.jsx';
import ResourcesPage from './pages/ResourcesPage.jsx';
import ResourcesWebinarsPage from './pages/ResourcesWebinarsPage.jsx';
import ResourcesToolsPage from './pages/ResourcesToolsPage.jsx';
import FaqPage from './pages/FaqPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LegalPage from './pages/LegalPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/rewards/matrix" element={<RewardsMatrixPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/webinars" element={<ResourcesWebinarsPage />} />
          <Route path="/resources/tools" element={<ResourcesToolsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal/terms" element={<LegalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
