const axios = require('axios');
const fs = require('fs');

var API_URL = "https://eastus.tts.speech.microsoft.com/cognitiveservices/v1";
var API_AUTH_URL = "https://eastus.api.cognitive.microsoft.com/sts/v1.0/issuetoken";

// replace this with your own API KEY
var API_KEY = "ae0edca39b984af6a870a5058fafd98c";

// (Optional - replace this with supported Standard voices service name)
var SERVICE_NAME = "Microsoft Server Speech Text to Speech Voice (en-US, JessaRUS)";

// (Optional - replace this with supported Neural voices service name)
var SERVICE_NAME_NEURAL = "Microsoft Server Speech Text to Speech Voice (fr-CA, JeanNeural)";

const generateToken = async (req, res) => {
    try {
        const response = await axios.post(API_AUTH_URL, {}, {
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const textToSpeech = async (req, res) => {
    try {
      const target_text = `In the heart of the bustling city of Serendell, where skyscrapers kissed the clouds and the streets hummed with the rhythm of urban life, lived a young artist named Adrian. With his tousled hair and a perpetually ink-stained jacket, Adrian found inspiration in the cacophony of the city, capturing its essence on his canvas.

      Adrian's studio, a quirky loft tucked away in the artistic quarter, overlooked the cityscape. One evening, as he dipped his brush into vibrant hues, a peculiar sound echoed through the open window. It was the melodic chirping of a small bird perched on his windowsill. The bird, a radiant blue with streaks of gold, seemed to carry a message in its song.
      
      Intrigued, Adrian approached the bird and, to his surprise, understood its message. The bird spoke of an ancient legend—a hidden realm called Eldoria, where magic flowed like a river, and creatures of myth and wonder lived in harmony. The bird, named Melody, implored Adrian to embark on a journey to Eldoria to restore a fading enchantment that kept the realm alive.
      
      Unable to resist the call of adventure, Adrian packed his paints and canvases, bidding farewell to the familiar city. With Melody as his guide, they ventured into an enchanted forest that shimmered with ethereal light. Trees whispered ancient tales, and flowers bloomed in kaleidoscopic patterns as they passed.
      
      In Eldoria, Adrian encountered mystical creatures—a talking tortoise, a singing river nymph, and a wise old owl named Oliver. Each being possessed a unique gift, and together, they revealed that the source of Eldoria's magic, a precious gem, had been stolen by a mischievous fox named Jasper. Without the gem, Eldoria's vibrant energy was fading.
      
      Determined to restore balance, Adrian and his newfound friends embarked on a quest. The journey took them through treacherous mountains, across shimmering meadows, and into the heart of a labyrinthine cave. Along the way, they faced challenges that tested their resolve and camaraderie.
      
      As they reached Jasper's den, Adrian employed his artistic prowess to create an illusion that fascinated the cunning fox. Mesmerized, Jasper revealed the gem's location. With a heartfelt plea, Adrian convinced Jasper to return the gem and embrace the beauty of Eldoria.
      
      With the gem restored, Eldoria's magic surged, painting the realm with radiant colors. Adrian, now deeply connected to this magical world, discovered that his paintings held the power to bring joy and wonder to Eldoria. He transformed the once-fading realm into a living masterpiece, where his art danced with the magic of the land.
      
      As a token of gratitude, the creatures of Eldoria gifted Adrian a magical paintbrush that allowed him to channel the essence of the enchanted realm into his artwork. Filled with newfound inspiration, Adrian bid farewell to his friends in Eldoria, promising to visit whenever his artistic spirit yearned for the magic of that wondrous realm.
      
      Returning to Serendell, Adrian's art transformed the city. His paintings, imbued with the enchantment of Eldoria, captivated the hearts of all who beheld them. The once-bustling city now embraced the magic of creativity and nature, creating a harmonious blend of urban life and mystical wonder.
      
      And so, the tale of Adrian and Eldoria became a legendary story, inspiring artists and dreamers alike to seek the magic within their hearts and the enchantment hidden in the world around them.
      `;

      const service_used = SERVICE_NAME_NEURAL;
  
      const accessToken = await generateToken();
      const response = await axios.post(
        API_URL,
        `<speak version='1.0' xmlns="http://www.w3.org/2001/10/synthesis" xml:lang='en-US'>\n<voice  name='${service_used}'>${target_text}</voice> </speak>`,
        {
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'cache-control': 'no-cache',
            'User-Agent': 'neural-speech-api',
            'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
            'Content-Type': 'application/ssml+xml'
          },
          responseType: 'arraybuffer'
        }
      );
      fs.writeFileSync("audio/Fr_JeanNeural.mp3", response.data, 'binary');
      console.log("Audio Generated");
    } catch (error) {
      console.error(error);
    }
};

// textToSpeech();


const data = [
  {
    text: 'Hello, this is the first part of the text.',
    voice: 'en-US-GuyNeural',
    rate: 0.8,
    pitch: 0.5,
  },
  {
    text: 'And this is the second part with different settings.',
    voice: 'en-US-GuyNeural',
    rate: 1.2,
    pitch: -0.3,
  },
];

async function makeApiCall(item) {
  try {
    const subscriptionKey = await generateToken();

    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + subscriptionKey,
    };
    const data = JSON.stringify(item);
    const response = await axios.post(API_URL, data , { headers });

    if (response.status === 200) {
      const audioContent = response.data; // Assuming the audio content is directly returned
      // Process or save the audio content as needed
    } else {
      console.error(`Error ${response.status}: ${response.data}`);
    }
  } catch (error) {
    console.error('Error making API call:', error.message);
  }
}

// Make API calls for each item in the data array
data.forEach(makeApiCall);
