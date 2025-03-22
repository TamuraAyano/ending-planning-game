const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        cards.forEach(c => c.style.backgroundColor = ""); // 他の選択肢をリセット
        card.style.backgroundColor = "#007ACC"; // 選択したカードをハイライト

        // 独身or夫婦を管理
        const maritalStatus = card.id === "singleCard" ? "single" : "couple";
        localStorage.setItem("maritalStatus", maritalStatus);

        // 次ページに遷移
        const nextPage = maritalStatus === "single" ? "workTypeSingleDisplay.html" : "workTypeCoupleDisplay.html";
        window.location.href = nextPage;
    });
});
