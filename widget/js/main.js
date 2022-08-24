var sock;
var stompClient;

document.onreadystatechange = function (e) {
  if (document.readyState === "complete") {
    console.log("document.onreadystatechange function");
    loadScript("./lib/jquery.min.js", window.jQuery, loadChatWindow);
    loadScript("./lib/sockjs.min.js", window.SockJS, loadSockJS);
    loadScript("./lib/stomp.min.js", window.Stomp, loadStomp);
  }
};
window.onload = function (e) {
  console.log("hi, inside window.onload function");
};

// 스크립트 로드
const loadScript = function (scriptNm, scriptObjCheck, afterCallback) {
  var isExist = false;
  if (scriptObjCheck) {
    console.log(`${scriptNm} is already loaded`);
    isExist = true;
    afterCallback();
  } else {
    var script_element = document.createElement("script");
    script_element.type = "text/javascript";
    script_element.src = scriptNm;
    document.getElementsByTagName("head")[0].appendChild(script_element);
    script_element.onload = function () {
      afterCallback();
      console.log(`${script_element.src} is loaded`);
    };
  }
  return isExist;
};

var loadStomp = function () {
  console.log(`loadStomp is loaded`);
};

var loadSockJS = function () {
  console.log(`loadSockJS is loaded`);
};

