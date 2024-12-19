
      import React, { useState } from 'react';
      import { Search, Filter, Compass } from 'lucide-react';
      import { useProject } from '../contexts/ProjectContext';
      import { ProjectCard } from '../components/ProjectCard';

      const categories = [
        "All Projects", "Music", "Visual Art", "Writing", "Film", "Photography", "Game Dev"
      ];

      export function Explore() {
        const { activeColor, projects } = useProject();
        const [activeCategory, setActiveCategory] = useState("All Projects");

        const filteredProjects = activeCategory === "All Projects"
          ? projects
          : projects.filter(project => project.tags.includes(activeCategory));

        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Compass className="h-8 w-8" />
                <h1 className="text-3xl font-light tracking-wider">Explore Projects</h1>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-700 ${
                    activeCategory === category ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: activeCategory === category
                      ? activeColor
                        ? `rgba(${activeColor}, 0.1)`
                        : 'rgba(255, 255, 255, 0.05)'
                      : 'transparent',
                    boxShadow: activeCategory === category && activeColor
                      ? `0 0 20px rgba(${activeColor}, 0.1)`
                      : 'none'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  onHover={() => {}}
                  onLeave={() => {}}
                  isActive={false}
                  font={project.font}
                />
              ))}
            </div>
          </div>
        );
      }

