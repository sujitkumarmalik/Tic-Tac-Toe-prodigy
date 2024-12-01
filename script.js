let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let modeBtn = document.querySelector("#mode-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let gameOver = false;
let aiMode = false; // Switch for AI mode

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turnO = true;
    gameOver = false;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "";
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = winner ? `The Winner is: ${winner}` : "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    if (gameOver) return;

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[b].innerText === boxes[c].innerText) {
            gameOver = true;
            showWinner(boxes[a].innerText);
            return;
        }
    }

    if ([...boxes].every((box) => box.innerText)) {
        gameOver = true;
        showWinner(null);
    }
};

const makeAiMove = () => {
    const availableBoxes = [...boxes].filter((box) => !box.innerText);
    if (availableBoxes.length > 0) {
        const randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        randomBox.innerText = "X";
        randomBox.style.color = "blue";
        randomBox.disabled = true;
        checkWinner();
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return;

        if (turnO) {
            box.innerText = "O";
            box.style.color = "yellow";
        } else if (!aiMode) {
            box.innerText = "X";
            box.style.color = "blue";
        }
        box.disabled = true;
        checkWinner();

        if (!gameOver && aiMode && turnO) {
            turnO = false;
            setTimeout(() => {
                makeAiMove();
                turnO = true;
            }, 500);
        } else {
            turnO = !turnO;
        }
    });
});

modeBtn.addEventListener("click", () => {
    aiMode = !aiMode;
    modeBtn.innerText = aiMode ? "Switch to Player Mode" : "Switch to AI Mode";
    resetGame();
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
