function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onspeechstart = function () {
        document.querySelectorAll("animate").forEach(anim => {
            anim.beginElement()
        });
        let listenText = document.querySelector(".listen");
        if (listenText) {
            listenText.innerText = "Listening...";
        }
    };

    recognition.onresult = function (event) {
        document.getElementById('output').innerText = event.results[0][0].transcript;
    };

    recognition.onspeechend = function () {
        document.querySelectorAll("animate").forEach(anim => {
            anim.setAttribute("repeatCount", "0");
        });
        recognition.stop();
        let listenText = document.querySelector(".listen");
        if (listenText) {
            listenText.innerText = "";
        }
    };
    recognition.start();
}
