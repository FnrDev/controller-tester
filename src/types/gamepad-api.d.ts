/**
 * Custom type declarations for the Gamepad API
 */

interface GamepadHapticActuator {
  type: string;
  playEffect(
    type: string,
    params: {
      startDelay?: number;
      duration?: number;
      weakMagnitude?: number;
      strongMagnitude?: number;
    }
  ): Promise<GamepadHapticsResult>;
}

interface GamepadHapticsResult {
  complete: boolean;
}

// Extend the built-in Gamepad interface to include vibrationActuator
interface Gamepad {
  vibrationActuator?: GamepadHapticActuator;
} 