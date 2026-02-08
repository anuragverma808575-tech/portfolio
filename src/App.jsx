import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import AnimatedBackground from './components/AnimatedBackground'
import Contact from './components/Contact'

const App = () => {
  return (
    <div>
      <AnimatedBackground/>
      <Navbar/>
      
      <Hero/>

      <About/>
      <Skills/>
      <Projects/>
      <Contact/>

    </div>
  )
}

export default App
