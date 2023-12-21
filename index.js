const textToSpeech = require('@google-cloud/text-to-speech');
require('dotenv').config();
const fs = require('fs');
const util = require('util');
const client = new textToSpeech.TextToSpeechClient();
const axios = require('axios');
const key = require('./serviceaccount.json');

const convertTextToMps = async () => {
    const text = "Vallabhbhai Jhaverbhai Patel, commonly known as Sardar Vallabhbhai Patel, was an Indian independence nationalist and barrister who served as the first Deputy Prime Minister and Home Minister of India from 1947 to 1950.";

    const request = {
        input: {text:text},
        voice: {languageCode:'en-us', ssmlGender:'NEUTRAL'},
        audioConfig: {audioEncoding:'MP3'}
    }

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile("output.mp3", response.audioContent, 'binary');
    console.log("Text to Speech has completed. Audio File has been saved");
}

const apiTTS = async () => {
    try {
        const requestPayload = {
            "audioConfig": {
              "audioEncoding": "LINEAR16",
              "effectsProfileId": [
                "small-bluetooth-speaker-class-device"
              ],
              "pitch": 0,
              "speakingRate": 1
            },
            "input": {
              "text": "Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants. It applies DeepMind’s groundbreaking research in WaveNet and Google’s powerful neural networks to deliver the highest fidelity possible. As an easy-to-use API, you can create lifelike interactions with your users, across many applications and devices."

            // "text": `एक सुबह की धूप में रंग-बिरंगे पक्षियाँ अपने पंखों को हिला-हिला कर आसमान में खेतों का संगीत बजा रही थीं। गाँव के किसान, रामु नामक एक युवक, भी अपने खेतों में काम कर रहा था।

            // रामु के पास एक छोटा सा मक्खीचूस पलटा हुआ था, जिसे वह "छुट्टू" कहकर बुलाता था। छुट्टू कभी-कभी रामु के साथ खेतों में ही खेती का काम करता था।
            
            // एक दिन, जब रामु अपने खेतों में काम कर रहा था, छुट्टू ने ध्यान से एक छोटे से पौधे को देखा। वह रुका और उस पौधे को सहलाते हुए कहने लगा, "भाई रामु, इसमें बहुत सी खास बातें हैं।"
            
            // रामु ने हंसते हुए कहा, "क्या है छुट्टू, ये तो एक आम सा पौधा है।"
            
            // छुट्टू ने कहा, "नहीं भाई रामु, इसमें हमें सिख मिलती है कि छोटा होना कोई बुराई नहीं है। इस पौधे ने भी छोटा ही रहकर बहुत बड़ा कारण बना लिया है।"
            // `
            },
            "voice": {
              "languageCode": "en-US",
            //   "languageCode": "hi-IN",
              "name": "en-IN-Neural2-A"
            // "name": ""
            }
        }

        const token = await getAccessToken();
        const response = await axios.post(
            'https://texttospeech.googleapis.com/v1/text:synthesize', 
            requestPayload, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include an access token for authentication
                },
            }
        )
        fs.writeFileSync("output.mp3", response.data.audioContent, 'base64');
        console.log("Text to Speech has completed. Audio File has been saved");
    } catch (error) {
        console.log(error);
    }   
}

const getAccessToken = async () => {
    try {
        const jwt = require('jsonwebtoken');
    
        // Define token expiration time
        const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
        
        // Create a JWT token
        const token = jwt.sign(
            {
                iss: key.client_email,
                scope: 'https://www.googleapis.com/auth/cloud-platform',
                aud: 'https://www.googleapis.com/oauth2/v4/token',
                exp: expirationTime,
                iat: Math.floor(Date.now() / 1000),
            }, 
            key.private_key, 
            { algorithm: 'RS256' }
        );
        
        // Request an access token using the JWT token
        const response = await axios.post('https://www.googleapis.com/oauth2/v4/token', {
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: token,
        })
        // console.log("response.data.access_token", response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.log("ERROR", error);
    }
}

apiTTS();