// 初期画面を開くときはローカルストレージをクリア
localStorage.clear();
console.log("スクリプト開始");

// ホーム画面のボタン
const startBtn = document.getElementById("start-button");

// currentAge のチェック
console.log("currentAge の値:", localStorage.getItem("currentAge"));

if (!localStorage.getItem("currentAge")) {
    console.log("currentAge が未設定。60に設定");
    localStorage.setItem("currentAge", "60代");
}

console.log("financialData の値:", localStorage.getItem("financialData"));

if (!localStorage.getItem("financialData")) {
    console.log("financialData が未設定。初期化");
    const financialData = {
        "60代": { startMoney: 0, income: 0, totalIncome: 0, livingExpenses: 0, homeCost: 0, entertainment: 0, insurance: 0, totalExpenses: 0, lifeEvent: 0, balance: 0 },
        "70代": { startMoney: 0, income: 0, totalIncome: 0, livingExpenses: 0, homeCost: 0, entertainment: 0, insurance: 0, totalExpenses: 0, lifeEvent: 0, balance: 0 },
        "80代": { startMoney: 0, income: 0, totalIncome: 0, livingExpenses: 0, homeCost: 0, entertainment: 0, insurance: 0, totalExpenses: 0, lifeEvent: 0, balance: 0 },
        "90代": { startMoney: 0, income: 0, totalIncome: 0, livingExpenses: 0, homeCost: 0, entertainment: 0, insurance: 0, totalExpenses: 0, lifeEvent: 0, balance: 0 },
        "100代": { startMoney: 0, income: 0, totalIncome: 0, livingExpenses: 0, homeCost: 0, entertainment: 0, insurance: 0, totalExpenses: 0, lifeEvent: 0, balance: 0 }
    };

    try {
        localStorage.setItem("financialData", JSON.stringify(financialData));
        console.log("financialData の保存成功");
    } catch (e) {
        console.error("financialData の保存エラー:", e);
    }
}

// ホーム画面 見積もり開始ボタン押下
if (startBtn) {
    startBtn.addEventListener("click", () => {
        console.log("ゲーム開始");
        window.location.href = "marriedSelectDisplay.html";
    });
}
