$(document).on('turbolinks:load', function() {
  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      // var t = message.content 
      //data-idが反映されるようにしている
      var html = `<div class="contents__right-content--right-box__test-date" data-id="${message.id}">
      <div class="contents__right-content--right-box__test-date--test">
          ${message.user_name}
          
      </div>
      <div class="contents__right-content--right-box__test-date--date">
        ${message.date}
      </div>
    </div>
    <div class="contents__right-content--right-box__hello" data-id="${message.id}">
      ${message.content}
    </div>
    <div><img src="${ message.image}"></div>`
} else if (message.content) {
//同様に、data-idが反映されるようにしている
var html = `<div class="contents__right-content--right-box__test-date" data-id="${message.id}">
      <div class="contents__right-content--right-box__test-date--test">
          ${message.user_name}
          
      </div>
      <div class="contents__right-content--right-box__test-date--date">
        ${message.date}
      </div>
    </div>
    <div class="contents__right-content--right-box__hello" data-id="${message.id}">
      ${message.content}
    </div>`
} else if (message.image.url) {
//同様に、data-idが反映されるようにしている
var html = `<div class="contents__right-content--right-box__test-date" data-id="${message.id}">
      <div class="contents__right-content--right-box__test-date--test">
          ${message.user_name}
          
      </div>
      <div class="contents__right-content--right-box__test-date--date">
        ${message.date}
      </div>
    </div>
    <div><img src="${ message.image}"></div>`
    
  };
    return html;
  }
  
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $(".contents__right-content--right-box__test-date:last, .contents__right-content--right-box__hello:last").data("id");
    
    //  if (root_path) {
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })

    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message) {
        html = buildMessageHTML(message)
        $(".contents__right-content--right-box").append(html);
      //メッセージが入ったHTMLを取得
      //メッセージを追加
      })
      $(".contents__right-content--right-box").animate({scrollTop: $(".contents__right-content--right-box")[0].scrollHeight});
    })
    .fail(function() {
      console.log('error');
    });
  };
  function buildHTML(message) {

    if (message.content && message.image.url) {
      // var t = message.content 
      //data-idが反映されるようにしている
      var html = `<div class="contents__right-content--right-box__test-date" data-id="${message.id}">
      <div class="contents__right-content--right-box__test-date--test">
          ${message.user_name}
          
      </div>
      <div class="contents__right-content--right-box__test-date--date">
        ${message.date}
      </div>
    </div>
    <div class="contents__right-content--right-box__hello" data-id="${message.id}">
      ${message.content}
    </div>
    <div><img src="${ message.image}"></div>`
} else if (message.content) {
//同様に、data-idが反映されるようにしている
var html = `<div class="contents__right-content--right-box__test-date" data-id="${message.id}">
      <div class="contents__right-content--right-box__test-date--test">
          ${message.user_name}
          
      </div>
      <div class="contents__right-content--right-box__test-date--date">
        ${message.date}
      </div>
    </div>
    <div class="contents__right-content--right-box__hello" data-id="${message.id}">
      ${message.content}
    </div>`
} else if (message.image.url) {
//同様に、data-idが反映されるようにしている
var html = `<div class="contents__right-content--right-box__test-date" data-id="${message.id}">
      <div class="contents__right-content--right-box__test-date--test">
          ${message.user_name}
          
      </div>
      <div class="contents__right-content--right-box__test-date--date">
        ${message.date}
      </div>
    </div>
    <div><img src="${ message.image}"></div>`
    
  };
                 
    return html;
  }
  function scrollBottom(){
    var target = $('.contents__right-content--right-box__test-date, .contents__right-content--right-box__hello').last();
    var position = target.offset().top + $('.contents__right-content--right-box').scrollTop();
    $('.contents__right-content--right-box').animate({
      scrollTop: position
    }, 300, 'swing');
  }
  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    
    var message = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $(".contents__right-content--right-box").append(html);
      $("#new_message")[0].reset();
      scrollBottom();
    })
    .fail(function() {
      alert("error");
    }) 
    .always(function(data){
      $('.send').prop('disabled', false);
    })
  })
  setInterval(reloadMessages, 5000);

})    