import React from 'react';
import { ButtonDisplayProps } from '../types/gamepad';

/**
 * Component to display a single button's state
 */
const ButtonDisplay: React.FC<ButtonDisplayProps> = ({ index, state }) => {
  // Get button name based on standard mapping
  const getButtonName = (index: number): string => {
    const buttonNames: Record<number, string> = {
      0: 'A',
      1: 'B',
      2: 'X',
      3: 'Y',
      4: 'LB',
      5: 'RB',
      6: 'LT',
      7: 'RT',
      8: 'Back',
      9: 'Start',
      10: 'LS',
      11: 'RS',
      12: 'Up',
      13: 'Down',
      14: 'Left',
      15: 'Right',
      16: 'Guide'
    };
    
    return buttonNames[index] || `B${index}`;
  };

  return (
    <div className={`button-display ${state.pressed ? 'pressed' : ''}`}>
      <div className="button-name">{getButtonName(index)}</div>
      <div className="button-value">{state.value.toFixed(2)}</div>
    </div>
  );
};

export default ButtonDisplay; 