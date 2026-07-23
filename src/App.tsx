/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CustomCursor } from '@/src/components/CustomCursor';
import { Navbar } from '@/src/components/Navbar';
import { Footer } from '@/src/components/Footer';
import { Hero } from '@/src/sections/Hero';
import { Skills } from '@/src/sections/Skills';
import { Portfolio } from '@/src/sections/Portfolio';
import { Experience } from '@/src/sections/Experience';
import { Contact } from '@/src/sections/Contact';
import { LanguageProvider } from '@/src/context/LanguageContext';
import { ProjectsProvider } from '@/src/context/ProjectsContext';

export default function App() {
  return (
    <LanguageProvider>
      <ProjectsProvider>
        <div className="relative min-h-screen bg-[#0F172A] text-[#F8FAFC] selection:bg-[#6366F1] selection:text-white font-sans transition-colors duration-300">
          <CustomCursor />
          <Navbar />
          
          <main>
            <Hero />
            <Skills />
            <Portfolio />
            <Experience />
            <Contact />
          </main>

          <Footer />
        </div>
      </ProjectsProvider>
    </LanguageProvider>
  );
}

