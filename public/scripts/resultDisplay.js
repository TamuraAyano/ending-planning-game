document.addEventListener("DOMContentLoaded", function () {
    // ローカルストレージから financialData を取得
    const financialData = JSON.parse(localStorage.getItem("financialData")) || {};

    // 各年代のデータをページに反映
    Object.keys(financialData).forEach(age => {
        const ageKey = age.replace("代", ""); // クラス名と合わせるための変換
        const data = financialData[age];

        // 各費用項目をHTMLに反映（PC・スマホ両方に対応）
        updateTextContent(`.age-${ageKey}.start-money`, data.startMoney);
        updateTextContent(`.age-${ageKey}.income`, data.income);
        updateTextContent(`.age-${ageKey}.total-income`, data.totalIncome);
        updateTextContent(`.age-${ageKey}.living-expenses`, data.livingExpenses);
        updateTextContent(`.age-${ageKey}.home-cost`, data.homeCost);
        updateTextContent(`.age-${ageKey}.entertainment`, data.entertainment);
        updateTextContent(`.age-${ageKey}.insurance`, data.insurance);
        updateTextContent(`.age-${ageKey}.total-expenses`, data.totalExpenses);
        updateTextContent(`.age-${ageKey}.life-event`, data.lifeEvent);
        updateTextContent(`.age-${ageKey}.balance`, data.balance);
    });

    // 最終的な貯蓄額は100代の balance を使用し、HTMLのspanに反映
    let finalSavings = financialData["100代"]?.balance || 0;

    // 貯蓄額表示形式の調整。マイナスを外す。プラスなら貯蓄額は0円に
    finalSavings = finalSavings > 0 ? 0 : Math.abs(finalSavings);

    // PC・スマホ版の合計額を更新（両方の要素を取得）
    updateTextContent("#totalSavings_pc", finalSavings, "万円");
    updateTextContent("#totalSavings_mobile", finalSavings, "万円");

    // "ゲームを終了する" ボタンをすべて取得
    const finishButtons = document.querySelectorAll(".finish-button");

    // すべての "ゲームを終了する" ボタンにクリックイベントを追加
    finishButtons.forEach(button => {
        button.addEventListener("click", function () {
            localStorage.clear(); // ローカルストレージを全削除
            window.location.href = "index.html";
        });
    });
});

/**
 * 指定したクラスの要素にテキストを設定（PC・スマホ版 両方対応）
 * @param {string} selector - 更新する要素のセレクタ
 * @param {number} value - 設定する値
 * @param {string} [unit="万円"] - 単位（デフォルトは "万円"）
 */
function updateTextContent(selector, value, unit = "万円") {
    document.querySelectorAll(selector).forEach(element => {
        element.textContent = `${value}${unit}`;
    });
}
