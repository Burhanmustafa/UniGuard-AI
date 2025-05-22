import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    sleep_hours: '',
    study_hours: '',
    expenses: '',
    social_events: '',
    mood_score: ''
  });

  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);



  const toggleTheme = () => setDarkMode(prev => !prev);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const startTime = Date.now();

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      // Calculate how long the request took
      const elapsed = Date.now() - startTime;
      const remainingTime = 3000 - elapsed;

      // Wait if needed to make total duration at least 3 seconds
      if (remainingTime > 0) {
        setTimeout(() => {
          setResult(data);

          // Animated progress bar fill
          let current = 0;
          const target = data.burnout_score * 100;
          const interval = setInterval(() => {
            current += 1;
            setProgress(current);
            if (current >= target) clearInterval(interval);
          }, 15);

          setLoading(false);
        }, remainingTime);
      } else {
        setResult(data);

        let current = 0;
        const target = data.burnout_score * 100;
        const interval = setInterval(() => {
          current += 1;
          setProgress(current);
          if (current >= target) clearInterval(interval);
        }, 15);

        setLoading(false);
      }
    } catch (err) {
      console.error("API Error:", err);
      setResult({ error: "Server error or Flask not running." });
      setLoading(false);
    }
  };


  return (
    <div className={darkMode ? 'App dark' : 'App'}>
      <button onClick={toggleTheme} className="theme-toggle">
        Switch to {darkMode ? 'Light' : 'Dark'} Mode
      </button>

      <h1>🧠 UniGuard Burnout Checker</h1>
      <form onSubmit={handleSubmit}>
        {['sleep_hours', 'study_hours', 'expenses', 'social_events', 'mood_score'].map((field) => (
          <div key={field}>
            <label>{field.replace('_', ' ')}:</label>
            <input
              type="number"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Check My Risk</button>
      </form>

      {loading && (
        <div className="pulsing-brain">
          <span role="img" aria-label="brain">🧠</span>
          <p>Analyzing your burnout risk...</p>
        </div>
      )}


      {result && !result.error && (
        <div className="risk-bar">
          <p style={{ marginBottom: '5px' }}>🔥 Burnout Risk Level: {Math.round(progress)}%</p>
          <div className="bar">
            <div
              className="fill"
              style={{
                width: `${progress}%`,
                backgroundColor:
                  progress >= 70
                    ? '#e74c3c'
                    : progress >= 40
                      ? '#f1c40f'
                      : '#2ecc71'
              }}
            ></div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
