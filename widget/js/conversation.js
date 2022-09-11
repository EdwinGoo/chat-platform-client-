var chat=function (){
    $.ajax({
        url: "http://localhost:18080/chatbot/alldata",
        type: "GET",
        async: false,
        timeout: 5000,
        dataType: "json",
        contentType: "application/json",
        crossDomain: true,
        success: function (res2) {
            chat=res2;
            console.log(chat);
         
        },
        error: function (e) {
          console.log(e);
        },
      });
}
chat();
// const chat = {
//     "1": {
//         "text": 'sss 잘 오셨습니다. 지금부터 시스템의 문제점을 파악해보겠습니다.',
//         "options": [
//             {
//                 "text": "<strong>ITSM이 문제죠</strong>",
//                 next: 2
//             },
//             {
//                 text: "<strong>교육과정 등록이 어려워요</strong>",
//                 next: 3
//             },
//             {
//                 text: "<strong>담당자 찾기가 어려워요</strong>",
//                 next: 4
//             }
//         ]
//     },
//     "2": {
//         text: 'ITSM은 문제가 아니에요.'
     
//     },
//     "3": {
//         text: '교육과정을 어떻게 등록할때 어렵나요??',
//         options: [
//             {
//                 text: "<strong>설명이 복잡해요</strong>"
            
//             },
//             {
//                 text: "<strong>상담원 바꿔</strong>"
              
//             }
//         ]
//     },

//     "4": {
//         text: '담당자 퇴사함'
     
//     }
// };
