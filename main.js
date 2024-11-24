let gameName = "Guess The World";
document.title= gameName;
document.querySelector("h1").innerHTML = gameName;


let numberOftries = 6;
let numbersOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2


let wordToguess = ""
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];

wordToguess = words[Math.floor(Math.random()* words.length)].toUpperCase()
console.log(wordToguess)

let messageArea = document.querySelector(".message")


function generateInput(){
    let inputsContainer = document.querySelector(".inputs")
    for(let i =1; i <= numberOftries; i++){
    let tryDiv= document.createElement("div")
    tryDiv.classList.add(`try-${i}`)
    tryDiv.innerHTML = `<span>Try ${i}</span>`
    if(i !== 1)tryDiv.classList.add("hidden")
   for(let j =1; j <= numbersOfLetters; j++){
    let input = document.createElement("input")
    input.type = "text";
    input.id = `guess-${i}-letter-${j}`
    input.setAttribute("maxlength", "1")
    tryDiv.appendChild(input)
   }
   inputsContainer.appendChild(tryDiv)
    }
inputsContainer.children[0].children[1].focus();
let inputshidden = document.querySelectorAll(".hidden input")
inputshidden.forEach((input)=> input.disabled = true)
let inputs = document.querySelectorAll("input")
inputs.forEach((input, index)=>{
    input.addEventListener("input", function(){
        if(this.value !== ""){
            this.value = this.value.toUpperCase();
            let nextInput = inputs[index + 1];
            if(nextInput) nextInput.focus();
        }      
    })
    input.addEventListener("keydown", function(event){
        const currentIndex = Array.from(inputs).indexOf(this)
        if(event.key === "ArrowRight"){
           const nextInput = currentIndex + 1
           if(nextInput < inputs.length) inputs[nextInput].focus()
        }
        if(event.key === "ArrowLeft"){
           const prevInput = currentIndex - 1
           if(prevInput >= 0) inputs[prevInput].focus()
        }
    })
})
}

const guessButton = document.querySelector(".check");
const guessHint = document.querySelector(".hint")


guessButton.addEventListener("click", handleGuesses);


function handleGuesses(){
    let successGuess = true;
    for(let i = 1; i <= numbersOfLetters; i++){
        let inputFiled = document.querySelector(`#guess-${currentTry}-letter-${i}`)
        const letter = inputFiled.value.toUpperCase();
    
        const guessLetter = wordToguess[i - 1]
       
       if (letter === guessLetter){
            inputFiled.classList.add('in-place')

        }else if(wordToguess.includes(letter) && letter !== ""){
            inputFiled.classList.add("not-in-place")
            successGuess = false;
        }else{
            inputFiled.classList.add("no")
            successGuess = false;
        }
    }
    if(successGuess){
        guessButton.innerHTML=`<span>Congratulations, You won</span>`
        let allTries = document.querySelectorAll(".inputs div")
        allTries.forEach((tryDiv)=> tryDiv.classList.add("hidden"))
        guessButton.style.cssText = "background-color: #000000c4; color: #e7b00b; font-weight: bold; opacity: 1;"
        if(numberOfHints === 2){
           guessButton.innerHTML = `<span>Congratulations, You won</span>`
           guessHint.innerHTML = `<span>No, Hints</span>`
        guessButton.style.cssText = "background-color: #000000c4; color: #e7b00b; font-weight: bold; opacity: 1;"
        guessHint.style.cssText = "background-color: #000000c4; color: #e7b00b; font-weight: bold; opacity: 1;"
        }
        guessButton.disabled = true;
        guessHint.disabled = true;
    }else{
      document.querySelector(`.try-${currentTry}`).classList.add("hidden")
        let currentInput = document.querySelectorAll(`.try-${currentTry} input`)
        currentInput.forEach((input)=> input.disabled = true)
        currentTry++
        let nextTryInput= document.querySelectorAll(`.try-${currentTry} input`)
        nextTryInput.forEach((input)=> input.disabled = false)
        let ele = document.querySelector(`.try-${currentTry}`)
        if(ele){
            ele.classList.remove("hidden")
            ele.children[1].focus();
        }else{
            guessButton.disabled = true;
            guessHint.disabled = true;
          guessButton.innerHTML=`You Lose, The Word Is <span>${wordToguess.toLocaleUpperCase()}</span>`
        }
    }
    }

    document.querySelector(".hint span").innerHTML = numberOfHints

guessHint.addEventListener("click", handleHint)

function handleHint(){
   if(numberOfHints > 0){
    numberOfHints--
    document.querySelector(".hint span").innerHTML = numberOfHints
   }
   if(numberOfHints === 0){
    guessHint.disabled = true;
   }
  const enableInputs = document.querySelectorAll("input:not([disabled])")
  const emtyInput = Array.from(enableInputs).filter((input)=> input.value === "")

  if(emtyInput.length > 0){
let randomIndex = Math.floor(Math.random()* emtyInput.length)
let randomInput = emtyInput[randomIndex]
let indexToFill = Array.from(enableInputs).indexOf(randomInput)
if(indexToFill !== -1){
    randomInput.value = wordToguess[indexToFill]
    randomInput.focus();
}
  }
}

document.addEventListener("keydown", handlebackspace)

function handlebackspace(event){
    if(event.key === "Backspace"){
        const enableInputs = document.querySelectorAll("input:not([disabled])")
        const activeElement = Array.from(enableInputs).indexOf(document.activeElement)
        const currentInput = enableInputs[activeElement]
        const prevInput = enableInputs[activeElement - 1]
        if(activeElement > 0){
        currentInput.value = ""
        prevInput.focus()
        }
    }

}

window.onload = function(){
    generateInput()
}