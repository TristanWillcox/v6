
      import React, { useState } from 'react';
      import { useParams } from 'react-router-dom';
      import { Users, MessageSquare, Calendar, Link as LinkIcon, Settings, Music2, Paintbrush, BookOpen, Video } from 'lucide-react';
      import { useProject } from '../contexts/ProjectContext';

      type Tab = 'overview' | 'hangout' | 'team' | 'contributions' | 'board';
      type SubTab = 'visual' | 'audio' | 'story';

      export function Project() {
        const { id } = useParams();
        const { activeColor, projects } = useProject();
        const [activeTab, setActiveTab] = useState<Tab>('overview');
        const [activeSubTab, setActiveSubTab] = useState<SubTab | null>(null);
        const project = projects.find(p => p.id === Number(id));

        if (!project) return <div>Project not found</div>;

        const tabs = [
          { id: 'overview' as Tab, label: 'Overview', icon: Calendar },
          { id: 'hangout' as Tab, label: 'Hangout', icon: Video },
          { id: 'team' as Tab, label: 'Team', icon: Users },
          { id: 'contributions' as Tab, label: 'Contributions', icon: Paintbrush },
          { id: 'board' as Tab, label: 'Message Board', icon: MessageSquare },
        ];

        const subTabs = [
          { id: 'visual' as SubTab, label: 'Visual', icon: Paintbrush },
          { id: 'audio' as SubTab, label: 'Audio', icon: Music2 },
          { id: 'story' as SubTab, label: 'Story', icon: BookOpen },
        ];

        const calculateProgress = (milestones) => {
          const completed = milestones.filter(milestone => milestone.completed).length;
          return (completed / milestones.length) * 100;
        };

        return (
          <div className="space-y-8">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img
                src={project.coverImage || project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h1 className="text-4xl font-light mb-2">{project.title}</h1>
                <p className="text-zinc-300">{project.description}</p>
              </div>
            </div>

            <div className="flex gap-4 border-b border-zinc-800 pb-4">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    if (id !== 'contributions') {
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
                      : 'transparent',
                    boxShadow: activeTab === id && activeColor
                      ? `0 0 20px rgba(${activeColor}, 0.1)`
                      : 'none'
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              ))}
            </div>

            {activeTab === 'contributions' && (
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
                        : 'transparent',
                      boxShadow: activeSubTab === id && activeColor
                        ? `0 0 20px rgba(${activeColor}, 0.1)`
                        : 'none'
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
                      <h2 className="text-xl font-light mb-4">Project Overview</h2>
                      <div className="flex flex-col space-y-2">
                        {project.milestones.map((milestone, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className={`text-sm ${milestone.completed ? 'text-green-500' : 'text-zinc-400'}`}>
                              {milestone.name}
                            </span>
                            <span className={`text-sm ${milestone.completed ? 'text-green-500' : 'text-zinc-400'}`}>
                              {milestone.completed ? 'Completed' : 'In Progress'}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-2.5 mt-4">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${calculateProgress(project.milestones)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'hangout' && (
                  <div className="space-y-6">
                    <div
                      className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                      style={{
                        borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                      }}
                    >
                      <h2 className="text-xl font-light mb-4">Project Hangout</h2>
                      <p className="text-zinc-400">This is the hangout section of the project. You can add more details here.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'team' && (
                  <div className="space-y-6">
                    <div
                      className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                      style={{
                        borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                      }}
                    >
                      <h2 className="text-xl font-light mb-4">Project Team</h2>
                      <p className="text-zinc-400">This is the team section of the project. You can add more details here.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'contributions' && activeSubTab === 'visual' && (
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

                {activeTab === 'contributions' && activeSubTab === 'audio' && (
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

                {activeTab === 'contributions' && activeSubTab === 'story' && (
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
                {activeTab === 'board' && (
                  <div className="space-y-6">
                    <div
                      className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                      style={{
                        borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                      }}
                    >
                      <h2 className="text-xl font-light mb-4">Message Board</h2>
                      <p className="text-zinc-400">This is the message board for the project. You can add more details here.</p>
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
                  <h2 className="text-xl font-light mb-4">Project Links</h2>
                  <div className="space-y-3">
                    <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-white">
                      <LinkIcon className="h-4 w-4" />
                      Project Documentation
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
                  <h2 className="text-xl font-light mb-4">Project Settings</h2>
                  <button className="flex items-center gap-2 text-zinc-400 hover:text-white">
                    <Settings className="h-4 w-4" />
                    Manage Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }

