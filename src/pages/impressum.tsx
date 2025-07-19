import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './impressum.module.css';

export default function Impressum(): JSX.Element {
  return (
    <Layout
      title="Impressum"
      description="Impressum für Max Rohrhirsch's Dokumentations-Website">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className={styles.heroTitle}>Impressum</h1>
        </div>
      </header>
      <main>
        <div className="container margin-vert--lg">
          <div className={styles.impressumContent}>
            <section className={styles.section}>
              <h2>Angaben gemäß § 5 TMG</h2>
              <div className={styles.contactInfo}>
                <p><strong>Max Rohrhirsch</strong></p>
                <p>Dualer Student für Angewandte Informatik</p>
                <p>
                  E-Mail: <a href="mailto:max.rohrhirsch2004@gmail.com">max.rohrhirsch2004@gmail.com</a>
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Kontakt</h2>
              <div className={styles.contactInfo}>
                <p>E-Mail: <a href="mailto:max.rohrhirsch2004@gmail.com">max.rohrhirsch2004@gmail.com</a></p>
                <p>GitHub: <a href="https://github.com/Max-Rohrhirsch" target="_blank" rel="noopener noreferrer">https://github.com/Max-Rohrhirsch</a></p>
                <p>LinkedIn: <a href="https://www.linkedin.com/in/max-rohrhirsch-77301a310/" target="_blank" rel="noopener noreferrer">LinkedIn Profil</a></p>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <div className={styles.contactInfo}>
                <p>Max Rohrhirsch</p>
                <p>E-Mail: <a href="mailto:max.rohrhirsch2004@gmail.com">max.rohrhirsch2004@gmail.com</a></p>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
                Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt 
                der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
                Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Haftung für Links</h2>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die 
                verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
                Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p>
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte 
                einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige 
                Links umgehend entfernen.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem 
                deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung 
                außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors 
                bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen 
                Gebrauch gestattet.
              </p>
              <p>
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte 
                Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem 
                auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei 
                Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Datenschutz</h2>
              <p>
                Diese Website wird über GitHub Pages gehostet und verwendet keine Cookies oder andere 
                Tracking-Technologien. Es werden keine personenbezogenen Daten gesammelt oder gespeichert, 
                außer den standardmäßigen Server-Logs von GitHub Pages.
              </p>
              <p>
                Weitere Informationen zum Datenschutz bei GitHub finden Sie in der 
                <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" 
                   target="_blank" rel="noopener noreferrer"> GitHub Privacy Policy</a>.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
