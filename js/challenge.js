let h1Counter = document.getElementById("counter");

let currentCount = 0;
let previousCount = 0;
let likeCounter = 0;
let lastLi;
let isPaused = false;
let interval = setTimer();

const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
const likeBtn = document.getElementById("heart");
const pauseBtn = document.getElementById("pause");
const likedContainer = document.getElementsByClassName("likes");
const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("list");

function setTimer() {
    return setInterval(() => {
        currentCount++;
        h1Counter.textContent = currentCount;
    }, 1000);
}

function displayList(likeDisplay) {
    lastLi = document.createElement("li");
    lastLi.innerHTML = likeDisplay;
    likedContainer[0].appendChild(lastLi);
}

plusBtn.addEventListener("click", () => {
    currentCount += 1;
    h1Counter.textContent = currentCount;
});

minusBtn.addEventListener("click", () => {
    currentCount -= 1;
    h1Counter.textContent = currentCount;
});

likeBtn.addEventListener("click", () => {
    if(currentCount !== previousCount) {
        likeCounter = 1;
        previousCount = currentCount;
        displayList(`${previousCount} has been liked <span class="likedNum">${likeCounter}</span> ${likeCounter === 1 ? "time" : "times"}`);
    } else {
        likeCounter += 1;

        if(lastLi) {
            lastLi.innerHTML = `${previousCount} has been liked <span class="likedNum">${likeCounter}</span> ${likeCounter === 1 ? "time" : "times"}`;
        } else {
            displayList(`${previousCount} has been liked <span class="likedNum"> ${likeCounter}</span> ${likeCounter === 1 ? "time" : "times"}`);
        }
    }
});

pauseBtn.addEventListener("click", () => {
    isPaused = !isPaused;
    
    if(isPaused) {
        plusBtn.disabled = true;
        minusBtn.disabled = true;
        likeBtn.disabled = true;
        pauseBtn.textContent = "resume";
        clearInterval(interval);
    } else {
        plusBtn.disabled = false;
        minusBtn.disabled = false;
        likeBtn.disabled = false;
        pauseBtn.textContent = "pause";
        interval = setTimer();
    }
});

commentForm.addEventListener("submit", event => {
    event.preventDefault();
    const comment = document.createElement("p");
    comment.textContent = event.target[0].value;
    commentList.appendChild(comment);
    event.target[0].value = "";
})
