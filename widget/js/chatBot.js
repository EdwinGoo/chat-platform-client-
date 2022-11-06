const getChatbotMessage = (id) => {
    const messageURL = `http://localhost:18080/chat/botMessage/${id}`
    var message_body;
    $.ajax({
        url: messageURL,
        type: "GET",
        async: false,
        timeout: 5000,
        dataType: "json",
        contentType: "application/json",
        crossDomain: true,
        success: function (res) {
            console.log(res.body);
            message_body = res.body;
        },
        error: function (e) {
            console.log(e);
        }
    });
    return message_body;
};
