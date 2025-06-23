
import React, { useState } from 'react';
import LandingPage from '../components/LandingPage';
import MainMenu from '../components/MainMenu';
import PoemsSection from '../components/PoemsSection';
import SongSection from '../components/SongSection';
import EditsSection from '../components/EditsSection';

type Section = 'landing' | 'menu' | 'poems' | 'song' | 'edits';

const Index = () => {
  const [currentSection, setCurrentSection] = useState<Section>('landing');

  const handleContinueFromLanding = () => {
    setCurrentSection('menu');
  };

  const handleSelectSection = (section: 'poems' | 'song' | 'edits') => {
    setCurrentSection(section);
  };

  const handleBackToMenu = () => {
    setCurrentSection('menu');
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'landing':
        return <LandingPage onContinue={handleContinueFromLanding} />;
      case 'menu':
        return <MainMenu onSelectSection={handleSelectSection} />;
      case 'poems':
        return <PoemsSection onBack={handleBackToMenu} />;
      case 'song':
        return <SongSection onBack={handleBackToMenu} />;
      case 'edits':
        return <EditsSection onBack={handleBackToMenu} />;
      default:
        return <LandingPage onContinue={handleContinueFromLanding} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {renderCurrentSection()}
    </div>
  );
};

export default Index;
