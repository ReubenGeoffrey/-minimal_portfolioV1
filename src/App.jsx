import { SecretsProvider } from './context/SecretsContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'

const App = () => {
  return (
    <SecretsProvider>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Footer />
      </div>
    </SecretsProvider>
  )
}

export default App