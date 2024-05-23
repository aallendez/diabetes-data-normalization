function sendInformation() {
    const pregnancies = document.getElementById('pregnancies').value;
    const glucose = document.getElementById('glucose').value;
    const pressure = document.getElementById('pressure').value;
    const bodyMassIndex = document.getElementById('bodyMassIndex').value;
    const diabetesPedigree = document.getElementById('diabetesPedigree').value;

    const overlay = document.getElementById('overlay');
    overlay.classList.remove('hidden');

    const resultDisplay = document.createElement('div');
    resultDisplay.className = "absolute z-100 bg-white rounded-lg p-6 w-96 h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";

    fetch('/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pregnancies: pregnancies,
            glucose: glucose,
            pressure: pressure,
            bodyMassIndex: bodyMassIndex,
            diabetesPedigree: diabetesPedigree
        })
    })
    .then(response => response.json())
    .then(data => {
        const pregnancies = data.pregnancies;
        const glucose = data.glucose;
        const pressure = data.bloodPressure;
        const bodyMassIndex = data.bodyMassIndex;
        const diabetesPedigree = data.diabetesPedigree;

        resultDisplay.innerHTML = `
            <div class="color-black animate-fade-in-up">
                <h3 class="text-xl font-bold text-center p-2">
                    Normalized New Data:
                </h3>
                <p class="p-2">
                    Pregnancies: ${pregnancies}<br>
                    Glucose: ${glucose}<br>
                    Pressure: ${pressure}<br>
                    Body Mass Index: ${bodyMassIndex}<br>
                    Diabetes Pedigree: ${diabetesPedigree}<br>
                </p>
            </div>`;

        overlay.appendChild(resultDisplay);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


const animation = {
    display: function(overlay) {
        this.animationDiv = document.createElement('div');
        this.animationDiv.className = 'animate-fade-in-right flex w-16 h-auto font-extralight text-sm p-3 bg-gray-100 rounded-md my-2';
        this.animationDiv.innerHTML = '<div class="w-full"><dotlottie-player src="https://lottie.host/c6ea81a5-6ab8-4bcc-b837-1f71b6a0fae9/4S47B5hFkB.json" background="transparent" speed="1" style="width: 100%; height: auto;" loop autoplay></dotlottie-player></div>';
        overlay.appendChild(this.animationDiv);
        overlay.scrollTop = overlay.scrollHeight;
    },
    remove: function(overlay) {
        overlay.removeChild(this.animationDiv);
    }
};

function displayAnimation() {
    const animationDiv = document.createElement('div');
    animationDiv.className = 'animate-fade-in-right flex w-16 h-auto font-extralight text-sm p-3 bg-gray-100 rounded-md my-2';
    animationDiv.innerHTML = '<div class="w-full"><dotlottie-player src="https://lottie.host/c6ea81a5-6ab8-4bcc-b837-1f71b6a0fae9/4S47B5hFkB.json" background="transparent" speed="1" style="width: 100%; height: auto;" loop autoplay></dotlottie-player></div>';
    const overlay = document.getElementById('overlay');
    overlay.appendChild(animationDiv);
    overlay.scrollTop = overlay.scrollHeight;
}

function removeAnimation() {
    const overlay = document.getElementById('overlay');
    const animationDiv = overlay.querySelector('.animate-fade-in-right');
    if (animationDiv) {
        overlay.removeChild(animationDiv);
    }
}
