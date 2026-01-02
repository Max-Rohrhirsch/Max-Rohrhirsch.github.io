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
    title: 'Scouts Website',
    description: 'Administration and maintenance of the official scouts website',
    image: '/img/pfadfinder.png',
    technologies: ['WordPress', 'PHP', 'CSS'],
    link: 'https://pfadis.org',
    gallery: ['/img/pfadfinder.png'],
    details: 'As an active member of the scouts, I administer our official website pfadis.org. The website runs on WordPress and provides information about our activities, events, and projects. Regular updates, plugin management, and security measures are part of my responsibilities, as well as training other members in content creation.'
  },
  {
    id: 2,
    title: 'Giant Digital Clock',
    description: 'Digital clock with Arduino and self-built 7-segment display. Can be turned on and off with remote control.',
    image: '/img/uhr.jpg',
    technologies: ['Arduino', 'C++', 'Electronics'],
    gallery: ['/img/uhr.jpg', '/img/uhr2.jpg'],
    details: 'This project combines hardware and software: I designed and built an oversized 7-segment display controlled by an Arduino microcontroller. The clock not only displays the current time but also has various display modes and can be controlled via an app. The segment housings were made with a 3D printer and equipped with custom LED strips.'
  },
  {
    id: 3,
    title: 'UMOC Chat',
    description: 'Chat application with Python backend for a study project',
    image: '/img/umoc.jpg',
    technologies: ['Python', 'Flask', 'WebSockets', 'Docker'],
    link: 'https://app.umoc.chat',
    gallery: ['/img/umoc.jpg'],
    details: 'UMOC Chat is a modern messaging platform that I developed as part of a study project. The application features a Python backend with Flask and WebSockets for real-time communication. The frontend was implemented with React and offers a responsive user interface. The entire application is packaged in Docker containers for easy deployment and scalability.'
  },
  {
    id: 4,
    title: 'Compiler with LLVM',
    description: 'Development of a custom compiler with Python and LLVM',
    image: '/img/compiler.png',
    technologies: ['Python', 'LLVM', 'Compiler Technology', 'Lexer/Parser'],
    gallery: [],
    details: 'In this project, I developed my own compiler for a custom programming language. The compiler uses Python for frontend components (lexer, parser, semantic analysis) and the LLVM framework for backend code generation. The compiler translates source code into LLVM IR and generates executable machine code for various target platforms.'
  },
  {
    id: 5,
    title: 'Minecraft Clone',
    description: 'Development of a Minecraft-like game with C# and Unity',
    image: '/img/minecraft.webp',
    technologies: ['C#', 'Unity', 'Shader Programming', '3D Modeling'],
    gallery: [],
    details: 'With C# and Unity, I developed my own Minecraft clone that replicates the basic mechanics of the original. The game features procedurally generated terrain, day-night cycles, a custom crafting system, and various biomes. Special focus was placed on optimizing chunk generation and efficient rendering of voxel data.'
  },
  {
    id: 6,
    title: 'Hovercraft',
    description: 'Design and construction of a functional hovercraft',
    image: '/img/hovercraft.png',
    technologies: ['Mechanics', 'Electronics', 'TIG Welding', 'Motor Control'],
    gallery: ['/img/hovercraft.png'],
    link: 'https://www.youtube.com/watch?v=xpajz0RjG_A&t=61s',
    details: 'One of my most ambitious projects was building a fully functional hovercraft. After extensive planning, I assembled all components myself and implemented electronic controls.'
  },
  {
    id: 7,
    title: 'Go-Kart',
    description: 'Development and construction of an electric go-kart',
    image: '/img/Gokart.png',
    technologies: ['Mechanics', 'Electrical Engineering', 'Welding', 'Battery Technology'],
    gallery: ['/img/Gokart.jpg', '/img/gokart.jpg'],
    details: 'With this project, I designed and built an electric go-kart from scratch. The frame was welded by hand, and I designed a battery system with motor control that provides a good balance between performance and runtime. The go-kart features a regenerative braking system and a digital display for important operating data.'
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
      title="Projects"
      description="Overview of my projects and developments">
      <header className={styles.projectsHeader}>
        <div className="container">
          <h1 className={styles.projectsTitle}>My Projects</h1>
          <p className={styles.projectsSubtitle}>
            From software development to electronics and mechanical constructions
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
            <h2 className={styles.techStackTitle}>My Technology Stack</h2>
            
            <div className={styles.techCategories}>
              <div className={styles.techCategory}>
                <h3 className={styles.techCategoryTitle}>
                  <i className="fas fa-code"></i> Languages
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
                  <i className="fas fa-server"></i> Backend & Databases
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
                  alt={`${activeProject.title} - Image ${index + 1}`} 
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
                  <i className="fas fa-external-link-alt"></i> View Project
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
