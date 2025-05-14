import React, { useState } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './projects.module.css';

interface ProjectData {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  gallery: string[];
  details: string;
}

const projects: ProjectData[] = [
  {
    id: 1,
    title: 'Pfadfinderwebseite',
    description: 'Administration und Wartung der offiziellen Pfadfinderwebseite',
    image: '/img/pfadfinder.png',
    technologies: ['WordPress', 'PHP', 'CSS'],
    link: 'https://pfadis.org',
    gallery: ['/img/pfadfinder.png'],
    details: 'Als aktives Mitglied der Pfadfinder administriere ich unsere offizielle Website pfadis.org. Die Website wird mit WordPress betrieben und bietet Informationen über unsere Aktivitäten, Veranstaltungen und Projekte. Regelmäßige Updates, Plugin-Management und Sicherheitsmaßnahmen gehören zu meinen Aufgaben, ebenso wie die Schulung anderer Mitglieder in der Content-Erstellung.'
  },
  {
    id: 2,
    title: 'Digitale Riesenuhren',
    description: 'Digitale Uhr mit Arduino und selbstgebauter 7-Segment-Anzeige. Kann mit Fernbedinung an und aus geschalten werden.',
    image: '/img/DSC09571.jpg',
    technologies: ['Arduino', 'C++', 'Elektronik'],
    gallery: ['/img/DSC09571.jpg', '/img/DSC09571.jpg', '/img/ich2.jpg'],
    details: 'Dieses Projekt kombiniert Hardware und Software: Ich habe eine übergroße 7-Segment-Anzeige entworfen und gebaut, die von einem Arduino-Mikrocontroller gesteuert wird. Die Uhr zeigt nicht nur die aktuelle Zeit an, sondern verfügt auch über verschiedene Display-Modi und kann über eine App gesteuert werden. Die Gehäuse der Segmente wurden mit einem 3D-Drucker hergestellt und mit selbstentwickelten LED-Streifen ausgestattet.'
  },
  {
    id: 3,
    title: 'UMOC Chat',
    description: 'Chat-Anwendung mit Python-Backend für ein Studienprojekt',
    image: '/img/PXL_20240911_230537734.jpg',
    technologies: ['Python', 'Flask', 'WebSockets', 'Docker'],
    link: 'https://app.umoc.chat',
    gallery: ['/img/PXL_20240911_230537734.jpg', '/img/ich2.jpg', '/img/ich2.jpg'],
    details: 'UMOC Chat ist eine moderne Messaging-Plattform, die ich als Teil eines Studienprojekts entwickelt habe. Die Anwendung verfügt über ein Python-Backend mit Flask und WebSockets für Echtzeit-Kommunikation. Das Frontend wurde mit React implementiert und bietet eine responsive Benutzeroberfläche. Die gesamte Anwendung ist in Docker-Containern verpackt für einfache Bereitstellung und Skalierbarkeit.'
  },
  {
    id: 4,
    title: 'Compiler mit LLVM',
    description: 'Entwicklung eines eigenen Compilers mit Python und LLVM',
    image: '/img/compiler.png',
    technologies: ['Python', 'LLVM', 'Compiler-Technologie', 'Lexer/Parser'],
    gallery: [],
    details: 'In diesem Projekt habe ich einen eigenen Compiler für eine selbst entworfene Programmiersprache entwickelt. Der Compiler nutzt Python für die Frontend-Komponenten (Lexer, Parser, semantische Analyse) und das LLVM-Framework für die Backend-Code-Generierung. Der Compiler übersetzt den Quellcode in LLVM IR und erzeugt daraus ausführbaren Maschinencode für verschiedene Zielplattformen.'
  },
  {
    id: 5,
    title: 'Minecraft-Klon',
    description: 'Entwicklung eines Minecraft-ähnlichen Spiels mit C# und Unity',
    image: '/img/Ich zeugnis.jpg',
    technologies: ['C#', 'Unity', 'Shader-Programmierung', '3D-Modellierung'],
    gallery: ['/img/Ich zeugnis.jpg', '/img/DSC09571.jpg', '/img/ich2.jpg'],
    details: 'Mit C# und Unity habe ich einen eigenen Minecraft-Klon entwickelt, der die grundlegenden Mechaniken des Originals nachbildet. Das Spiel verfügt über ein prozedural generiertes Terrain, Tag-Nacht-Wechsel, ein eigenes Crafting-System und verschiedene Biome. Besonderer Fokus lag auf der Optimierung der Chunk-Generierung und dem effizienten Rendering von Voxel-Daten.'
  },
  {
    id: 6,
    title: 'Hovercraft',
    description: 'Design und Bau eines funktionstüchtigen Hovercrafts',
    image: '/img/ich2.jpg',
    technologies: ['Mechanik', 'Elektronik', 'CAD', 'Motorsteuerung'],
    gallery: ['/img/ich2.jpg', '/img/ich2.jpg', '/img/ich2.jpg'],
    details: 'Eines meiner ambitioniertesten Projekte war der Bau eines voll funktionsfähigen Hovercrafts. Nach umfangreicher Planung und CAD-Modellierung habe ich alle Komponenten selbst zusammengebaut und eine elektronische Steuerung implementiert. Das Hovercraft erreicht eine beachtliche Geschwindigkeit und kann über verschiedene Oberflächen gleiten. Die größte Herausforderung war die Optimierung des Luftkissendesigns für maximale Effizienz.'
  },
  {
    id: 7,
    title: 'Go-Kart',
    description: 'Entwicklung und Bau eines elektrischen Go-Karts',
    image: '/img/ich2.jpg',
    technologies: ['Mechanik', 'Elektrotechnik', 'Schweißen', 'Batterietechnik'],
    gallery: ['/img/ich2.jpg', '/img/ich2.jpg', '/img/ich2.jpg'],
    details: 'Mit diesem Projekt habe ich ein elektrisches Go-Kart von Grund auf neu konstruiert und gebaut. Der Rahmen wurde selbst geschweißt, und ich habe ein Batteriesystem mit Motorsteuerung entworfen, das eine gute Balance zwischen Leistung und Laufzeit bietet. Das Go-Kart verfügt über ein regeneratives Bremssystem und eine digitale Anzeige für wichtige Betriebsdaten.'
  }
];

