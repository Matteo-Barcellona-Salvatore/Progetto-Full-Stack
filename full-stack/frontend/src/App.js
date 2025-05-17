import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setMobileMenuOpen(false);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h2 className="logo">FULL-STACK-DEVELOPER</h2>
        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <li className={page === 'home' ? 'active' : ''} onClick={() => handlePageChange('home')}>Home</li>
          <li className={page === 'about' ? 'active' : ''} onClick={() => handlePageChange('about')}>About</li>
          <li className={page === 'skills' ? 'active' : ''} onClick={() => handlePageChange('skills')}>Skills</li>
          {!user && (
            <li className={page === 'auth' ? 'active' : ''} onClick={() => handlePageChange('auth')}>
              Accedi / Registrati
            </li>
          )}
          {user && (
            <>
              <li className={page === 'profile' ? 'active' : ''} onClick={() => handlePageChange('profile')}>
                Profilo
              </li>
              <li onClick={() => { setUser(null); setPage('home'); setMobileMenuOpen(false); }}>
                Logout
              </li>
            </>
          )}
        </ul>
      </nav>
      {page === 'home' && (
        <main className="home">
          <header className="hero">
            <h1>Benvenuto su <span className="highlight">sito!</span></h1>
            <p>La tua piattaforma collaborativa per sviluppatori e appassionati di tecnologia</p>
          </header>
          <section className="section about-me">
            <h3>Chi siamo</h3>
<p>
  La nostra è un'azienda full stack dinamica e innovativa, pensata per sviluppatori, ingegneri e creativi che vogliono collaborare, condividere conoscenze e realizzare progetti tecnologici d’avanguardia. Che tu sia esperto in frontend, backend, mobile o DevOps, il nostro ambiente ti connette con professionisti affini per costruire soluzioni concrete e moderne.
  Crediamo nell'open innovation e nell'apprendimento continuo, offrendo spazi dove ogni idea può diventare realtà.  
  I nostri team lavorano in sinergia utilizzando le tecnologie più recenti, come React, Node.js, Docker e Kubernetes.  
  Unisciti a noi per crescere professionalmente e contribuire a trasformare il futuro digitale.
</p>

          </section>
        </main>
      )}

      {page === 'about' && (
<section class="section" id="about">
  <h3>About</h3>
  <p>
    Questa piattaforma è stata creata per offrire un ambiente di crescita e collaborazione tra sviluppatori
    di tutti i livelli. Siamo appassionati di tecnologia e crediamo nel potere del lavoro di squadra.
    Ogni membro ha la possibilità di apprendere, condividere idee e contribuire a progetti reali.
    Promuoviamo la formazione continua attraverso risorse, mentorship e workshop tematici.
    Il nostro obiettivo è costruire una community solida dove ogni sviluppatore può esprimere il proprio potenziale.
  </p>
  <section class="section" id="skills">
  <h3>Linguaggi Supportati</h3>
  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
    <li>Python</li>
    <li>Java</li>
    <li>C++</li>
    <li>C#</li>
    <li>TypeScript</li>
    <li>PHP</li>
    <li>Go</li>
  </ul>
</section>

</section>

      )}
      {page === 'skills' && (
       <section className="section my-skills">
  <h3 >Le nostre competenze</h3>
  <ul className="skills-list">
    <li>Collaborazione e revisione del codice (Code Review & Pair Programming)</li>
    <li>Progetti open-source e real-world in evidenza</li>
    <li>Tutorial tecnici, guide pratiche e articoli di approfondimento</li>
    <li>Eventi di networking e meetups per sviluppatori</li>
    <li>Supporto per lo sviluppo frontend (React, Vue, HTML/CSS)</li>
    <li>Esperienza backend (Node.js, Java, Python, PHP, ecc.)</li>
    <li>DevOps e CI/CD con Docker, GitHub Actions, Jenkins</li>
    <li>Gestione di progetti con metodologie Agile e SCRUM</li>
    <li>Community attiva su Discord e forum di discussione tecnica</li>
  </ul>
</section>

      )}

      {page === 'auth' && !user && (
        <AuthForm onLogin={(userData) => { setUser(userData); setPage('home'); }} />
      )}

      {page === 'profile' && user && (
        <section className="welcome-user">
          <h2>Bentornato, <span className="username">{user.username}</span>!</h2>
          <p>Sei ora connesso. Esplora, impara e costruisci insieme a noi.</p>
        </section>
      )}
    </div>
  );
}

export default App;
