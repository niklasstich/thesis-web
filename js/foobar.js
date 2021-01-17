function TextToSpeech() {
    var utterance = new SpeechSynthesisUtterance('this shit is scary as fuck no cap on a stack');
    utterance.lang = 'en'; //Sprache auf Deutsch festlegen
    utterance.onerror = console.log;
    utterance.onstart = console.log;
    speechSynthesis.speak(utterance);
}