
const dice = document.getElementById("dice-image");
const rollButton = document.getElementById("rollButton");
const nextButton = document.getElementById("nextButton");
const careTitle = document.getElementById("care-title");
const careCostMessage = document.getElementById("care-cost-message");
const selection = document.querySelector(".selection");
const serviceCards = document.querySelectorAll(".lifeLevelCard");

document.getElementById("rollButton").addEventListener("click", function () {
    // 「次へ進む」ボタンのクリックで画面遷移
    nextButton.addEventListener("click", function () {
        window.location.href = "entertainmentExpensesSelectDisplay.html";
    });

    // サイコロを振る
    rollDice();

    // 介護場所によって決まる生活費
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

    // 婚姻歴と選択カードで決まる老人ホーム入居費
    const homeEnterExpensesMapping = {
        "single": {
            "low-life": 500,
            "standard-life": 1000,
            "premium-life": 2000
        },
        "couple": {
            "low-life": 1000,
            "standard-life": 2000,
            "premium-life": 4000
        }
    };

    // 婚姻歴を取得
    const maritalStatus = localStorage.getItem("maritalStatus");

    // 一回目のサイコロ判定（老人ホーム入居要否を決定）
    function rollDice() {

        // ボタンを一時的に無効化（連打防止）
        rollButton.disabled = true;

        // サイコロの回転アニメーション
        dice.style.animation = "rolling 0.5s infinite";

        // 1秒後に結果を表示
        setTimeout(() => {
            // アニメーションをリセット
            dice.style.animation = "";

            // 1〜6のランダムな目を取得
            //const diceNum = Math.floor(Math.random() * 6) + 1;
            const diceNum = 6;
            dice.src = `/assets/dice${diceNum}.png`; // サイコロの画像を変更

            // UIを初期化
            serviceCards.forEach(card => card.classList.add("hidden"));

            // 結果に応じてメッセージを変更
            if (diceNum === 1 || diceNum === 2) {
                careTitle.textContent = '介護場所は「自宅」になりました！';
                localStorage.setItem("careLocation", "home");

                // 老人ホーム入居費用を0円とする
                let financialData = JSON.parse(localStorage.getItem("financialData")) || {};
                console.log(financialData);

                financialData["90代"].homeCost = 0;
                localStorage.setItem("financialData", JSON.stringify(financialData));
                careCostMessage.textContent = '入居費用は0円です。';

                // 生活費を設定（自宅介護の生活費）
                setLivingExpenses(localStorage.getItem("careLocation"));

                nextButton.classList.remove("hidden");
                rollButton.classList.add("hidden");

            } else {
                // 生活費を設定（老人ホーム介護の生活費）
                localStorage.setItem("careLocation", "nursing_home");
                setLivingExpenses(localStorage.getItem("careLocation"));

                careTitle.textContent = '介護場所は「老人ホーム」になりました！';
                careCostMessage.textContent = 'もう一度サイコロを振って、施設の種類を決めましょう。';
                rollButton.textContent = 'もう一度サイコロを振る';
                rollButton.onclick = rollSecondDice;
            }

            // ボタンを再び有効化
            rollButton.disabled = false;
        }, 1000);
    }

    // 2回目のサイコロ判定（老人ホームの種類決定）
    function rollSecondDice() {
        rollButton.disabled = true;
        dice.style.animation = "rolling 0.5s infinite";

        setTimeout(() => {
            dice.style.animation = "";
            const diceNum = Math.floor(Math.random() * 6) + 1;
            dice.src = `/assets/dice${diceNum}.png`;

            if (diceNum === 1) {
                careTitle.textContent = '特別養護老人ホームへの入居が決定しました！';
                // 老人ホーム入居費用を0円とする
                let financialData = JSON.parse(localStorage.getItem("financialData")) || {};
                financialData["90代"].homeCost = 0;
                localStorage.setItem("financialData", JSON.stringify(financialData));
                careCostMessage.textContent = '入居費用は0円です。';

                // 「次へ進む」ボタンを表示し、ロールボタンを非表示にする
                nextButton.classList.remove("hidden");
                rollButton.classList.add("hidden");

            } else {
                careTitle.textContent = '有料老人ホームへの入居が決定しました！';
                careCostMessage.textContent = '希望するサービス水準を選択してください';

                // サイコロコンテンツを削除（画面から消す）
                const diceContainer = document.querySelector(".dice-area");
                if (diceContainer) {
                    diceContainer.remove();
                }

                // 生活水準選択画面を表示
                selection.classList.remove("hidden");

                // `display` をリセットして、CSSの `display: grid;` を適用
                selection.style.removeProperty("display");

                // サービス水準選択カードの hidden を削除
                serviceCards.forEach(card => {
                    card.classList.remove("hidden");
                });

                // ボタンを削除
                rollButton.classList.add("hidden");
                nextButton.classList.add("hidden");
            }

            rollButton.disabled = false;
        }, 1000);
    }

    // サービス水準選択の処理（婚姻歴で入居費を決定）
    serviceCards.forEach(card => {
        card.addEventListener("click", () => {
            console.log("処理開始");
            serviceCards.forEach(c => c.classList.remove("selected")); // 選択済みのものがあればリセット
            card.classList.add("selected"); // 再設定

            // 90代の老人ホーム入居費用に選択した値を設定
            const selectedId = card.id;
            console.log(selectedId);

            if (maritalStatus && homeEnterExpensesMapping[maritalStatus] && homeEnterExpensesMapping[maritalStatus][selectedId]) {
                // 婚姻歴と選択したサービス水準に対応した金額を取得
                const selectedCost = homeEnterExpensesMapping[maritalStatus][selectedId];

                let financialData = JSON.parse(localStorage.getItem("financialData")) || {};

                financialData["90代"].homeCost = selectedCost; // 老人ホーム入居費用
                financialData["90代"].totalExpenses += selectedCost; // 10年間の総支出に加算
                localStorage.setItem("financialData", JSON.stringify(financialData));

                window.location.href = "entertainmentExpensesSelectDisplay.html";
            }
        });
    });

    // 90年代の生活費設定処理
    function setLivingExpenses(careLocation) {
        if (!careLocation) return; // 介護場所が未設定なら処理しない

        // 生活水準選択画面の選択内容を取得
        const selectedLivingLevel = localStorage.getItem("selectedLivingLevel");
        if (!selectedLivingLevel || !maritalStatus) return;

        console.log("選択された生活水準:", selectedLivingLevel);

        // 介護場所×婚姻歴×希望生活水準の組み合わせで90年代の生活費を設定
        if (lifeExpensesMapping[careLocation] && lifeExpensesMapping[careLocation][maritalStatus][selectedLivingLevel]) {
            const selectedLivingCost = lifeExpensesMapping[careLocation][maritalStatus][selectedLivingLevel];

            let financialData = JSON.parse(localStorage.getItem("financialData")) || {};

            if (!financialData["90代"]) {
                financialData["90代"] = {};
            }

            // 90年代の生活費設定
            financialData["90代"].livingExpenses = selectedLivingCost;
            localStorage.setItem("financialData", JSON.stringify(financialData));

            console.log("90代の生活費を設定:", selectedLivingCost);
        }
    }
});
