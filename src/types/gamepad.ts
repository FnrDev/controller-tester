/**
 * TypeScript interfaces for gamepad data
 */

export interface GamepadButtonState {
  pressed: boolean;
  touched: boolean;
  value: number;
}

export interface GamepadAxisState {
  index: number;
  value: number;
}

export interface GamepadState {
  id: string;
  index: number;
  connected: boolean;
  mapping: string;
  timestamp: number;
  buttons: GamepadButtonState[];
  axes: GamepadAxisState[];
  vibrationActuator?: GamepadHapticActuator;
}

export interface ControllerDisplayProps {
  gamepad: GamepadState | null;
}

export interface AxisDisplayProps {
  axes: GamepadAxisState[];
}

export interface ButtonGridProps {
  buttons: GamepadButtonState[];
}

export interface ButtonDisplayProps {
  index: number;
  state: GamepadButtonState;
} 