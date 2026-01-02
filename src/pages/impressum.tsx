import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './impressum.module.css';

export default function Impressum(): JSX.Element {
  return (
    <Layout
      title="Imprint"
      description="Imprint for Max Rohrhirsch's Documentation Website">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className={styles.heroTitle}>Imprint</h1>
        </div>
      </header>
      <main>
        <div className="container margin-vert--lg">
          <div className={styles.impressumContent}>
            <section className={styles.section}>
              <h2>Information according to § 5 TMG</h2>
              <div className={styles.contactInfo}>
                <p><strong>Max Rohrhirsch</strong></p>
                <p>Dual Student for Applied Computer Science</p>
                <p>
                  E-Mail: <a href="mailto:max.rohrhirsch2004@gmail.com">max.rohrhirsch2004@gmail.com</a>
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Contact</h2>
              <div className={styles.contactInfo}>
                <p>E-Mail: <a href="mailto:max.rohrhirsch2004@gmail.com">max.rohrhirsch2004@gmail.com</a></p>
                <p>GitHub: <a href="https://github.com/Max-Rohrhirsch" target="_blank" rel="noopener noreferrer">https://github.com/Max-Rohrhirsch</a></p>
                <p>LinkedIn: <a href="https://www.linkedin.com/in/max-rohrhirsch-77301a310/" target="_blank" rel="noopener noreferrer">LinkedIn Profil</a></p>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Responsible for content according to § 55 Abs. 2 RStV</h2>
              <div className={styles.contactInfo}>
                <p>Max Rohrhirsch</p>
                <p>E-Mail: <a href="mailto:max.rohrhirsch2004@gmail.com">max.rohrhirsch2004@gmail.com</a></p>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Liability for Content</h2>
              <p>
                As a service provider, we are responsible for our own content on these pages according to § 7 para.1 TMG 
                and general laws. According to §§ 8 to 10 TMG, we are not obligated as a service provider to monitor 
                transmitted or stored third-party information or to investigate circumstances that indicate 
                illegal activity.
              </p>
              <p>
                Obligations to remove or block the use of information according to general laws remain unaffected. 
                However, liability in this regard is only possible from the time of knowledge of a specific infringement. 
                Upon becoming aware of corresponding legal violations, we will remove this content immediately.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Liability for Links</h2>
              <p>
                Our website contains links to external websites of third parties over whose content we have no influence. 
                Therefore, we cannot assume any liability for this external content. The respective provider or operator 
                of the linked pages is always responsible for their content. The linked pages were checked for possible 
                legal violations at the time of linking. Illegal content was not recognizable at the time of linking.
              </p>
              <p>
                However, permanent monitoring of the content of linked pages is not reasonable without concrete evidence 
                of a legal violation. Upon becoming aware of legal violations, we will remove such links immediately.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Copyright</h2>
              <p>
                The content and works created by the site operators on these pages are subject to 
                German copyright law. The reproduction, editing, distribution, and any kind of use 
                outside the limits of copyright law require the written consent of the respective author 
                or creator. Downloads and copies of this site are only permitted for private, non-commercial use.
              </p>
              <p>
                Insofar as the content on this site was not created by the operator, the copyrights of third parties 
                are respected. In particular, third-party content is identified as such. Should you nevertheless become 
                aware of a copyright infringement, we ask you to notify us accordingly. Upon becoming aware of legal 
                violations, we will remove such content immediately.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Data Privacy</h2>
              <p>
                This website is hosted via GitHub Pages and does not use cookies or other 
                tracking technologies. No personal data is collected or stored, 
                except for the standard server logs of GitHub Pages.
              </p>
              <p>
                For more information about data protection at GitHub, please see the 
                <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" 
                   target="_blank" rel="noopener noreferrer"> GitHub Privacy Policy</a>.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Dispute Resolution</h2>
              <p>
                The European Commission provides a platform for online dispute resolution (OS): 
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p>
                We are neither willing nor obliged to participate in dispute resolution proceedings before a 
                consumer arbitration board.
              </p>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