var loadChatWindow = function () {
  console.log(`loadChatWindow is loaded`);

  $("body").append(
    '<div class="chatbox chatbox--tray chatbox--empty">   ' +
      '<div class="chatbox__title">     ' +
      '<h5><a href="#">HELP ME</a></h5>     ' +
      '<button class="chatbox__title__tray">     <span></span>   ' +
      "</button>       " +
      '<button class="chatbox__title__close">    ' +
      "<span>     " +
      '<svg viewBox="0 0 12 12" width="12px" height="12px">      ' +
      '<line stroke="#FFFFFF" x1="11.75" y1="0.25" x2="0.25" y2="11.75"></line>  ' +
      '<line stroke="#FFFFFF" x1="11.75" y1="11.75" x2="0.25" y2="0.25"></line>    ' +
      "</svg>   " +
      "</span>  " +
      "</button>    " +
      "</div>   " +
      '<div class="chatbox__body" id="chatbox_body_content"> '    +
      '<div id="chatbox_body_inner"> '+
      '<div id="chatbox_body_bot"> '    +
      '</div>    ' +
      '</div>    ' +
      '</div>    ' +
      '<form class="chatbox__credentials">      ' +
      '<div class="form-group">      ' +
      '<label for="inputAccntId">Accntid:</label>     <input type="text" class="chatbox__credentials_input" id="inputAccntId" required>     ' +
      "</div>     " +
      '<div class="form-group">     ' +
      '<label for="inputName">Name:</label>     <input type="text" class="chatbox__credentials_input" id="inputName" required>    ' +
      "</div>     " +
      '<button type="submit" class="chatbox__credentials_btn">Enter Chat</button>     ' +
      "</form>     " +
      '<input type="hidden" id="roomUuid" name="roomUuid" value="">     ' +
      '<input type="hidden" id="roomId" name="roomId" value="">     ' +
      '<input type="text" id="user_input" name="user_input" class="chatbox__message" placeholder="메시지를 입력하세요."></input>     ' +
      "</div>"

    +'<script type="text/javascript" src="js/conversation.js"></script>+'
    +'<script type="text/javascript" src="js/peekobot.js"></script>'

  );

  var chatbox_div = $(".chatbox");
  var title_div = $(".chatbox__title");
  var close_bottom = $(".chatbox__title__close");
  var identity_form = $(".chatbox__credentials");

  function appendMessage(bodyJson) {
    console.log(bodyJson);

    if (bodyJson.type !== "MESSAGE") {
      var t = '<p class="systemText">' + bodyJson.message + "</p>";
    } else {
      if (bodyJson.senderId == $("#inputAccntId").val()) {
        var t = '<p class="userText">' + bodyJson.message + "</p>";
      } else {
        var t = '<p class="suggestions">' + bodyJson.message + "</p>";
      }
    }

    $("#chatbox_body_content").append(t);
    $("#user_input").val("");
    $("#chatbox_body_content").scrollTop(1e10);
  }

  const createRoom = (roomNm) => {
    console.log($("#helperLegacyId").val());
    var roomUuid = "";
    var reqURL = "http://localhost:18080/chat/room/";
    var jsonDate = {
      roomNm: roomNm,
      legacyId: $("#helperLegacyId").val(),
    };
    $.ajax({
      url: reqURL,
      data: JSON.stringify(jsonDate),
      type: "POST",
      async: false,
      timeout: 5000,
      dataType: "json",
      contentType: "application/json",
      crossDomain: true,
      success: function (res) {
        console.log(res);

        roomUuid = res.body.roomUuid;
        roomId = res.body.id;
      },
      error: function (e) {
        console.log(e);
      },
    });

    $("#roomUuid").val(roomUuid);
    $("#roomId").val(roomId);
    return roomUuid;
  };

  function sendMessage(text) {
    var temproomID = $("#roomUuid").val();
    var senderId = $("#inputAccntId").val();
    var senderNm = $("#inputName").val();

    stompClient.send(
      "/chat/pub/message",
      {},
      JSON.stringify({
        roomId: $("#roomId").val(),
        roomUuid: temproomID,
        type: "MESSAGE", // Enum 타입 정의해서 어딘가에 두고 사용할 것
        message: text,
        senderId: senderId,
        senderNm: senderNm,
      })
    );
  }

  title_div.on("click", function () {
    chatbox_div.toggleClass("chatbox--tray");
    if (chatbox_div.hasClass("chatbox--closed")) {
      chatbox_div.removeClass("chatbox--closed");
      chatbox_div.addClass("chatbox--tray");
    }
  });

  close_bottom.on("click", function (e) {
    e.stopPropagation();
    chatbox_div.addClass("chatbox--closed");
    chatbox_div.addClass("chatbox--empty");
    if (stompClient !== undefined) {
      if (stompClient.connected) stompClient.disconnect();
    }
  });

  identity_form.on("submit", function (e) {
    //1. 채팅 시작하기? > 회사 이름을 입력받을 지, 레거시에서 정보를 받을지
    //2. 기존에 있는 방을 조회해야하는지? 새로 생성해야하는지
    //2-1. 기존 방을 부른다면, 채팅 리스트를 읽어서 모두 append
    //2-2. 새로 생성하면, 아무래도 새로고침등의 이슈가 있긴한다.
    //2-3. 새로운 방을 생성하는 기준을 정립할것? 1. 당일에 채팅을 열면 불러오기?, 상담원 종료나 학습자가 종료 버튼(생성 해야함)을 누르면 새로 부르기?
    //3. 메뉴얼(챗봇을 가장한 사기..)를 호출하는 방식에 대해 검토해야함, 최소 8월 15일전까지는 개발된 모습을 봤으면 좋겠다.
    var roomUUID = createRoom($("#inputName").val());

    if (roomUUID !== "" && roomUUID !== undefined) {
      var senderId = $("#inputAccntId").val();
      var senderNm = $("#inputName").val();

      sock = new SockJS("http://localhost:18080/chat/ws");
      stompClient = Stomp.over(sock);
      stompClient.connect(
        {},
        function (frame) {
          stompClient.subscribe(
            "/chat/sub/room/" + roomUUID,
            function (message) {
              var bodyJson = JSON.parse(message.body);
              console.log(bodyJson);
              appendMessage(bodyJson);
            }
          );
          stompClient.send(
            "/chat/pub/message",
            {},
            JSON.stringify({
              roomId: $("#roomId").val(),
              roomUuid: roomUUID,
              type: "ENTER", // Enum 타입 정의해서 어딘가에 두고 사용할 것
              senderId: senderId,
              senderNm: senderNm,
              message: `${senderNm}님이 입장하셨습니다.` 
            })
          );
        },
        function (error) {
          alert("error " + error);
        }
      );
      e.preventDefault();
      chatbox_div.removeClass("chatbox--empty");
      var t = $("#inputName").val();
      $("#inputEmail").val();
    }
  });

  $("#user_input").keypress(function (e) {
    if (13 == (e.keyCode ? e.keyCode : e.which)) {
      var message = $("#user_input").val();
      $("#chat_context").val();
      sendMessage(message);
    }
  });
};
