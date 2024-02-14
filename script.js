const messages = [
    "Do you want to be my Valentine?",
    "Maybe you accidentally clicked 'No'?",
    "I think you meant to click 'Yes'!",
    "Give it another try?",
    "Are you playing hard to get?",
    "I'm persistent, you know!",
    "Okay, how about now?",
    "Last chance, I promise!"
];

let messageIndex = 0;
const messageElement = document.getElementById('message');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const noBox = document.getElementById('noBox');
const yesBox = document.getElementById('yesBox');
let stage = 1;
let isTired = false; // Flag to check if the button is tired
let tiredTimeout; // Variable to store the timeout for the "I'm tired" message

noButton.addEventListener('click', () => {
    if (stage === 1) {
        updateMessage();
    } else if (stage === 2) {
        stage = 3; // Move to the final stage
        resetNoButtonPosition(); // Reset the position of the "No" button
        initiateFinalChoice();
    } else if (stage === 3) {
        showPopup();
    }
});

noButton.addEventListener('touchstart', () => {
    if (stage === 2 && !isTired) {
        moveNoButton();
    }
});

noButton.addEventListener('touchmove', () => {
    if (stage === 2 && !isTired) {
        moveNoButton();
    }
});

function moveNoButton() {
    const randomTop = Math.random() * 200 - 100; // Adjust values as needed
    const randomLeft = Math.random() * 200 - 100; // Adjust values as needed
    noBox.style.position = 'relative';
    noBox.style.top = `${randomTop}px`;
    noBox.style.left = `${randomLeft}px`;
}


function resetNoButtonPosition() {
    noBox.style.top = '0px';
    noBox.style.left = '0px';
    isTired = false; // Reset the tired flag
    clearTimeout(tiredTimeout); // Clear any existing "tired" timeout
}

yesButton.addEventListener('click', () => {
    if (stage === 3) {
        showPopup();
    } else {
        initiateFinalChoice();
    }
});

noButton.addEventListener('mouseover', () => {
    if (stage === 2 && !isTired) {
        const randomTop = Math.random() * 300 - 100; // Adjust values as needed
        const randomLeft = Math.random() * 300 - 300; // Adjust values as needed
        noBox.style.position = 'relative';
        noBox.style.top = `${randomTop}px`;
        noBox.style.left = `${randomLeft}px`;
    }
});


function updateMessage() {
    if (messageIndex < messages.length - 1) {
        messageIndex++;
        messageElement.innerText = messages[messageIndex];
    } else if (stage === 1) {
        stage = 2; // Move to the hover effect stage
        messageElement.innerText = "Try to catch the 'No' button!";
        startTiredTimer(); // Start the timer for the "I'm tired" message

        // Programmatically trigger a mouseover event on the "No" button
        let event = new MouseEvent('mouseover', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        noButton.dispatchEvent(event);
    }
}


function startTiredTimer() {
    // Set a timeout to make the button "tired" after 10 seconds
    tiredTimeout = setTimeout(() => {
        isTired = true;
        noBox.style.top = '0px';
        noBox.style.left = '0px';
        const tiredMessage = document.createElement('div');
        tiredMessage.innerText = "I'm tired...";
        tiredMessage.classList.add('tiredMessage');
        noBox.appendChild(tiredMessage);
    }, 10000); // 10000 milliseconds = 10 seconds
}

function initiateFinalChoice() {
    stage = 3;
    messageElement.innerText = "Just kidding, you have no choice!";
    yesButton.innerText = "Yes"; // Set both to "Yes"
    noButton.innerText = "Yes"; // Set both to "Yes"
    noButton.style.visibility = 'visible'; // Make sure the no button is visible
    clearTimeout(tiredTimeout); // Clear the timeout if the final stage is reached before the button gets tired
}

function showPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}





