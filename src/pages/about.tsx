import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './about.module.css';

export default function About(): JSX.Element {
  return (
    <Layout
      title="About Me"
      description="Max Rohrhirsch - Dual Student for Applied Computer Science">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className={styles.profileContainer}>
            <div className={styles.profileImageWrapper}>
              <img src="/img/ich1.jpg" alt="Max Rohrhirsch" className={styles.profileImage} />
              <div className={styles.profileImageOverlay}></div>
            </div>
            <div className={styles.profileInfo}>
              <h1 className={styles.heroTitle}>Max Rohrhirsch</h1>
              <p className={styles.heroSubtitle}>Dual Student for Applied Computer Science</p>
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
              <h2 className={styles.sectionTitle}>About Me</h2>
              <p className={styles.aboutText}>
                I am a tinkerer and adventurer with a passion for technology and outdoor activities. 
                In addition to my dual studies in Applied Computer Science, I find time for exciting projects such as 
                building my own hovercraft and go-kart. In my free time, I am an avid 
                hiker and love bouldering and via ferratas.
              </p>
              <div className={styles.hobbiesContainer}>
                <div className={styles.hobbyCard}>
                  <div className={styles.hobbyIconWrapper}>
                    <i className="fas fa-mountain"></i>
                  </div>
                  <h3>Climbing & Bouldering</h3>
                  <p>Regular visits to the climbing gym and outdoor rock climbing in good weather</p>
                </div>
                <div className={styles.hobbyCard}>
                  <div className={styles.hobbyIconWrapper}>
                    <i className="fas fa-tools"></i>
                  </div>
                  <h3>Tinkering & Building</h3>
                  <p>From hovercrafts to go-karts - I love building things</p>
                </div>
                <div className={styles.hobbyCard}>
                  <div className={styles.hobbyIconWrapper}>
                    <i className="fas fa-hiking"></i>
                  </div>
                  <h3>Hiking</h3>
                  <p>Exploring remote trails and impressive landscapes</p>
                </div>
                <div className={styles.hobbyCard}>
                  <div className={styles.hobbyIconWrapper}>
                    <i className="fas fa-campground"></i>
                  </div>
                  <h3>Scouts</h3>
                  <p>Active member and administrator of the scouts website</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.skillsSection)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Skills & Knowledge</h2>
            
            <div className={styles.skillCategories}>
              <div className={styles.skillCategory}>
                <h3 className={styles.skillCategoryTitle}>Programming Languages</h3>
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
                <h3 className={styles.skillCategoryTitle}>Technologies & Frameworks</h3>
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
                <h3 className={styles.skillCategoryTitle}>Languages</h3>
                <div className={styles.skillList}>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>German</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '100%'}}></div>
                    </div>
                  </div>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>English</span>
                    <div className={styles.skillBar}>
                      <div className={styles.skillLevel} style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div className={styles.skillItem}>
                    <span className={styles.skillName}>Polish</span>
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
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineMarker}></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>Dual Studies in Applied Computer Science</h3>
                  <p className={styles.timelinePeriod}>2023 - Present</p>
                  <p className={styles.timelineDescription}>
                    Specialization in software development, algorithms, and IT systems.
                    Practical experience through company cooperation.
                  </p>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineMarker}></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>Technical High School Offenburg</h3>
                  <p className={styles.timelinePeriod}>2020 - 2023</p>
                  <p className={styles.timelineDescription}>
                    High school diploma with focus on Information Technology.
                  </p>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineMarker}></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>Secondary School</h3>
                  <p className={styles.timelinePeriod}>2016 - 2020</p>
                  <p className={styles.timelineDescription}>
                    Secondary school certificate with honors in Mathematics.
                    First programming experiences and participation in robotics club
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.travelSection)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Travel & Adventure</h2>
            <p className={styles.travelIntro}>
              Traveling is one of my greatest passions. From the majestic landscapes of Iceland 
              to the via ferratas in Austria - here are some impressions of my adventures:
            </p>
            
            <div className={styles.travelGallery}>
              <div className={styles.travelItem}>
                <img src="/img/island2.jpg" alt="Iceland" className={styles.travelImage} />
                <div className={styles.travelCaption}>Iceland - 2024</div>
              </div>
              <div className={styles.travelItem}>
                <img src="/img/norwegen1.jpg" alt="Norway" className={styles.travelImage} />
                <div className={styles.travelCaption}>Norway - 2023</div>
              </div>
              <div className={styles.travelItem}>
                <img src="/img/klettern_oesterreich.jpg" alt="Via Ferrata Austria" className={styles.travelImage} />
                <div className={styles.travelCaption}>Via Ferrata in Austria - 2024</div>
              </div>
              <div className={styles.travelItem}>
                <img src="/img/klettern_oesterreich2.jpg" alt="Via Ferrata Austria" className={styles.travelImage} />
                <div className={styles.travelCaption}>Via Ferrata in Austria - 2024</div>
              </div>
              <div className={styles.travelItem}>
                <img src="/img/klettern1.jpg" alt="Bouldering in France" className={styles.travelImage} />
                <div className={styles.travelCaption}>Bouldering in France - 2025</div>
              </div>
              <div className={styles.travelItem}>
                <img src="/img/fallschirm.png" alt="Skydiving" className={styles.travelImage} />
                <div className={styles.travelCaption}>Skydiving - 2024</div>
              </div>
              <div className={styles.travelItem}>
                <img src="/img/fallschirm2.png" alt="Skydiving" className={styles.travelImage} />
                <div className={styles.travelCaption}>Skydiving - 2024</div>
              </div>
              <div className={styles.travelItem}>
                <img src="/img/bungee.jpg" alt="Bungee Jumping" className={styles.travelImage} />
                <div className={styles.travelCaption}>Bungee Jumping - 2023</div>
              </div>
            </div>
            
            <div className={styles.travelMoreButton}>
              <button className={styles.pulsingButton}><a href="/gallery" style={{textDecoration: 'none', color: 'white'}}>Discover More Adventures</a></button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
