const bot = function () {

    const peekobot = document.getElementById('chatbox_body_content');
    const container = document.getElementById('chatbox_body_inner');
    const inner = document.getElementById('chatbox_body_bot');
    let restartButton = null;

    const sleep = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const scrollContainer = function () {
        inner.scrollTop = inner.scrollHeight;
    };

    const insertNewChatItem = function (elem) {
        //container.insertBefore(elem, peekobot);

        // 질문에 리스트 넣는 부분
        // 원작과 다르게 기존 채팅과 감싸져 있는 부분이 다름
        // 원작은 3번 감싸고 chatting쪽 부분은 2번감싸고 ㄷㄷ;;
        container.appendChild(elem);
        scrollContainer();
        //debugger;
        elem.classList.add('activated');
    };

    const printResponse = async function (step) {
        console.log("print Response");
        const response = document.createElement('div');
        response.classList.add('chat-response');
        response.innerHTML = step.text;
        insertNewChatItem(response);

        await sleep(1500);

        if (step.options) {
            const choices = document.createElement('div');
           
            choices.classList.add('choices');
            step.options.forEach(function (option) {
                const button = document.createElement(option.url ? 'a' : 'button');
                button.classList.add('choice');
                button.innerHTML = option.text;
                if (option.url) {
                    button.href = option.url;
                } else {
                    button.dataset.next = option.next;
                }
                choices.appendChild(button);
            });
            insertNewChatItem(choices);
        } else if (step.next) {
            printResponse(chat[step.next]);
        }
    };

    const printChoice = function (choice) {
        const choiceElem = document.createElement('div');
        choiceElem.classList.add('chat-ask');
        choiceElem.innerHTML = choice.innerHTML;
        insertNewChatItem(choiceElem);
    };

    const disableAllChoices = function () {
        const choices = document.querySelectorAll('.choice');
        choices.forEach(function (choice) {
            choice.disabled = 'disabled';
        });
        return;
    };

    const handleChoice = async function (e) {

        if (!e.target.classList.contains('choice') || 'A' === e.target.tagName) {
            // Target isn't a button, but could be a child of a button.
            var button = e.target.closest('#chatbox_body_content.choice');

            if (button !== null) {
                button.click();
            }

            return;
        }

        e.preventDefault();
        const choice = e.target;

        disableAllChoices();

        printChoice(choice);
        scrollContainer();

        await sleep(1500);

        if (choice.dataset.next) {
            printResponse(chat[choice.dataset.next]);
        }
        // Need to disable buttons here to prevent multiple choices
    };

    const handleRestart = function () {
        startConversation();
    }

    const startConversation = function () {
        printResponse(chat[1]);
    }

    const init = function () {
        container.addEventListener('click', handleChoice);

        restartButton = document.createElement('button');
        restartButton.innerText = "Restart";
        restartButton.classList.add('restart');
        restartButton.addEventListener('click', handleRestart);

        container.appendChild(restartButton);

        startConversation();
    };

    init();
}

bot();