document.querySelectorAll('.accordion-btn').forEach(button => {
    button.addEventListener('click', function () {
        let content = this.nextElementSibling;

        // クリックされた年代の内容だけ開閉
        content.classList.toggle("open");
    });
});

