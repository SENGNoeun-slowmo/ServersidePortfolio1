// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Navbar';       // your fixed header
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
// import Skills from './pages/Skills';         // if separate route wanted
// import Experience from './pages/Experience';

function App() {
  return (
    <Router>
      <div className="relative">
        <Header />
        {/* <Sidebar /> */}

        <main className="pt-16 md:pt-20"> {/* space for header */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Optional: separate pages for skills & experience */}
            {/* <Route path="/skills" element={<Skills ... />} /> */}
            {/* <Route path="/experience" element={<Experience ... />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;