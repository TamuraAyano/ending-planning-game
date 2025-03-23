const eventCard = document.getElementById("eventCard");
const eventText = document.getElementById("eventText");
const eventMessage = document.querySelector(".event-container p");
const drawCardButton = document.getElementById("drawCardButton");

let insuranceMessage = document.createElement("p");
insuranceMessage.id = "insuranceMessage";

const isInsuranceEntered = localStorage.getItem("insuranceEnter") === "true";

// **年代を数値として取得し、"代"を付けて管理**
let currentAge = parseInt(localStorage.getItem("currentAge"), 10) || 60;
let currentAgeKey = `${currentAge}代`; // "60代", "70代", etc.

const insuranceCoveredEvents = [
    "地震の被害（軽）", "地震の被害（重）", "洪水の被害", "火事の被害",
    "自動車事故（軽）", "自動車事故（重）", "病気の治療"
];

const eventOutcomes = [
     { text: "小地震の被害", change: -500 },
     { text: "大地震の被害", change: -1000 },
     { text: "洪水の被害", change: -300 },
     { text: "火事の被害", change: -500 },
     { text: "軽い自動車事故", change: -30 },
     { text: "重い自動車事故", change: -100 },
     { text: "病気の治療", change: -100 },
     { text: "住宅リフォーム", change: -300 },
     { text: "少額の詐欺", change: -200 },
     { text: "高額の詐欺", change: -300 },
     { text: "泥棒の被害", change: -100 },
     { text: "少額宝くじ当選", change: 50 },
     { text: "高額宝くじ当選", change: 100 },
     { text: "懸賞で当選", change: 10 },
     { text: "子からの仕送り", change: 10 },
     { text: "へそくり発見！", change: 500 }
];

function getRandomEvent() {
    return eventOutcomes[Math.floor(Math.random() * eventOutcomes.length)];
}

function flipCard() {
    eventCard.classList.add("flipped");

    setTimeout(() => {
        let event = getRandomEvent();
        let finalChange = event.change;
        let insuranceApplied = false;

        // 保険適用対象者かチェック
        if (isInsuranceEntered && insuranceCoveredEvents.includes(event.text) && finalChange < 0) {
            insuranceApplied = true;
        }

        let financialData = JSON.parse(localStorage.getItem("financialData")) || {};

        // 保険適用処理
        if (insuranceApplied) {
            finalChange += 300;
            if (finalChange > 0) {
                finalChange = 0;
            }
        }

        if (!financialData[currentAgeKey]) {
            financialData[currentAgeKey] = {};
        }

        // ライフイベントの金額を反映
        financialData[currentAgeKey].lifeEvent = finalChange;

        // 試算中の年代の総収入額を計算
        financialData[currentAgeKey].totalIncome
            = financialData[currentAgeKey].startMoney + financialData[currentAgeKey].income;

        // 試算中の年代の総支出額を計算
        financialData[currentAgeKey].totalExpenses 
            = financialData[currentAgeKey].livingExpenses // 生活費
                + financialData[currentAgeKey].homeCost // 老人ホーム入居費用
                + financialData[currentAgeKey].entertainment // 娯楽費
                + financialData[currentAgeKey].insurance // 保険料


        // 試算中の年代の残高を計算（総収入-総支出）
        financialData[currentAgeKey].balance 
        = (financialData[currentAgeKey].totalIncome || 0) 
            - (financialData[currentAgeKey].totalExpenses || 0)
            + financialData[currentAgeKey].lifeEvent; // ライフイベント

        localStorage.setItem("financialData", JSON.stringify(financialData));

        // カード表示後はタイトルを差し替える
        document.getElementById("event-title").style.display = "none";;

        eventText.textContent = event.text;
        //eventMessage.textContent = `ライフイベント負担額は${finalChange.toLocaleString()}万円です！`;
        eventMessage.innerHTML = `<span class="label">ライフイベントの結果は</span><span class="amount">${finalChange.toLocaleString()}万円です！</span>`;

        if (insuranceApplied) {
            insuranceMessage.textContent = "※保険で300万円分補償されました";
            eventMessage.insertAdjacentElement("afterend", insuranceMessage);
        } else {
            insuranceMessage.textContent = "";
        }

        if (currentAge === 100) {
            drawCardButton.textContent = "結果を確認する";
        } else {
            const nextAge = currentAge + 10;
            drawCardButton.textContent = `${nextAge}代の試算を始める`;
        }

        drawCardButton.onclick = () => {
            if (currentAge === 100) {
                window.location.href = "resultDisplay.html";
            } else {
                const nextAge = currentAge + 10;
                const nextAgeKey = `${nextAge}代`;

                localStorage.setItem("currentAge", nextAgeKey);

                let financialData = JSON.parse(localStorage.getItem("financialData")) || {};

                // **次年代のデータを作成 & 繰越金を設定**
                financialData[nextAgeKey] = financialData[nextAgeKey] || {};
                financialData[nextAgeKey].startMoney = financialData[currentAgeKey]?.balance || 0;

                localStorage.setItem("financialData", JSON.stringify(financialData));

                window.location.href = "marriedSelectDisplay.html";
            }
        };
    }, 1000);
}

drawCardButton.addEventListener("click", () => {
    if (!eventCard.classList.contains("flipped")) {
        flipCard();
    }
});
