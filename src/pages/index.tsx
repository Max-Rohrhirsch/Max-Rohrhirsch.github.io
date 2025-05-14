import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useEffect, useState } from 'react';

export default function Home(): ReactNode {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <Layout title={`Max Rohrhirsch`}
                description="Portfolio of Max Rohrhirsch - Software Developer, Adventurer, and Maker">
            <main>
                <div className={`${styles.hero} ${isVisible ? styles.visible : ''}`}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.title}>Max Rohrhirsch</h1>
                        <p className={styles.subtitle}>Dual Student for Applied Computer Science | Maker | Adventurer</p>
                        <div className={styles.buttonContainer}>
                            <Link to="/docs/category/devop" className={`${styles.button} ${styles.primaryButton}`}>
                                View Documentation
                            </Link>
                            <Link to="/about" className={`${styles.button} ${styles.secondaryButton}`}>
                                About Me
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={styles.featuresSection}>
                    <h2 className={styles.sectionTitle}>What I Do</h2>
                    <div className={styles.features}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIconContainer}>
                                <i className="fas fa-laptop-code"></i>
                            </div>
                            <h3>Software Development</h3>
                            <p>Building applications and systems using a variety of programming languages and frameworks</p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIconContainer}>
                                <i className="fas fa-tools"></i>
                            </div>
                            <h3>DIY Projects</h3>
                            <p>Creating unique projects like hovercrafts and go-karts from scratch</p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIconContainer}>
                                <i className="fas fa-mountain"></i>
                            </div>
                            <h3>Adventure</h3>
                            <p>Exploring the world through hiking, climbing, and outdoor activities</p>
                            <Link to="/gallery" className={styles.featureLink}>
                                View Adventure Gallery <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={styles.projectsPreview}>
                    <h2 className={styles.sectionTitle}>Featured Projects</h2>
                    <div className={styles.projectsGrid}>
                        <div className={styles.projectCard}>
                            <div className={styles.projectImage} style={{backgroundImage: `url(${useBaseUrl('/img/pfadfinder.png')})`}}></div>
                            <div className={styles.projectContent}>
                                <h3>Pfadfinder Website</h3>
                                <p>WordPress administration for pfadis.org</p>
                                <Link to="/projects" className={styles.projectLink}>Learn More</Link>
                            </div>
                        </div>
                        <div className={styles.projectCard}>
                            <div className={styles.projectImage} style={{backgroundImage: `url(${useBaseUrl('/img/PXL_20240911_230537734.jpg')})`}}></div>
                            <div className={styles.projectContent}>
                                <h3>Giant Digital Clock</h3>
                                <p>Arduino-powered oversized 7-segment display</p>
                                <Link to="/projects" className={styles.projectLink}>Learn More</Link>
                            </div>
                        </div>
                        <div className={styles.projectCard}>
                            <div className={styles.projectImage} style={{backgroundImage: `url(${useBaseUrl('/img/PXL_20240911_235435085.jpg')})`}}></div>
                            <div className={styles.projectContent}>
                                <h3>DIY Hovercraft</h3>
                                <p>Self-built hovercraft from scratch</p>
                                <Link to="/projects" className={styles.projectLink}>Learn More</Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.viewAllContainer}>
                        <Link to="/projects" className={styles.viewAllButton}>
                            View All Projects
                        </Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
