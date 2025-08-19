import Tts from "react-native-tts";

const playAudio = async (text: string, language: string = "en-US"): Promise<void> => {
  Tts.setDefaultLanguage(language);
  await Tts.speak(text);
};

export default playAudio;