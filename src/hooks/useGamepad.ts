import { useState, useEffect } from 'react';
import { GamepadState } from '../types/gamepad';

/**
 * Custom hook to handle gamepad detection and state updates
 */
export const useGamepad = () => {
  const [gamepads, setGamepads] = useState<(GamepadState | null)[]>([]);
  const [connected, setConnected] = useState<boolean>(false);

  // Convert native Gamepad to our GamepadState interface
  const mapGamepadToState = (gamepad: Gamepad | null): GamepadState | null => {
    if (!gamepad) return null;

    return {
      id: gamepad.id,
      index: gamepad.index,
      connected: gamepad.connected,
      mapping: gamepad.mapping,
      timestamp: gamepad.timestamp,
      buttons: gamepad.buttons.map((button, index) => ({
        pressed: button.pressed,
        touched: button.touched,
        value: button.value
      })),
      axes: gamepad.axes.map((value, index) => ({
        index,
        value
      })),
      vibrationActuator: gamepad.vibrationActuator
    };
  };

  // Handle gamepad connection
  const handleGamepadConnected = (event: GamepadEvent) => {
    console.log('Gamepad connected:', event.gamepad);
    setConnected(true);
  };

  // Handle gamepad disconnection
  const handleGamepadDisconnected = (event: GamepadEvent) => {
    console.log('Gamepad disconnected:', event.gamepad);
    setConnected(false);
  };

  // Update gamepad state
  const updateGamepadState = () => {
    const navigatorGamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    if (navigatorGamepads) {
      const mappedGamepads = Array.from(navigatorGamepads).map(mapGamepadToState);
      setGamepads(mappedGamepads);
    }
  };

  // Test vibration if available
  const testVibration = (gamepadIndex: number) => {
    const gamepad = gamepads[gamepadIndex];
    if (gamepad && gamepad.vibrationActuator) {
      try {
        // Use type assertion to access the playEffect method
        (gamepad.vibrationActuator as any).playEffect('dual-rumble', {
          startDelay: 0,
          duration: 500,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0,
        });
      } catch (error) {
        console.error('Error using vibration:', error);
      }
    }
  };

  // Set up event listeners
  useEffect(() => {
    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    // Check for already connected gamepads
    const checkForGamepads = () => {
      const navigatorGamepads = navigator.getGamepads ? navigator.getGamepads() : [];
      if (navigatorGamepads && navigatorGamepads[0]) {
        setConnected(true);
      }
    };
    
    checkForGamepads();

    // Set up animation frame for polling
    let animationFrameId: number;
    const updateLoop = () => {
      updateGamepadState();
      animationFrameId = requestAnimationFrame(updateLoop);
    };
    
    animationFrameId = requestAnimationFrame(updateLoop);

    // Clean up
    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
      cancelAnimationFrame(animationFrameId);
    };
  });

  return {
    gamepads,
    connected,
    testVibration
  };
}; 