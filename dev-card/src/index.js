import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/**
 *

#4F4F4F

#C7C7C7
 */

const skillsData = [
  {
    id: 1,
    name: 'HTML',
    proficiency: 'beginner',
    color: '#B3B3B3',
  },
  {
    id: 2,
    name: 'CSS',
    proficiency: 'intermediate',
    color: '#8F8F8F',
  },
  {
    id: 3,
    name: 'JavaScript',
    proficiency: 'advanced',
    color: '#D1D1D1',
  },
  {
    id: 4,
    name: 'React.js',
    proficiency: 'beginner',
    color: '#6A6A6A',
  },
  {
    id: 5,
    name: 'Node.js',
    proficiency: 'intermediate',
    color: '#9C9C9C',
  },
];

function App() {
  return (
    <main className="container">
      <div className="card">
        <img src="emeka_ngumoha.png" alt="Chukwuemeka Ngumoha" />
        <div className="details">
          <h2>Chukwuemeka Ngumoha</h2>
          <p>
            An aspiring fullstack developer with a passion for Artificial
            intelligence, Machine learning and Data science. While I primarily
            do frontend work, I'm starting to dip my toes into backend
            development. When I'm not coding, I can be found reading, watching
            documentaries, playing chess or cooking.
          </p>
          <SkillList skillsData={skillsData} />
        </div>
      </div>
    </main>
  );
}

function SkillList({ skillsData }) {
  return (
    <ul className="skill-list">
      {skillsData.map((skill) => (
        <Skill skill={skill} />
      ))}
    </ul>
  );
}

function Skill({ skill }) {
  return (
    <li
      key={skill.id}
      className="skill"
      style={{ backgroundColor: skill.color }}
    >
      {skill.name}
      <SkillEmoji level={skill.proficiency} />
    </li>
  );
}

function SkillEmoji({ level }) {
  if (level === 'beginner') {
    return <span>👍🏾</span>;
  } else if (level === 'intermediate') {
    return <span>💪🏾</span>;
  } else {
    return <span>🔥</span>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
