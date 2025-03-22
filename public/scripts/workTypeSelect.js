const cards = document.querySelectorAll(".card");

// クリックでカードのハイライトを変更
cards.forEach(card => {
    card.addEventListener("click", () => {
        cards.forEach(c => c.style.backgroundColor = ""); // 他の選択肢をリセット
        card.style.backgroundColor = "#007ACC"; // 選択したカードをハイライト
    });
});

// 各年代に対応する収入を設定する
function setIncomeAndNavigate(cardId, incomeValues) {
    document.getElementById(cardId).addEventListener("click", () => {

        let currentAge = localStorage.getItem("currentAge");
        let financialData = JSON.parse(localStorage.getItem("financialData")) || {};

        if (incomeValues[currentAge]) {
            // 各年代の収入を設定
            financialData[currentAge].income = incomeValues[currentAge]; // 各年代収入
            localStorage.setItem("financialData", JSON.stringify(financialData));
        }
        window.location.href = "livingExpensesSelectDisplay.html";
    });
}

// 各カードに対応する収入を定義
const incomeMapping = {
    "workTypeFullSingle": { "60代": 3000, "70代": 2200, "80代": 2200, "90代": 2200, "100代": 2200 },
    "workTypePartSingle": { "60代": 900, "70代": 600, "80代": 600, "90代": 600, "100代": 600 },
    "workTypeFullCouple": { "60代": 4900, "70代": 4300, "80代": 4300, "90代": 4300, "100代": 4300 },
    "workTypeFullPartCouple": { "60代": 4000, "70代": 2700, "80代": 2700, "90代": 2700, "100代": 2700 },
    "workTypeFullHouseWifeCouple": { "60代": 3000, "70代": 2700, "80代": 2700, "90代": 2700, "100代": 2700 },
    "workTypeSelfCouple": {"60代": 3000, "70代": 3500, "80代": 2200, "90代": 2200, "100代": 2200 }
};


// 各カードに対するイベント
const availableCards = Array.from(document.querySelectorAll(".card")).map(card => card.id);

Object.entries(incomeMapping).forEach(([cardId, incomeValues]) => {

    // カードが存在しなければ処理をスキップ
    if (!availableCards.includes(cardId)) {
        return;
    }
    setIncomeAndNavigate(cardId, incomeValues);
});

