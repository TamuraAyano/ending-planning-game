const cards = document.querySelectorAll(".card");

// 現在の年代を取得
let currentAge = localStorage.getItem("currentAge");

// 各カードに対応する娯楽費を定義
const enterTainmentExpensesMapping = {
    "noEntertainment": 0,
    "month5000Entertainment": 50,
    "month10000Entertainment": 100,
    "month20000Entertainment": 300,
    "month40000Entertainment": 500
};

// クリックでカードのハイライトを変更
let selectedOption = "";
cards.forEach(card => {
    card.addEventListener("click", () => {
        cards.forEach(c => c.style.backgroundColor = ""); // 他の選択肢をリセット
        card.style.backgroundColor = "#007ACC"; // 選択したカードをハイライト
        selectedOption = card.id;

        // 選択されたカードのIDに対応する金額を取得
        let financialData = JSON.parse(localStorage.getItem("financialData")) || {};

        console.log(currentAge);
        console.log(financialData[currentAge]);
        console.log(card.id);
        console.log(enterTainmentExpensesMapping[selectedOption]);

        // 試算中の年代の娯楽費を設定
        if (currentAge && financialData[currentAge] && enterTainmentExpensesMapping[selectedOption] !== undefined) {
            financialData[currentAge].entertainment = enterTainmentExpensesMapping[selectedOption]; // 10年間の娯楽費
            localStorage.setItem("financialData", JSON.stringify(financialData));
        }

        // 遷移処理を setTimeout で少し遅延させ、保存処理が確実に完了するようにする
        setTimeout(() => {
            if (currentAge === "60代" || currentAge === "70代") {
                window.location.href = "insuranceSelectDisplay.html";
            } else {
                window.location.href = "lifeEventSelectDisplay.html";
            }
        }, 100); // 100ミリ秒の遅延
    });
});