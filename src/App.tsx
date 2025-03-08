import React, { useState } from 'react';
import './App.css';
import ControllerDisplay from './components/ControllerDisplay';
import { useGamepad } from './hooks/useGamepad';

function App() {
  const { gamepads, connected } = useGamepad();
  const [selectedGamepad, setSelectedGamepad] = useState<number>(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Xbox Controller Tester</h1>
        <p>Connect your controller and see the inputs in real-time</p>
      </header>

      <main className="App-main">
        {gamepads.length > 1 && (
          <div className="gamepad-selector">
            <label htmlFor="gamepad-select">Select Controller: </label>
            <select 
              id="gamepad-select"
              value={selectedGamepad}
              onChange={(e) => setSelectedGamepad(Number(e.target.value))}
            >
              {gamepads.map((gamepad, index) => (
                gamepad && (
                  <option key={index} value={index}>
                    {gamepad.id} (Index: {index})
                  </option>
                )
              ))}
            </select>
          </div>
        )}

        <ControllerDisplay gamepad={gamepads[selectedGamepad]} />

        {!connected && (
          <div className="connection-help">
            <h3>Connection Help</h3>
            <ul>
              <li>Make sure your controller is turned on</li>
              <li>Connect via USB or Bluetooth</li>
              <li>Press any button on the controller to activate it</li>
              <li>Some browsers may require HTTPS for gamepad API access</li>
              <li>Try refreshing the page after connecting</li>
            </ul>
          </div>
        )}

        <div className="diagnostics">
          <h3>Diagnostics</h3>
          <div className="diagnostic-item">
            <label>
              <input type="checkbox" /> Test Circularity
            </label>
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <p>
          This application uses the{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API" target="_blank" rel="noopener noreferrer">
            Gamepad API
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