export default function Projects(): JSX.Element {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectModal = (project: ProjectData) => {
    setActiveProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <Layout
      title="Projekte"
      description="Übersicht meiner Projekte und Entwicklungen">
      <header className={styles.projectsHeader}>
        <div className="container">
          <h1 className={styles.projectsTitle}>Meine Projekte</h1>
          <p className={styles.projectsSubtitle}>
            Von Softwareentwicklung über Elektronik bis hin zu mechanischen Konstruktionen
          </p>
        </div>
      </header>

      <main>
        <section className={styles.projectsGrid}>
          <div className="container">
            <div className={styles.projectCards}>
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className={styles.projectCard}
                  onClick={() => openProjectModal(project)}
                >
                  <div className={styles.projectImageContainer}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className={styles.projectImage}
                    />
                    <div className={styles.projectOverlay}>
                      <div className={styles.projectTechnologies}>
                        {project.technologies.map((tech, index) => (
                          <span key={index} className={styles.techBadge}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.techStackSection}>
          <div className="container">
            <h2 className={styles.techStackTitle}>Mein Technologie-Stack</h2>
            
            <div className={styles.techCategories}>
              <div className={styles.techCategory}>
                <h3 className={styles.techCategoryTitle}>
                  <i className="fas fa-code"></i> Sprachen
                </h3>
                <div className={styles.techItems}>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                    <span>Python</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" />
                    <span>Java</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" />
                    <span>C#</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
                    <span>JavaScript</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" />
                    <span>TypeScript</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C" />
                    <span>C</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.techCategory}>
                <h3 className={styles.techCategoryTitle}>
                  <i className="fas fa-server"></i> Backend & Datenbanken
                </h3>
                <div className={styles.techItems}>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" />
                    <span>Flask</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" alt="Django" />
                    <span>Django</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />
                    <span>MySQL</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" />
                    <span>PostgreSQL</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                    <span>MongoDB</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.techCategory}>
                <h3 className={styles.techCategoryTitle}>
                  <i className="fas fa-laptop-code"></i> Frontend & UI
                </h3>
                <div className={styles.techItems}>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                    <span>React</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />
                    <span>HTML5</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
                    <span>CSS3</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" alt="Angular" />
                    <span>Angular</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg" alt="Wordpress CSS" />
                    <span>Wordpress</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.techCategory}>
                <h3 className={styles.techCategoryTitle}>
                  <i className="fas fa-tools"></i> Tools & Hardware
                </h3>
                <div className={styles.techItems}>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" alt="Arduino" />
                    <span>Arduino</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" alt="Raspberry Pi" />
                    <span>Raspberry Pi</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" />
                    <span>Git</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" />
                    <span>VS Code</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" alt="Unity" />
                    <span>Unity</span>
                  </div>
                  <div className={styles.techItem}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
                    <span>Docker</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Project Modal */}
      {isModalOpen && activeProject && (
        <div className={styles.modalOverlay} onClick={closeProjectModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeProjectModal}>
              <i className="fas fa-times"></i>
            </button>
            
            <h2 className={styles.modalTitle}>{activeProject.title}</h2>
            
            <div className={styles.modalGallery}>
              {activeProject.gallery.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`${activeProject.title} - Bild ${index + 1}`} 
                  className={styles.modalImage}
                />
              ))}
            </div>
            
            <div className={styles.modalTechStack}>
              {activeProject.technologies.map((tech, index) => (
                <span key={index} className={styles.modalTechBadge}>{tech}</span>
              ))}
            </div>
            
            <div className={styles.modalDescription}>
              <p>{activeProject.details}</p>
            </div>
            
            {activeProject.link && (
              <div className={styles.modalLinks}>
                <a 
                  href={activeProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.modalLink}
                >
                  <i className="fas fa-external-link-alt"></i> Projekt ansehen
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
