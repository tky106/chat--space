$(document).on('turbolinks:load', function() {
  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      var content = message.content
      var image = message.image
      var html = `<div class="contents__right-content--right-box__test-date" data-id="${message.id}">
      <div class="contents__right-content--right-box__test-date--test">
          ${message.user_name}       
      </div>
      <div class="contents__right-content--right-box__test-date--date">
        ${message.date}
      </div>
    </div>
    <div class="contents__right-content--right-box__hello" data-id="${message.id}">
      ${content}
    </div>
    <div><img src="${image}"></div>`
} else if (message.content) {
var content = message.content  
var noImage = ""
var html = `<div class="contents__right-content--right-box__test-date" data-id="${message.id}">
      <div class="contents__right-content--right-box__test-date--test">
          ${message.user_name}
          
      </div>
      <div class="contents__right-content--right-box__test-date--date">
        ${message.date}
      </div>
    </div>
    <div class="contents__right-content--right-box__hello" data-id="${message.id}">
      ${content}
    </div>
    <div>${noImage}</div>`
} else if (message.image.url) {
  var noContent = ""
  var image = message.image
var html = `<div class="contents__right-content--right-box__test-date" data-id="${message.id}">
      <div class="contents__right-content--right-box__test-date--test">
          ${message.user_name}
          
      </div>
      <div class="contents__right-content--right-box__test-date--date">
        ${message.date}
      </div>
    </div>
    <div class="contents__right-content--right-box__hello" data-id="${message.id}">
      ${noContent}
    </div>
    <div><img src="${image}"></div>`
    
  };
    return html;
  }
  
  var reloadMessages = function() {

    last_message_id = $(".contents__right-content--right-box__test-date:last, .contents__right-content--right-box__hello:last").data("id");
    
  
      $.ajax({
     
        url: "api/messages",
        
        type: 'get',
        dataType: 'json',
        
        data: {id: last_message_id}
      })

    .done(function(messages) {
    
      messages.forEach(function(message) {
        html = buildMessageHTML(message)
        $(".contents__right-content--right-box").append(html);
  
      })
      $(".contents__right-content--right-box").animate({scrollTop: $(".contents__right-content--right-box")[0].scrollHeight});
    })
    .fail(function() {
      console.log('error');
    });
  };
  function buildHTML(message) {

    if (message.content && message.image.url) {
     
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