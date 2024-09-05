console.log("[DEBUG] load extension");

window.addEventListener('load', main, false);
window.addEventListener('popstate', main);
window.addEventListener('pushstate', main);
window.addEventListener('replacestate', main);

const loadFontAwesome = () => {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://use.fontawesome.com/releases/v5.13.1/css/all.css';
    document.head.insertAdjacentElement('beforeEnd', link);
};

function main(event) {
    const jsInitCheckTimer = setInterval(jsLoaded, 100);

    // fontawesomeのロード
    loadFontAwesome();
    
    function jsLoaded() {
        if (document.querySelector('#copyKey-help') != null) {
            clearInterval(jsInitCheckTimer);

            // ボタンを追加する場所を選択
            let existingButton = document.querySelector('#copyKey-help');

            // ボタン要素を作成
            let newButton = document.createElement('button');
            // ボタンのテキストを設定
            newButton.innerHTML = '<i class="far fa-copy"></i>';
            newButton.classList.add('new-button');

            // ボタンを追加
            existingButton.appendChild(newButton);

            // ボタンが押された時の処理
            newButton.addEventListener('click', function() {
                let currentUrl = window.location.href;
                let ticket_key = document.querySelector(".ticket__key-number").innerText;
                let subject = document.querySelector(".markdown-body").innerText;
                let title = ticket_key + " " + subject;

                let htmlLink = '<a href="' + currentUrl + '">' + title + '</a>';
                const blob = new Blob([htmlLink], { type: 'text/html' });
                const blobPlain = new Blob([title], { type: 'text/plain' });
                const data = [new window.ClipboardItem({ 'text/html': blob, 'text/plain': blobPlain })];

                navigator.clipboard.write(data)
                    .then(function() {
                        console.log('Title copied to clipboard');
                    })
                    .catch(function(error) {
                        console.error('Failed to copy title', error);
                    });
            });
        }
    }
}