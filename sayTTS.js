const say = require('say');
const wav = require('node-wav');
const fs = require('fs');

console.log("Welcome to Node");
// Function to speak a given text and save it as a WAV file
function speakAndSave(text, filename) {
    say.export(text, 'Microsoft Heera Desktop', 1, filename, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log(`Speech saved as ${filename}`);
    });
}

// Example usage
const textToSpeak = 'Google LLC is an American multinational technology company focusing on artificial intelligence, online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, and consumer electronics.';
const outputFile = 'output.mp3';

// speakAndSave(textToSpeak, outputFile);

// Print the list of available voices
console.log(say.getVoices());
// Microsoft David Desktop