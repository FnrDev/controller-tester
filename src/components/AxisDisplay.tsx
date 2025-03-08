import React from 'react';
import { AxisDisplayProps } from '../types/gamepad';

/**
 * Component to display joystick axes
 */
const AxisDisplay: React.FC<AxisDisplayProps> = ({ axes }) => {
  // Get axis name based on standard mapping
  const getAxisName = (index: number): string => {
    const axisNames: Record<number, string> = {
      0: 'Left Stick X',
      1: 'Left Stick Y',
      2: 'Right Stick X',
      3: 'Right Stick Y'
    };
    
    return axisNames[index] || `Axis ${index}`;
  };

  // Calculate position for joystick visualization
  const calculateJoystickPosition = (axisX: number, axisY: number) => {
    // Convert from -1,1 range to 0,100 range for CSS positioning
    const x = ((axisX + 1) / 2) * 100;
    const y = ((axisY + 1) / 2) * 100;
    return { x, y };
  };

  // Create pairs of axes for joysticks
  const leftStick = calculateJoystickPosition(
    axes[0]?.value || 0,
    axes[1]?.value || 0
  );
  
  const rightStick = calculateJoystickPosition(
    axes[2]?.value || 0,
    axes[3]?.value || 0
  );

  return (
    <div className="axis-display">
      <h3>Axes</h3>
      
      <div className="axis-values">
        {axes.map((axis) => (
          <div key={axis.index} className="axis-value">
            <span>{getAxisName(axis.index)}:</span>
            <span>{axis.value.toFixed(5)}</span>
          </div>
        ))}
      </div>
      
      <div className="joystick-container">
        <div className="joystick left-stick">
          <div className="joystick-label">Left Stick</div>
          <div className="joystick-base">
            <div 
              className="joystick-dot"
              style={{
                left: `${leftStick.x}%`,
                top: `${leftStick.y}%`
              }}
            />
          </div>
        </div>
        
        <div className="joystick right-stick">
          <div className="joystick-label">Right Stick</div>
          <div className="joystick-base">
            <div 
              className="joystick-dot"
              style={{
                left: `${rightStick.x}%`,
                top: `${rightStick.y}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AxisDisplay; 