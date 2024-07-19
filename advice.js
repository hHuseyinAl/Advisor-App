let speech = new SpeechSynthesisUtterance();
speech.lang="en-US"

const buton = document.querySelector("#buton");
const container = document.querySelector(".container");
const buton2Div = document.querySelector(".buton2Div");

buton.addEventListener("click", clickedButton);

function clickedButton() {
    buton.disabled = true;
    buton2Div.style.display = "none"
    container.removeChild(container.lastChild);

    fetch("https://api.adviceslip.com/advice")
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            addAdviceToUI(data.slip.advice);
            if (data.slip.advice) {
                buton2Div.style.display="flex"
            }
            setTimeout(() => {
                buton.disabled = false
            }, 2000);
        })
}


function addAdviceToUI(advice) {
    // <!-- <div class="card">
    //         <div class="card-body">
    //             This is some text within a card body.
    //         </div>
    //     </div> -->

    const div = document.createElement("div");
    div.className = "card";

    const div2 = document.createElement("div");
    div2.className = "card-body";
    div2.textContent = advice;

    div.appendChild(div2);
    container.appendChild(div);

    document.querySelector("#buton2").addEventListener("click", ()=>{
        window.speechSynthesis.cancel();
        speech.text=advice;
        window.speechSynthesis.speak(speech);
    })
}