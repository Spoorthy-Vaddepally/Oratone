const convert = document.querySelector(".button");
const textarea = document.querySelector("textarea");
const voicelist = document.querySelector("select");

let synth = window.speechSynthesis;
let availablevoices = [];
let pitchControl=document.getElementById("pitch");
let rateControl=document.getElementById("rate");
let pitchValue = document.getElementById("pitch-value");
let rateValue = document.getElementById("rate-value");
pitchControl.addEventListener("input", () => {
    pitchValue.textContent = pitchControl.value;
});
rateControl.addEventListener("input", () => {
    rateValue.textContent = rateControl.value;
});
function voices() {
    availablevoices = synth.getVoices();
    
    if (availablevoices.length > 0) {
        populateVoices();
    } else {
        synth.onvoiceschanged = () => {
            availablevoices = synth.getVoices();
            populateVoices();
        };
    }
}

function populateVoices() {
    voicelist.innerHTML = "";

    availablevoices.forEach(voice => {
        let option = document.createElement("option");
        option.value = voice.name;
        option.textContent = `${voice.name} `;
        if (voice.name === "Google US English") {
            option.selected = true;
        }
        voicelist.appendChild(option);
    });
}
document.addEventListener("DOMContentLoaded", voices);

function texttospeech(text) {
    let utter = new SpeechSynthesisUtterance(text);
    let selectedVoice = availablevoices.find(voice => voice.name === voicelist.value);
    
    if (selectedVoice) {
        utter.voice = selectedVoice;
        utter.lang = selectedVoice.lang;
    }
    utter.pitch = parseFloat(pitchControl.value);
    utter.rate = parseFloat(rateControl.value);

    synth.speak(utter);
}
convert.addEventListener("click", e => {
    e.preventDefault();
    if (textarea.value.trim() !== "") {
        texttospeech(textarea.value);

    }
});
function animateBars() {
    const bars = document.querySelectorAll(".bar");
    setInterval(() => {
        bars.forEach(bar => {
            let newHeight = Math.random() * 120 + 50;
            bar.setAttribute("height", newHeight);
            bar.setAttribute("y", 150 - newHeight); 
        });
    }, 200);
}

animateBars();