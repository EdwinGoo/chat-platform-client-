const getChatBotData = () => {
    $.ajax({
        url: "http://localhost:18080/chatbot/alldata",
        type: "GET",
        async: false,
        timeout: 5000,
        dataType: "json",
        contentType: "application/json",
        crossDomain: true,
        success: function (res2) {
            chat = res2;
            console.log(chat);
        },
        error: function (e) {
            console.log(e);
        }
    });
};

const helloChatBot = () => {
    // ajax로 상담 시작 시 인사말 호출?
    return "안녕하세요. 오토에버입니다. 문의하실 서비스 유형을 선택해주세요."
}