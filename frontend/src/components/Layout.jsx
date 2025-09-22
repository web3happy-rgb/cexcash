import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-black via-black to-brand-gray text-white">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 py-12 md:py-16">{children}</main>
      <Footer />
    </div>
  );
}
