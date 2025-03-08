import React from 'react';
import { ButtonGridProps } from '../types/gamepad';
import ButtonDisplay from './ButtonDisplay';

/**
 * Component to display a grid of buttons
 */
const ButtonGrid: React.FC<ButtonGridProps> = ({ buttons }) => {
  return (
    <div className="button-grid">
      <h3>Buttons</h3>
      <div className="button-container">
        {buttons.map((button, index) => (
          <ButtonDisplay 
            key={index} 
            index={index} 
            state={button} 
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonGrid; 