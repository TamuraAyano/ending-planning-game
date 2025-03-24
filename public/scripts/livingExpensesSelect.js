const cards = document.querySelectorAll(".card");

// 各年代に対応する生活費を設定する
function setLivingExpensesAndNavigate(cardId, livingExpensesValues) {
    document.getElementById(cardId).addEventListener("click", () => {
        let currentAge = localStorage.getItem("currentAge");
        let financialData = JSON.parse(localStorage.getItem("financialData")) || {};

        if (livingExpensesValues[currentAge]) {
            financialData[currentAge].livingExpenses = livingExpensesValues[currentAge]; // 10年間の生活費
            localStorage.setItem("financialData", JSON.stringify(financialData));
        }

        if (currentAge === "90代") {
            // 90年代の場合、老人ホーム入居画面へ
            localStorage.setItem("selectedLivingLevel", cardId)
            window.location.href = "homeEnterDisplay.html";

        } else if (currentAge === "100代")  {
            localStorage.setItem("selectedLivingLevel", cardId)

            // 100年代の場合、老人ホーム入居×婚姻歴×生活水準によって生活費を設定
            let careLocation = localStorage.getItem("careLocation"); // 介護場所
            let maritalStatus = localStorage.getItem("maritalStatus"); // 婚姻歴

            if (careLocation && maritalStatus && lifeExpensesMapping[careLocation][maritalStatus][cardId]) {
                let livingCost = lifeExpensesMapping[careLocation][maritalStatus][cardId];
                financialData[currentAge].livingExpenses = livingCost; 
                localStorage.setItem("financialData", JSON.stringify(financialData));

                // 娯楽費選択画面へ
                window.location.href = "entertainmentExpensesSelectDisplay.html";
            }
        } else {
            // 60~80年代は無条件で娯楽費選択画面へ
            window.location.href = "entertainmentExpensesSelectDisplay.html";
        }
    });
}

// 婚姻歴×生活水準カードに対応する生活費を定義
const livingExpensesMapping = {
    "single": {
        "low-life": { "60代": 1500, "70代": 1500, "80代": 1500 },
        "standard-life": { "60代": 1700, "70代": 1700, "80代": 1700 },
        "premium-life": { "60代": 2000, "70代": 2000, "80代": 2000 }
    },
    "couple": {
        "low-life": { "60代": 3000, "70代": 2200, "80代": 2200 },
        "standard-life": { "60代": 3400, "70代": 2600, "80代": 2600 },
        "premium-life": { "60代": 3900, "70代": 3100, "80代": 3100 }
    }
};

// （100年代用）介護場所×婚姻歴×生活水準によって決まる生活費
const lifeExpensesMapping = {
    "home": { // 自宅介護
        "single": {
            "low-life": 1700,
            "standard-life": 1900,
            "premium-life": 2200
        },
        "couple": {
            "low-life": 2700,
            "standard-life": 3100,
            "premium-life": 3600
        }
    },
    "nursing_home": { // 老人ホーム介護
        "single": {
            "low-life": 1800,
            "standard-life": 2000,
            "premium-life": 2300
        },
        "couple": {
            "low-life": 2900,
            "standard-life": 3300,
            "premium-life": 3800
        }
    }
};

// maritalStatus に対応するデータを取得
const maritalStatus = localStorage.getItem("maritalStatus");
const selectedLivingExpenses = livingExpensesMapping[maritalStatus];

if (selectedLivingExpenses) {
    Object.entries(selectedLivingExpenses).forEach(([cardId, livingExpensesValues]) => {
        setLivingExpensesAndNavigate(cardId, livingExpensesValues);
    });
}

// 夫婦の場合、タイトル直後に補足テキストを挿入する
if (maritalStatus === "couple") {
    const title = document.querySelector("h1");
    const note = document.createElement("p");
    note.textContent = "※夫婦の場合は月額2倍";
    title.insertAdjacentElement("afterend", note);
}
