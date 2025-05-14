import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './about.module.css';

export default function About(): JSX.Element {
  return (
    <Layout
      title="Über mich"
      description="Max Rohrhirsch - Dualer Student für Angewandte Informatik">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className={styles.profileContainer}>
            <div className={styles.profileImageWrapper}>
              <img src="/img/ich1.jpg" alt="Max Rohrhirsch" className={styles.profileImage} />
              <div className={styles.profileImageOverlay}></div>
            </div>
            <div className={styles.profileInfo}>
              <h1 className={styles.heroTitle}>Max Rohrhirsch</h1>
              <p className={styles.heroSubtitle}>Dualer Student für Angewandte Informatik</p>
              <div className={styles.socialIcons}>
                <a href="https://github.com/Max-Rohrhirsch" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/max-rohrhirsch-77301a310/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="mailto:max.rohrhirsch2004@gmail.com" className={styles.socialIcon}>
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.aboutMe}>
              <h2 className={styles.sectionTitle}>Über mich</h2>
              <p className={styles.aboutText}>
                Ich bin ein Tüftler und Abenteurer mit einer Leidenschaft für Technologie und Outdoor-Aktivitäten. 
                Neben meinem dualen Studium der Angewandten Informatik finde ich Zeit für spannende Projekte wie 
                den Bau eines eigenen Hovercrafts und eines Go-Karts. In meiner Freizeit bin ich begeisterter 
                Wanderer und liebe das Bouldern sowie Klettersteige.
              </p>
              <div className={styles.hobbiesContainer}>
                <div className={styles.hobbyCard}>
                  <div className={styles.hobbyIconWrapper}>
                    <i className="fas fa-mountain"></i>
                  </div>
                  <h3>Klettern & Bouldern</h3>
                  <p>Regelmäßig in der Kletterhalle und bei gutem Wetter draußen am Fels</p>
                </div>
                <div className={styles.hobbyCard}>
                  <div className={styles.hobbyIconWrapper}>
                    <i className="fas fa-tools"></i>
                  </div>
                  <h3>Tüfteln & Bauen</h3>
                  <p>Vom Hovercraft bis zum Go-Kart - ich liebe es, Dinge zu konstruieren</p>
                </div>
                <div className={styles.hobbyCard}>
                  <div className={styles.hobbyIconWrapper}>
                    <i className="fas fa-hiking"></i>
                  </div>
                  <h3>Wandern</h3>
                  <p>Erkundung abgelegener Pfade und beeindruckender Landschaften</p>
                </div>
                <div className={styles.hobbyCard}>
                  <div className={styles.hobbyIconWrapper}>
                    <i className="fas fa-campground"></i>
                  </div>
                  <h3>Pfadfinder</h3>
                  <p>Aktives Mitglied und Administrator der Pfadfinder-Website</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.skillsSection)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Fähigkeiten & Kenntnisse</h2>
            
            <div className={styles.skillCategories}>
              <div className={styles.skillCategory}>
                <h3 className={styles.skillCategoryTitle}>Programmiersprachen</h3>
                <div className={styles.skillList}>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>Python</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>Java</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>C#</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '60%'}}></div>
                    </div>
                  </div>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>JavaScript/TypeScript</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>C/C++</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '50%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.skillCategory}>
                <h3 className={styles.skillCategoryTitle}>Technologien & Frameworks</h3>
                <div className={styles.skillList}>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>Unity</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '70%'}}></div>
                    </div>
                  </div>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>Flask</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>LLVM</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '50%'}}></div>
                    </div>
                  </div>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>Arduino</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '80%'}}></div>
                    </div>
                  </div>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>Docker</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '75%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.skillCategory}>
                <h3 className={styles.skillCategoryTitle}>Sprachen</h3>
                <div className={styles.skillList}>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>Deutsch</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '100%'}}></div>
                    </div>
                  </div>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>Englisch</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>Polnisch</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '40%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Bildungsweg</h2>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineMarker}></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>Duales Studium Angewandte Informatik</h3>
                  <p className={styles.timelinePeriod}>2023 - Heute</p>
                  <p className={styles.timelineDescription}>
                    Vertiefung in Softwareentwicklung, Algorithmen und IT-Systeme.
                    Praktische Erfahrung durch Unternehmenskooperation.
                  </p>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineMarker}></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>Technisches Gymnasium Offenburg</h3>
                  <p className={styles.timelinePeriod}>2020 - 2023</p>
                  <p className={styles.timelineDescription}>
                    Abitur mit Schwerpunkt Informationstechnik.
                  </p>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineMarker}></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>Realschule</h3>
                  <p className={styles.timelinePeriod}>2016 - 2020</p>
                  <p className={styles.timelineDescription}>
                    Mittlere Reife mit Auszeichnung in Mathematik.
                    Erste Programmiererfahrungen und Teilnahme an Robotik-AG
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.travelSection)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Reisen & Abenteuer</h2>
            <p className={styles.travelIntro}>
              Das Reisen ist eine meiner größten Leidenschaften. Von den majestätischen Landschaften Islands 
              bis zu den Klettersteigen in Österreich - hier sind einige Eindrücke meiner Abenteuer:
            </p>
            
            <div className={styles.travelGallery}>
              <div className={styles.travelItem}>
                <img src="/img/island2.jpg" alt="Island" className={styles.travelImage} />
                <div className={styles.travelCaption}>Island - 2024</div>
              </div>
              <div className={styles.travelItem}>
                <img src="/img/norwegen1.jpg" alt="Norwegen" className={styles.travelImage} />
                <div className={styles.travelCaption}>Norwegen - 2023</div>
              </div>
              <div className={styles.travelItem}>
                <img src="/img/klettern_oesterreich.jpg" alt="Klettersteig Österreich" className={styles.travelImage} />
                <div className={styles.travelCaption}>Klettersteig in Österreich - 2024</div>
              </div>
              <div className={styles.travelItem}>
                <img src="/img/klettern_oesterreich2.jpg" alt="Klettersteig Österreich" className={styles.travelImage} />
                <div className={styles.travelCaption}>Klettersteig in Österreich - 2024</div>
              </div>
              <div className={styles.travelItem}>
                <img src="/img/klettern1.jpg" alt="Bouldern in Frankreich" className={styles.travelImage} />
                <div className={styles.travelCaption}>Bouldern in Frankreich - 2025</div>
              </div>
              <div className={styles.travelItem}>
                <img src="/img/fallschirm.png" alt="Fallschirm springen" className={styles.travelImage} />
                <div className={styles.travelCaption}>Fallschirm springen - 2024</div>
              </div>
              <div className={styles.travelItem}>
                <img src="/img/fallschirm2.png" alt="Fallschirm springen" className={styles.travelImage} />
                <div className={styles.travelCaption}>Fallschirm springen - 2024</div>
              </div>
              <div className={styles.travelItem}>
                <img src="/img/bungee.jpg" alt="Bungee Springen" className={styles.travelImage} />
                <div className={styles.travelCaption}>Bungee Springen - 2023</div>
              </div>
            </div>
            
            <div className={styles.travelMoreButton}>
              <button className={styles.pulsingButton}><a href="/gallery" style={{textDecoration: 'none', color: 'white'}}>Mehr Abenteuer entdecken</a></button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
