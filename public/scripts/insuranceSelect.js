const cards = document.querySelectorAll(".card");
const enterCard = document.getElementById("selectEnter");
const noEnterCard = document.getElementById("selectNoEnter");
const headerTitle = document.querySelector("h1"); // <h1>要素を取得
const insuranceGuide = document.getElementById("insuranceGuide");

// 現在の年代を取得
let currentAge = localStorage.getItem("currentAge");
let isInsuranceEntered = localStorage.getItem("insuranceEnter") === "true"; // 保険加入情報

console.log(currentAge === "60代");
console.log(isInsuranceEntered);

// 60代の場合のテキスト変更
if (currentAge === "60代") {
    headerTitle.textContent = "保険に加入しますか？";
}
// 70代の場合、保険加入状況によってテキストを変更
else if (currentAge === "70代") {
    if (isInsuranceEntered) {
        headerTitle.textContent = "保険を継続しますか？";
        insuranceGuide.textContent = "※保険を継続する場合、今後のライフイベントで300万まで保証が付きます";
    } else {
        headerTitle.textContent = "保険に加入しますか？";
    }
}

// クリックでカードのハイライトを変更

cards.forEach(card => {
    card.addEventListener("click", () => {
        cards.forEach(c => c.style.backgroundColor = ""); // 他の選択肢をリセット
        card.style.backgroundColor = "#007ACC"; // 選択したカードをハイライト
    });
});

// 保険に加入（継続）する場合
if (enterCard) {
    enterCard.addEventListener("click", () => {
        localStorage.setItem("insuranceEnter", "true"); // 保険加入状態を保存
        let financialData = JSON.parse(localStorage.getItem("financialData")) || {};

        // 独身の場合の保険料
        if (localStorage.getItem("maritalStatus") === "single") {
            financialData[currentAge].insurance = 50; // 10年間の支出に保険料50万を加算
        }

        // 夫婦の場合の保険料
        console.log(localStorage.getItem("maritalStatus"));
        if (localStorage.getItem("maritalStatus") === "couple") {
            console.log("夫婦は100万");
            financialData[currentAge].insurance = 100; // 10年間の支出に保険料100万を加算
        }
        localStorage.setItem("financialData", JSON.stringify(financialData));
        window.location.href = "lifeEventSelectDisplay.html";
    });
}

// 保険に加入（継続）しない場合
if (noEnterCard) {
    noEnterCard.addEventListener("click", () => {
        localStorage.setItem("insuranceEnter", "false"); // 保険加入しない
        window.location.href = "lifeEventSelectDisplay.html";
    });
}