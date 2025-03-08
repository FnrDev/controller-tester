import React from 'react';
import { GamepadButtonState, GamepadAxisState } from '../types/gamepad';

interface ControllerSvgProps {
  buttons?: GamepadButtonState[];
  axes?: GamepadAxisState[];
}

/**
 * SVG outline of an Xbox controller with interactive button highlighting
 */
const ControllerSvg: React.FC<ControllerSvgProps> = ({ buttons = [], axes = [] }) => {
  // Helper function to get button state
  const getButtonState = (index: number): GamepadButtonState => {
    return buttons[index] || { pressed: false, touched: false, value: 0 };
  };

  // Get axis values for joysticks
  const leftStickX = axes[0]?.value || 0;
  const leftStickY = axes[1]?.value || 0;
  const rightStickX = axes[2]?.value || 0;
  const rightStickY = axes[3]?.value || 0;

  // Calculate joystick positions
  const calculateJoystickPosition = (x: number, y: number, centerX: number, centerY: number, radius: number = 20) => {
    // Convert from -1,1 range to pixel offset
    const offsetX = x * radius;
    const offsetY = y * radius;
    return {
      cx: centerX + offsetX,
      cy: centerY + offsetY
    };
  };

  // Calculate positions for the joysticks
  const leftJoystick = calculateJoystickPosition(leftStickX, leftStickY, 113, 160);
  const rightJoystick = calculateJoystickPosition(rightStickX, rightStickY, 278, 238);

  // Get fill color based on button state
  const getButtonFill = (index: number) => {
    return getButtonState(index).pressed ? "#4CAF50" : "rgba(0,0,0,0)";
  };

  // Get stroke color based on button state
  const getButtonStroke = (index: number) => {
    return getButtonState(index).pressed ? "#4CAF50" : "rgba(0,0,0,1)";
  };

  return (
    <svg width="350" viewBox="0 0 441 383" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="XBox">
        <path id="LOutline" d="M220.5 294.5C220.5 294.5 195 294.5 150 294.5C105 294.5 81.5 378.5 49.5 378.5C17.5 378.5 4 363.9 4 317.5C4 271.1 43.5 165.5 55 137.5C66.5 109.5 95.5 92.0001 128 92.0001C154 92.0001 200.5 92.0001 220.5 92.0001" stroke="hsl(210,50%,85%)" strokeWidth="3" strokeOpacity="1"></path>
        <path id="ROutline" d="M220 294.5C220 294.5 245.5 294.5 290.5 294.5C335.5 294.5 359 378.5 391 378.5C423 378.5 436.5 363.9 436.5 317.5C436.5 271.1 397 165.5 385.5 137.5C374 109.5 345 92.0001 312.5 92.0001C286.5 92.0001 240 92.0001 220 92.0001" stroke="hsl(210,50%,85%)" strokeWidth="3" strokeOpacity="1"></path>
        
        {/* Left Stick */}
        <circle id="LStickOutline" cx="113" cy="160" r="37.5" stroke="hsl(210,50%,85%)" strokeOpacity="1" strokeWidth="3"></circle>
        <circle 
          id="LeftStick" 
          cx={leftJoystick.cx} 
          cy={leftJoystick.cy} 
          r="28" 
          fill={getButtonFill(10)} 
          stroke={getButtonStroke(10)} 
          strokeWidth="3"
        ></circle>
        
        {/* Right Stick */}
        <circle id="RStickOutline" cx="278" cy="238" r="37.5" stroke="hsl(210,50%,85%)" strokeOpacity="1" strokeWidth="3"></circle>
        <circle 
          id="RightStick" 
          cx={rightJoystick.cx} 
          cy={rightJoystick.cy} 
          r="28" 
          fill={getButtonFill(11)} 
          stroke={getButtonStroke(11)} 
          strokeWidth="3"
        ></circle>
        
        {/* D-Pad */}
        <circle id="DOutline" cx="166" cy="238" r="37.5" stroke="hsl(210,50%,85%)" strokeOpacity="1" strokeWidth="3"></circle>
        
        {/* D-Pad Up - Button 12 */}
        <g id="DUp">
          <mask id="path-8-inside-1" fill="white">
            <path d="M177.669 222.335C180.793 219.21 180.816 213.997 176.868 212.014C176.327 211.743 175.776 211.491 175.215 211.258C172.182 210.002 168.931 209.355 165.648 209.355C162.365 209.355 159.114 210.002 156.081 211.258C155.521 211.491 154.969 211.743 154.429 212.014C150.48 213.997 150.503 219.21 153.627 222.335L159.991 228.698C163.116 231.823 168.181 231.823 171.305 228.698L177.669 222.335Z"></path>
          </mask>
          <path 
            d="M177.669 222.335C180.793 219.21 180.816 213.997 176.868 212.014C176.327 211.743 175.776 211.491 175.215 211.258C172.182 210.002 168.931 209.355 165.648 209.355C162.365 209.355 159.114 210.002 156.081 211.258C155.521 211.491 154.969 211.743 154.429 212.014C150.48 213.997 150.503 219.21 153.627 222.335L159.991 228.698C163.116 231.823 168.181 231.823 171.305 228.698L177.669 222.335Z" 
            fill={getButtonFill(12)} 
            stroke={getButtonStroke(12)} 
            strokeWidth="6" 
            mask="url(#path-8-inside-1)"
          ></path>
        </g>
        
        {/* D-Pad Right - Button 15 */}
        <g id="DRight">
          <mask id="path-9-inside-2" fill="white">
            <path d="M181.447 249.669C184.571 252.793 189.785 252.816 191.768 248.868C192.039 248.327 192.291 247.776 192.523 247.215C193.78 244.182 194.426 240.931 194.426 237.648C194.426 234.365 193.78 231.114 192.523 228.081C192.291 227.521 192.039 226.969 191.768 226.429C189.785 222.48 184.571 222.503 181.447 225.627L175.083 231.991C171.959 235.116 171.959 240.181 175.083 243.305L181.447 249.669Z"></path>
          </mask>
          <path 
            d="M181.447 249.669C184.571 252.793 189.785 252.816 191.768 248.868C192.039 248.327 192.291 247.776 192.523 247.215C193.78 244.182 194.426 240.931 194.426 237.648C194.426 234.365 193.78 231.114 192.523 228.081C192.291 227.521 192.039 226.969 191.768 226.429C189.785 222.48 184.571 222.503 181.447 225.627L175.083 231.991C171.959 235.116 171.959 240.181 175.083 243.305L181.447 249.669Z" 
            fill={getButtonFill(15)} 
            stroke={getButtonStroke(15)} 
            strokeWidth="6" 
            mask="url(#path-9-inside-2)"
          ></path>
        </g>
        
        {/* D-Pad Down - Button 13 */}
        <g id="DDown">
          <mask id="path-10-inside-3" fill="white">
            <path d="M154.113 253.447C150.989 256.571 150.966 261.785 154.914 263.767C155.455 264.039 156.006 264.291 156.566 264.523C159.6 265.78 162.85 266.426 166.134 266.426C169.417 266.426 172.667 265.78 175.701 264.523C176.261 264.291 176.812 264.039 177.353 263.767C181.301 261.785 181.279 256.571 178.154 253.447L171.79 247.083C168.666 243.959 163.601 243.959 160.477 247.083L154.113 253.447Z"></path>
          </mask>
          <path 
            d="M154.113 253.447C150.989 256.571 150.966 261.785 154.914 263.767C155.455 264.039 156.006 264.291 156.566 264.523C159.6 265.78 162.85 266.426 166.134 266.426C169.417 266.426 172.667 265.78 175.701 264.523C176.261 264.291 176.812 264.039 177.353 263.767C181.301 261.785 181.279 256.571 178.154 253.447L171.79 247.083C168.666 243.959 163.601 243.959 160.477 247.083L154.113 253.447Z" 
            fill={getButtonFill(13)} 
            stroke={getButtonStroke(13)} 
            strokeWidth="6" 
            mask="url(#path-10-inside-3)"
          ></path>
        </g>
        
        {/* D-Pad Left - Button 14 */}
        <g id="DLeft">
          <mask id="path-11-inside-4" fill="white">
            <path d="M150.335 226.113C147.21 222.989 141.997 222.966 140.014 226.914C139.743 227.455 139.491 228.006 139.258 228.566C138.002 231.6 137.355 234.85 137.355 238.134C137.355 241.417 138.002 244.667 139.258 247.701C139.491 248.261 139.743 248.812 140.014 249.353C141.997 253.301 147.21 253.279 150.335 250.154L156.698 243.79C159.823 240.666 159.823 235.601 156.698 232.477L150.335 226.113Z"></path>
          </mask>
          <path 
            d="M150.335 226.113C147.21 222.989 141.997 222.966 140.014 226.914C139.743 227.455 139.491 228.006 139.258 228.566C138.002 231.6 137.355 234.85 137.355 238.134C137.355 241.417 138.002 244.667 139.258 247.701C139.491 248.261 139.743 248.812 140.014 249.353C141.997 253.301 147.21 253.279 150.335 250.154L156.698 243.79C159.823 240.666 159.823 235.601 156.698 232.477L150.335 226.113Z" 
            fill={getButtonFill(14)} 
            stroke={getButtonStroke(14)} 
            strokeWidth="6" 
            mask="url(#path-11-inside-4)"
          ></path>
        </g>
        
        {/* Button Area (ABXY) */}
        <circle id="BOutline" cx="329" cy="160" r="37.5" stroke="hsl(210,50%,85%)" strokeOpacity="1" strokeWidth="3"></circle>
        
        {/* Y Button - Button 3 */}
        <g id="BTop">
          <mask id="path-13-inside-5" fill="white">
            <path d="M340.669 144.335C343.793 141.21 343.816 135.997 339.868 134.014C339.327 133.743 338.776 133.491 338.215 133.258C335.182 132.002 331.931 131.355 328.648 131.355C325.365 131.355 322.114 132.002 319.081 133.258C318.521 133.491 317.969 133.743 317.429 134.014C313.48 135.997 313.503 141.21 316.627 144.335L322.991 150.698C326.116 153.823 331.181 153.823 334.305 150.698L340.669 144.335Z"></path>
          </mask>
          <path 
            d="M340.669 144.335C343.793 141.21 343.816 135.997 339.868 134.014C339.327 133.743 338.776 133.491 338.215 133.258C335.182 132.002 331.931 131.355 328.648 131.355C325.365 131.355 322.114 132.002 319.081 133.258C318.521 133.491 317.969 133.743 317.429 134.014C313.48 135.997 313.503 141.21 316.627 144.335L322.991 150.698C326.116 153.823 331.181 153.823 334.305 150.698L340.669 144.335Z" 
            fill={getButtonFill(3)} 
            stroke={getButtonStroke(3)} 
            strokeWidth="6" 
            mask="url(#path-13-inside-5)"
          ></path>
        </g>
        
        {/* B Button - Button 1 */}
        <g id="BRight">
          <mask id="path-14-inside-6" fill="white">
            <path d="M344.447 171.669C347.571 174.793 352.785 174.816 354.768 170.868C355.039 170.327 355.291 169.776 355.523 169.215C356.78 166.182 357.426 162.931 357.426 159.648C357.426 156.365 356.78 153.114 355.523 150.081C355.291 149.521 355.039 148.969 354.768 148.429C352.785 144.48 347.571 144.503 344.447 147.627L338.083 153.991C334.959 157.116 334.959 162.181 338.083 165.305L344.447 171.669Z"></path>
          </mask>
          <path 
            d="M344.447 171.669C347.571 174.793 352.785 174.816 354.768 170.868C355.039 170.327 355.291 169.776 355.523 169.215C356.78 166.182 357.426 162.931 357.426 159.648C357.426 156.365 356.78 153.114 355.523 150.081C355.291 149.521 355.039 148.969 354.768 148.429C352.785 144.48 347.571 144.503 344.447 147.627L338.083 153.991C334.959 157.116 334.959 162.181 338.083 165.305L344.447 171.669Z" 
            fill={getButtonFill(1)} 
            stroke={getButtonStroke(1)} 
            strokeWidth="6" 
            mask="url(#path-14-inside-6)"
          ></path>
        </g>
        
        {/* A Button - Button 0 */}
        <g id="BBottom">
          <mask id="path-15-inside-7" fill="white">
            <path d="M317.113 175.447C313.989 178.571 313.966 183.785 317.914 185.767C318.455 186.039 319.006 186.291 319.566 186.523C322.6 187.78 325.85 188.426 329.134 188.426C332.417 188.426 335.667 187.78 338.701 186.523C339.261 186.291 339.812 186.039 340.353 185.767C344.301 183.785 344.279 178.571 341.154 175.447L334.79 169.083C331.666 165.959 326.601 165.959 323.477 169.083L317.113 175.447Z"></path>
          </mask>
          <path 
            d="M317.113 175.447C313.989 178.571 313.966 183.785 317.914 185.767C318.455 186.039 319.006 186.291 319.566 186.523C322.6 187.78 325.85 188.426 329.134 188.426C332.417 188.426 335.667 187.78 338.701 186.523C339.261 186.291 339.812 186.039 340.353 185.767C344.301 183.785 344.279 178.571 341.154 175.447L334.79 169.083C331.666 165.959 326.601 165.959 323.477 169.083L317.113 175.447Z" 
            fill={getButtonFill(0)} 
            stroke={getButtonStroke(0)} 
            strokeWidth="6" 
            mask="url(#path-15-inside-7)"
          ></path>
        </g>
        
        {/* X Button - Button 2 */}
        <g id="BLeft">
          <mask id="path-16-inside-8" fill="white">
            <path d="M313.335 148.113C310.21 144.989 304.997 144.966 303.014 148.914C302.743 149.455 302.491 150.006 302.258 150.566C301.002 153.6 300.355 156.851 300.355 160.134C300.355 163.417 301.002 166.668 302.258 169.701C302.491 170.261 302.743 170.812 303.014 171.353C304.997 175.301 310.21 175.279 313.335 172.154L319.698 165.79C322.823 162.666 322.823 157.601 319.698 154.477L313.335 148.113Z"></path>
          </mask>
          <path 
            d="M313.335 148.113C310.21 144.989 304.997 144.966 303.014 148.914C302.743 149.455 302.491 150.006 302.258 150.566C301.002 153.6 300.355 156.851 300.355 160.134C300.355 163.417 301.002 166.668 302.258 169.701C302.491 170.261 302.743 170.812 303.014 171.353C304.997 175.301 310.21 175.279 313.335 172.154L319.698 165.79C322.823 162.666 322.823 157.601 319.698 154.477L313.335 148.113Z" 
            fill={getButtonFill(2)} 
            stroke={getButtonStroke(2)} 
            strokeWidth="6" 
            mask="url(#path-16-inside-8)"
          ></path>
        </g>
        
        {/* Back/View Button - Button 8 */}
        <g id="LMeta">
          <circle 
            cx="185" 
            cy="162" 
            r="10" 
            fill={getButtonFill(8)} 
            stroke={getButtonStroke(8)} 
            strokeWidth="3"
          ></circle>
        </g>
        
        {/* Start/Menu Button - Button 9 */}
        <g id="RMeta">
          <circle 
            cx="259" 
            cy="162" 
            r="10" 
            fill={getButtonFill(9)} 
            stroke={getButtonStroke(9)} 
            strokeWidth="3"
          ></circle>
        </g>
        
        {/* Left Bumper (LB) - Button 4 */}
        <rect 
          id="L1" 
          x="111.5" 
          y="61.5" 
          width="41" 
          height="13" 
          rx="6.5" 
          fill={getButtonFill(4)} 
          stroke={getButtonStroke(4)} 
          strokeWidth="3"
        ></rect>
        
        {/* Right Bumper (RB) - Button 5 */}
        <rect 
          id="R1" 
          x="289.5" 
          y="61.5" 
          width="41" 
          height="13" 
          rx="6.5" 
          fill={getButtonFill(5)} 
          stroke={getButtonStroke(5)} 
          strokeWidth="3"
        ></rect>
        
        {/* Left Trigger (LT) - Button 6 */}
        <path 
          id="L2" 
          d="M152.5 37C152.5 41.1421 149.142 44.5 145 44.5H132C127.858 44.5 124.5 41.1421 124.5 37V16.5C124.5 8.76801 130.768 2.5 138.5 2.5C146.232 2.5 152.5 8.76801 152.5 16.5V37Z" 
          fill={getButtonFill(6)} 
          stroke={getButtonStroke(6)} 
          strokeWidth="3"
        ></path>
        
        {/* Right Trigger (RT) - Button 7 */}
        <path 
          id="R2" 
          d="M317.5 37C317.5 41.1421 314.142 44.5 310 44.5H297C292.858 44.5 289.5 41.1421 289.5 37V16.5C289.5 8.76801 295.768 2.5 303.5 2.5C311.232 2.5 317.5 8.76801 317.5 16.5V37Z" 
          fill={getButtonFill(7)} 
          stroke={getButtonStroke(7)} 
          strokeWidth="3"
        ></path>
        
        <line x1="30" y1="210" x2="130" y2="300" strokeWidth="3" stroke="hsl(210,50%,85%)" opacity="0.3"></line>
        <line x1="411" y1="210" x2="311" y2="300" strokeWidth="3" stroke="hsl(210,50%,85%)" opacity="0.3"></line>
      </g>
    </svg>
  );
};

export default ControllerSvg; 