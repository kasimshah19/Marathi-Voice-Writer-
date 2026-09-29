from gtts import gTTS
import os

text = "आज मला पुण्याला जायचं आहे."
tts = gTTS(text=text, lang='mr')
tts.save("test_marathi.mp3")
print("Audio saved as test_marathi.mp3")
