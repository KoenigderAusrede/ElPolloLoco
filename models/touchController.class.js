/**
 * Class representing a touch controller for mobile devices.
 */
class TouchController {
    
    /**
     * Create a touch controller with the specified keyboard instance.
     * @param {Keyboard} keyboard - The keyboard instance to control.
     */
    constructor(keyboard) {
        this.keyboard = keyboard;
        this.createControlButtons();
    }

    /**
     * Create on-screen control buttons for left and right movement.
     */
    createControlButtons() {
        // Create containers for the left and right groups of buttons
        const leftControls = document.createElement('div');
        leftControls.classList.add('left-controls');

        const rightControls = document.createElement('div');
        rightControls.classList.add('right-controls');

        const buttonsInfo = [
            { key: 'LEFT', text: '←', container: leftControls },
            { key: 'RIGHT', text: '→', container: leftControls },
            { key: 'SPACE', text: '↑', container: rightControls },
            { key: 'D', text: '➹', container: rightControls }
        ];

        buttonsInfo.forEach(buttonInfo => {
            const button = document.createElement('button');
            button.innerText = buttonInfo.text;
            button.classList.add('control-button');
            button.addEventListener('touchstart', () => this.keyboard[buttonInfo.key] = true);
            button.addEventListener('touchend', () => this.keyboard[buttonInfo.key] = false);
            buttonInfo.container.appendChild(button);
        });

        // Add both containers to the body
        document.body.appendChild(leftControls);
        document.body.appendChild(rightControls);
    }
}

