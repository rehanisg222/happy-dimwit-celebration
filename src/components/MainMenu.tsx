
import React from 'react';
import { Book, Music, Video } from 'lucide-react';

interface MainMenuProps {
  onSelectSection: (section: 'poems' | 'song' | 'edits') => void;
}

const MainMenu = ({ onSelectSection }: MainMenuProps) => {
  const menuItems = [
    {
      id: 'poems' as const,
      title: 'Poems',
      description: 'Beautiful words just for you',
      icon: Book,
      gradient: 'from-pink-girly to-rose-gold',
    },
    {
      id: 'song' as const,
      title: 'Song',
      description: 'Your special melody',
      icon: Music,
      gradient: 'from-purple-girly to-lavender',
    },
    {
      id: 'edits' as const,
      title: 'Edits',
      description: 'Memories in motion',
      icon: Video,
      gradient: 'from-rose-gold to-pink-girly',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12 slide-up">
        <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4">
          Choose Your Adventure
        </h2>
        <p className="text-lg text-gray-300 font-inter">
          Three special surprises await you ✨
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="slide-up hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => onSelectSection(item.id)}
            >
              <div className={`p-8 rounded-2xl bg-gradient-to-br ${item.gradient} bg-opacity-20 backdrop-blur-sm border border-white/10 h-full`}>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-playfair font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 font-inter">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainMenu;
