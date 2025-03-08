import React from 'react';
import { ControllerDisplayProps } from '../types/gamepad';
import ButtonGrid from './ButtonGrid';
import AxisDisplay from './AxisDisplay';
import ControllerSvg from './ControllerSvg';

/**
 * Main component to display controller state
 */
const ControllerDisplay: React.FC<ControllerDisplayProps> = ({ gamepad }) => {
  if (!gamepad) {
    return (
      <div className="controller-display no-gamepad">
        <h2>No Controller Detected</h2>
        <p>Connect an Xbox controller or other gamepad to see its state.</p>
        <p>Press any button on the controller to activate it.</p>
        <div className="controller-image">
          <ControllerSvg />
        </div>
      </div>
    );
  }

  return (
    <div className="controller-display">
      <div className="controller-header">
        <h2>
          {gamepad.id}
        </h2>
        <div className="controller-info">
          <div>
            <strong>Index:</strong> {gamepad.index}
          </div>
          <div>
            <strong>Connected:</strong> {gamepad.connected ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>Mapping:</strong> {gamepad.mapping}
          </div>
          <div>
            <strong>Timestamp:</strong> {gamepad.timestamp.toFixed(5)}
          </div>
        </div>
      </div>

      <div className="controller-body">
        <ButtonGrid buttons={gamepad.buttons} />
        <AxisDisplay axes={gamepad.axes} />
      </div>

      {gamepad.vibrationActuator && (
        <div className="vibration-test">
          <h3>Haptic Feedback</h3>
          <div>
            <strong>Haptic Actuator:</strong> {gamepad.vibrationActuator ? 'Available' : 'Not Available'}
          </div>
          <button 
            className="vibration-button"
            onClick={() => {
              if (gamepad.vibrationActuator) {
                try {
                  // Use type assertion to access the playEffect method
                  (gamepad.vibrationActuator).playEffect('dual-rumble', {
                    startDelay: 0,
                    duration: 500,
                    weakMagnitude: 1.0,
                    strongMagnitude: 1.0,
                  });
                } catch (error) {
                  console.error('Error using vibration:', error);
                }
              }
            }}
          >
            Test Vibration
          </button>
        </div>
      )}

      <div className="controller-image">
        <ControllerSvg 
          buttons={gamepad.buttons} 
          axes={gamepad.axes} 
        />
      </div>
    </div>
  );
};

export default ControllerDisplay; 