const axios = require('axios');
const fs = require('fs');

const maryTTSUrl = 'http://marytts-server:59125/process';

async function generateSpeech(text, language = 'en_US') {
    try {
        const response = await axios.post(maryTTSUrl, {
            input: 'TEXT',
            output: 'AUDIO',
            locale: language,
            voice: 'cmu-slt-hsmm', // Choose a MaryTTS voice
            effect_Tune: 'duration_stretch+intonation', // Additional effects if needed
            input_data: text
        }, {
            responseType: 'arraybuffer'
        });

        const audioData = Buffer.from(response.data, 'binary');
        fs.writeFileSync('output.mp3', audioData);
        console.log('Speech generated and saved as output.wav');
    } catch (error) {
        console.error('Error generating speech:', error.message);
    }
}

// Example usage
const textToSpeak = 'Hello, this is a test.';
generateSpeech(textToSpeak);
