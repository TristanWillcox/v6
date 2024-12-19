import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users, MessageSquare, Video, BookOpen, Link as LinkIcon, Settings, Music2, Paintbrush } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

const collectives = [
  {
    id: 1,
    name: "Sound Designers United",
    members: 128,
    activeProjects: 5,
    description: "A collective of sound designers and musicians collaborating on various audio projects.",
    logo: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80",
    color: "147, 51, 234" // Purple
  },
  {
    id: 2,
    name: "Visual Storytellers",
    members: 94,
    activeProjects: 3,
    description: "Artists and writers working together to create compelling visual narratives.",
    logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
    color: "59, 130, 246" // Blue
  },
  {
    id: 3,
    name: "Digital Art Pioneers",
    members: 156,
    activeProjects: 7,
    description: "Pushing the boundaries of digital art through collaborative experimentation.",
    logo: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80",
    color: "236, 72, 153" // Pink
  }
];

type Tab = 'overview' | 'chat' | 'voice' | 'projects' | 'collectiveProjects';
type SubTab = 'visual' | 'audio' | 'story';

export function Collective() {
  const { id } = useParams();
  const { activeColor } = useProject();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [activeSubTab, setActiveSubTab] = useState<SubTab | null>(null);
  const collective = collectives.find(c => c.id === Number(id));

  if (!collective) return <div>Collective not found</div>;

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: BookOpen },
    { id: 'chat' as Tab, label: 'Chat', icon: MessageSquare },
    { id: 'voice' as Tab, label: 'Voice Chat', icon: Video },
    { id: 'projects' as Tab, label: 'Projects', icon: Users },
    { id: 'collectiveProjects' as Tab, label: 'Collective Projects', icon: Paintbrush },
  ];

  const subTabs = [
    { id: 'visual' as SubTab, label: 'Visual', icon: Paintbrush },
    { id: 'audio' as SubTab, label: 'Audio', icon: Music2 },
    { id: 'story' as SubTab, label: 'Story', icon: BookOpen },
  ];

  return (
    <div className="space-y-8">
      <div className="relative h-64 rounded-xl overflow-hidden">
        <img
          src={collective.logo}
          alt={collective.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-light mb-2">{collective.name}</h1>
          <p className="text-zinc-300">{collective.description}</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-zinc-800 pb-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id);
              if (id !== 'collectiveProjects') {
                setActiveSubTab(null);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === id ? 'text-white' : 'text-zinc-400 hover:text-white'
            }`}
            style={{
              backgroundColor: activeTab === id
                ? activeColor
                  ? `rgba(${activeColor}, 0.1)`
                  : 'rgba(255, 255, 255, 0.05)'
                : 'transparent'
            }}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'collectiveProjects' && (
        <div className="flex gap-4 border-b border-zinc-800 pb-4">
          {subTabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSubTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeSubTab === id ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
              style={{
                backgroundColor: activeSubTab === id
                  ? activeColor
                    ? `rgba(${activeColor}, 0.1)`
                    : 'rgba(255, 255, 255, 0.05)'
                  : 'transparent'
              }}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Collective Overview</h2>
                <p className="text-zinc-400">This is the overview of the collective. You can add more details here.</p>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="space-y-6">
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Chat</h2>
                <p className="text-zinc-400">This is the chat section of the collective. You can add more details here.</p>
              </div>
            </div>
          )}

          {activeTab === 'voice' && (
            <div className="space-y-6">
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Voice Chat</h2>
                <p className="text-zinc-400">This is the voice chat section of the collective. You can add more details here.</p>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Projects</h2>
                <p className="text-zinc-400">This is the projects section of the collective. You can add more details here.</p>
              </div>
            </div>
          )}

          {activeTab === 'collectiveProjects' && activeSubTab === 'visual' && (
            <div className="space-y-6">
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Visual Assets</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-video bg-zinc-800 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'collectiveProjects' && activeSubTab === 'audio' && (
            <div className="space-y-6">
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Audio Tracks</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg">
                      <div className="w-12 h-12 bg-zinc-700 rounded-lg flex items-center justify-center">
                        <Music2 className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="h-4 w-1/3 bg-zinc-700 rounded mb-2"></div>
                        <div className="h-2 w-full bg-zinc-700 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'collectiveProjects' && activeSubTab === 'story' && (
            <div className="space-y-6">
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Story Elements</h2>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-4 bg-zinc-800/50 rounded-lg">
                      <div className="h-4 w-1/4 bg-zinc-700 rounded mb-2"></div>
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-zinc-700 rounded"></div>
                        <div className="h-2 w-5/6 bg-zinc-700 rounded"></div>
                        <div className="h-2 w-4/6 bg-zinc-700 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div
            className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
            style={{
              borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
            }}
          >
            <h2 className="text-xl font-light mb-4">Collective Links</h2>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-white">
                <LinkIcon className="h-4 w-4" />
                Collective Documentation
              </a>
              <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-white">
                <LinkIcon className="h-4 w-4" />
                Resource Library
              </a>
            </div>
          </div>

          <div
            className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
            style={{
              borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
            }}
          >
            <h2 className="text-xl font-light mb-4">Collective Settings</h2>
            <button className="flex items-center gap-2 text-zinc-400 hover:text-white">
              <Settings className="h-4 w-4" />
              Manage Collective
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
