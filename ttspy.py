import pyttsx3

def text_to_speech_with_long_ssml(save_to_file=None):
    engine = pyttsx3.init()

    # Set properties (optional)
    engine.setProperty('rate', 250)  # Speed of speech
    engine.setProperty('volume', 0.5)  # Volume level (0.0 to 1.0)

    # Construct a long SSML paragraph
    long_ssml_text = """
        <speak>
            <p>This is a long SSML paragraph with various elements to demonstrate the usage of SSML tags.</p>

            <p>
                <prosody rate='slow'>In this part, the speech rate is intentionally slowed down for emphasis.</prosody>
            </p>

            <p>
                <s>This is a sentence with a short pause before the next one.</s>
                <break time='500ms'/> <!-- 500 milliseconds pause -->
                <s>And here is the next sentence.</s>
            </p>

            <p>
                <prosody pitch='-10%'>This sentence has a decreased pitch for a different tone.</prosody>
            </p>

            <p>
                <s>The last sentence of the long SSML paragraph.</s>
            </p>
        </speak>
    """

    # engine.say(long_ssml_text)

    if save_to_file:
        # Save the audio to a file
        engine.save_to_file(long_ssml_text, save_to_file)
        engine.runAndWait()  # This line is optional, remove if you don't want to play it
        print(f"Audio saved to: {save_to_file}")

# Example usage
if __name__ == "__main__":
    text_to_speech_with_long_ssml(save_to_file="output_long_ssml1.mp3")


