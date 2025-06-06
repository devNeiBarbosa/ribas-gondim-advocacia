import React from 'react';
import Header from './components/Header';
import Home from './components/Home'
import TheOffice from './components/TheOffice';
import AreasOfActivity from './components/AreasOfActivity';
import Team from './components/Team';
import Links from './components/Links';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <TheOffice />
      <AreasOfActivity />
      <Team />
      <Links />
      <Contact />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;   