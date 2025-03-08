# Xbox Controller Tester

A React application for testing and visualizing Xbox controller inputs in real-time. This application uses the Gamepad API to detect and display controller state, including buttons, axes, and vibration capabilities.

![image](https://github.com/user-attachments/assets/65f42192-7dc1-4868-92d5-c4ddaf1d60c3)



## Features

- Real-time display of controller inputs
- Support for multiple connected controllers
- Button state visualization
- Joystick position visualization
- Haptic feedback testing (if supported by the controller)
- Diagnostic tools

## Requirements

- A modern web browser that supports the Gamepad API (Chrome, Firefox, Edge)
- An Xbox controller or other HID-compliant gamepad
- Node.js and npm for development

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open your browser to `http://localhost:3000`
5. Connect your controller via USB or Bluetooth
6. Press any button on the controller to activate it

## Browser Support

The Gamepad API is supported in most modern browsers:

- Chrome 35+
- Firefox 29+
- Edge 12+
- Safari 10.1+

Note that some features (like vibration) may not be supported in all browsers or with all controllers.

## Troubleshooting

If your controller is not detected:

1. Make sure it's powered on and connected
2. Press a button on the controller to activate it
3. Try refreshing the page
4. Some browsers require HTTPS for Gamepad API access
5. Check browser console for errors

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## License

MIT

## Acknowledgements

- [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
