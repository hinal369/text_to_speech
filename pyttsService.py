import pyttsx3

def text_to_speech(text, save_to_file=None):
    try:
        # Initialize the TTS engine
        engine = pyttsx3.init()

        # Set properties (optional)
        engine.setProperty('rate', 150)  # Speed of speech
        engine.setProperty('volume', 1.0)  # Volume level (0.0 to 1.0)

        # Convert the text to speech
        # engine.say(text)

        if save_to_file:
            # Save the audio to a file
            engine.save_to_file(text, save_to_file)
            engine.runAndWait()  # This line is optional, remove if you don't want to play it
            print(f"Audio saved to: {save_to_file}")
    except Exception as e:
        print(e) 
        

# Example usage
if __name__ == "__main__":
    text = "Once upon a time in the small town of Eldridge, there lived a peculiar inventor named Oliver Quirk. Known for his wild imagination and eccentric creations, Oliver spent his days tinkering away in his cluttered workshop at the edge of town. One day, while scavenging for spare parts in the nearby forest, Oliver stumbled upon a peculiar-looking stone. It glowed with an otherworldly light, and as he picked it up, he felt a surge of energy coursing through him. Inspired by the mysterious aura of the stone, Oliver rushed back to his workshop with newfound excitement. For weeks, Oliver worked tirelessly, combining his inventive prowess with the magical properties of the stone. The townsfolk grew curious as strange noises emanated from his workshop at odd hours. Whispers of a secret project spread through Eldridge like wildfire. Finally, the day arrived when Oliver unveiled his masterpiece—a whimsical contraption that resembled a flying bicycle. He called it the 'Sky Rider.' With propellers whirring and the mysterious stone embedded in its core, the Sky Rider lifted off the ground, leaving the townspeople in aweOliver, with a twinkle in his eye, invited the townsfolk to join him on a magical journey through the skies. Skeptical at first, they hesitantly climbed aboard the fantastical invention. As the Sky Rider soared into the clouds, the once-quiet town of Eldridge transformed into a bustling spectacle of laughter and amazement. Word of Oliver's creation reached neighboring towns, and soon, people from far and wide flocked to Eldridge to experience the enchanting Sky Rider. Oliver became a local hero, and his once-isolated workshop became a hub of innovation and joy. As the seasons changed and the years passed, Eldridge prospered, thanks to the magical invention that had brought the community together. Oliver Quirk, the eccentric inventor, continued to dream and create, forever leaving his mark on the town and the hearts of those who dared to ride the skies with him. And so, in the small town of Eldridge, the legacy of the Sky Rider lived on, a testament to the extraordinary possibilities that can emerge when imagination and magic intertwine."
    text_to_speech(text, save_to_file="output.mp3")


# Support SSML
# Manage Volume
# Manage speech rate
