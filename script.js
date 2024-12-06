let remainingCards = [];
let drawnCards = [];
let gameSetup = {};
let isPopupOpen = false;

const cardActions = {
    A: "กินคนเดียว",
    2: "หาเพื่อนกิน 1 คน",
    3: "หาเพื่อนกิน 2 คน",
    4: "ซ้ายกิน",
    5: "กินรอบวง",
    6: "ขวากิน",
    7: "มินิเกมส์",
    8: "พักผ่อน 1 นาที",
    9: "มินิเกม",
    10: "ทาแป้ง",
    Jack: "จับหน้า",
    Queen: "เพื่อนไม่คบ",
    King: "ทำตามคำสั่ง",
};

// แสดงหน้าตั้งค่า
function showSetup() {
    document.getElementById("intro-area").classList.add("hidden");
    document.getElementById("setup-popup").classList.remove("hidden");
}

// ตั้งค่าเกม
function startGameSetup() {
    const minigame1 = document.getElementById("minigame1").value.trim();
    const minigame2 = document.getElementById("minigame2").value.trim();
    const minigame3 = document.getElementById("minigame3").value.trim();
    const minigame4 = document.getElementById("minigame4").value.trim();
    const kingTask = document.getElementById("king-task").value.trim();

    if (!minigame1 || !minigame2 || !minigame3 || !minigame4 || !kingTask) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
        return;
    }

    gameSetup = {
        minigames: [minigame1, minigame2, minigame3, minigame4],
        kingTask,
    };

    remainingCards = initializeDeck();
    drawnCards = [];
    document.getElementById("setup-popup").classList.add("hidden");
    document.getElementById("game-area").classList.remove("hidden");
}

// สร้างสำรับไพ่
function initializeDeck() {
    const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
    const deck = [];
    for (const value of cards) {
        for (let suit = 1; suit <= 4; suit++) {
            deck.push({ value, suit });
        }
    }
    return deck;
}

// สุ่มไพ่
function drawCard() {
    if (isPopupOpen) return;

    if (remainingCards.length === 0) {
        alert("ไพ่หมดแล้ว! คลิก 'เริ่มเกมใหม่' เพื่อเริ่มเกมอีกครั้ง.");
        return;
    }

    const sound = document.getElementById("card-draw-sound");
    sound.play();

    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    const card = remainingCards.splice(randomIndex, 1)[0];
    drawnCards.push(card);

    let action = cardActions[card.value];
    if (card.value === "9") {
        const minigameIndex = drawnCards.filter((c) => c.value === "9").length - 1;
        action = gameSetup.minigames[minigameIndex] || "ไม่มีมินิเกม!";
    } else if (card.value === "King" && drawnCards.filter((c) => c.value === "King").length === 1) {
        action = gameSetup.kingTask;
    }

    showPopup(card, action);

    const historyArea = document.getElementById("history");
    const historyCard = document.createElement("img");
    historyCard.src = `./${card.value}_${card.suit}.png`;
    historyCard.alt = card.value;
    historyCard.className = "history-card";
    historyArea.appendChild(historyCard);
}

// แสดง popup
function showPopup(card, action) {
    isPopupOpen = true;
    const popupSound = document.getElementById("popup-sound");
    popupSound.play();

    const popupContent = document.getElementById("popup-content");
    popupContent.innerHTML = `
        <img src="./${card.value}_${card.suit}.png" alt="${card.value}" class="card-image">
        <p>ไพ่ที่คุณสุ่มได้: <strong>${card.value}</strong></p>
        <p>คำสั่ง: ${action}</p>
    `;
    document.getElementById("result-popup").classList.remove("hidden");
}

// ปิด popup
function closePopup() {
    isPopupOpen = false;
    document.getElementById("result-popup").classList.add("hidden");
}
