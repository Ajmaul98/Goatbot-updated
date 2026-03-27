# cute_voice_reader.py
import pyttsx3
import sys

def speak_text(text):
    # Initialize TTS engine
    engine = pyttsx3.init()
    
    # Get available voices
    voices = engine.getProperty('voices')
    
    # Try to select a cute/female voice
    selected_voice = None
    for voice in voices:
        if "female" in voice.name.lower() or "zira" in voice.name.lower() or "samantha" in voice.name.lower():
            selected_voice = voice.id
            break
    if not selected_voice:
        selected_voice = voices[0].id  # fallback to default
    
    engine.setProperty('voice', selected_voice)
    
    # Set speech style: cute, clear
    engine.setProperty('rate', 160)    # speed
    engine.setProperty('volume', 1.0)  # max volume
    
    engine.say(text)
    engine.runAndWait()

def main():
    if len(sys.argv) < 2:
        print("Usage: python cute_voice_reader.py <filename>")
        sys.exit(1)

    file_path = sys.argv[1]

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            text = f.read()
        speak_text(text)
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
