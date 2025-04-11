import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home(): ReactNode {
    return (
        <Layout title={`Max Rohrhirsch`}
                description="Description will go into a meta tag in <head />">
            <main className={styles.main}>
                <div className={styles.imageContainer}></div>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>Max Rohrhirsch</h1>
                    <p className={styles.subtitle}>Software Developer | Adventurer</p>
                    <p className={styles.description}>
                        Hello! I’m Max, a passionate software developer who loves crafting innovative
                        and efficient solutions. Beyond the screen, I explore the world through hiking,
                        climbing, and embracing nature’s adventures.
                    </p>
                    <a className={styles.contactLink} href="mailto:max@rohrhirsch.tech">
                        Get in Touch
                    </a>
                </div>
            </main>
        </Layout>
    );
}
