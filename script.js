let remainingCards = [];
let drawnCards = [];
let gameSetup = {};

// คำสั่งไพ่
const cardActions = {
    A: "กินคนเดียว",
    2: "หาเพื่อนกิน 1 คน",
    3: "หาเพื่อนกิน 2 คน",
    4: "ซ้ายกิน",
    5: "กินรอบวง",
    6: "ขวากิน",
    7: "มินิเกมส์แข่งลากเสียง คนแพ้เป็นบัดดี้จนจบเกม",
    8: "พักผ่อน 1 นาที",
    9: "มินิเกม",
    10: "ทาแป้ง",
    J: "จับหน้า",
    Q: "เพื่อนไม่คบ",
    K: "ทำตามคำสั่ง",
};

// เริ่มเกม
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
    const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
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
    if (remainingCards.length === 0) {
        alert("ไพ่หมดแล้ว! คลิก 'เริ่มเกมใหม่' เพื่อเริ่มเกมอีกครั้ง.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    const card = remainingCards.splice(randomIndex, 1)[0];
    drawnCards.push(card);

    let action = cardActions[card.value];
    if (card.value === "9") {
        const minigameIndex = drawnCards.filter((c) => c.value === "9").length - 1;
        action = gameSetup.minigames[minigameIndex];
    } else if (card.value === "K" && drawnCards.filter((c) => c.value === "K").length > 1) {
        action = gameSetup.kingTask;
    }

    displayCardResult(card, action);

    // แสดงปุ่ม "เริ่มเกมใหม่" เมื่อไพ่หมด
    if (remainingCards.length === 0) {
        document.getElementById("restart-button").classList.remove("hidden");
    }
}

// แสดงผลลัพธ์ไพ่
function displayCardResult(card, action) {
    document.getElementById("card-result").innerHTML = `
        <div style="text-align: center;">
            
            <p>คุณสุ่มได้ไพ่: ${card.value} ${getSuitName(card.suit)}</p>
            
            <p>คำสั่ง: ${action}</p>
            <img src="./${card.value}_${card.suit}.png" alt="${card.value}" style="width: 100px; display: block; margin: 0 auto;">
        </div>
    `;
}


// ฟังก์ชันแปลงชนิดดอกไพ่
function getSuitName(suit) {
    const suitNames = ["โพดำ", "โพแดง", "ดอกจิก", "ข้าวหลามตัด"];
    return suitNames[suit - 1];
}

// ฟังก์ชันแปลงชื่อไฟล์รูปดอกไพ่
function getSuitImage(suit) {
    const suitImages = ["spades.png", "hearts.png", "clubs.png", "diamonds.png"];
    return suitImages[suit - 1];
}   x

// เริ่มเกมใหม่
function restartGame() {
    remainingCards = initializeDeck();
    drawnCards = [];
    document.getElementById("card-result").innerHTML = "";
    document.getElementById("restart-button").classList.add("hidden");
}
// เริ่มเกมใหม่
function restartGame() {
    location.reload(); // รีโหลดหน้าเว็บใหม่
}