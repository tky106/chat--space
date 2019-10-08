$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var html = `<div class="contents__right-content--right-box__test-date">
                  <div class="contents__right-content--right-box__test-date--test">
                    <p>    
                      ${message.user_name}
                    </p>  
                  </div>
                  <div class="contents__right-content--right-box__test-date--date">
                    ${message.date}
                  </div>
                </div>
                <div class="contents__right-content--right-box__hello">
                  
                  ${message.content}
                  
                  
                </div>`
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
      $(".initial-message").val("");
      scrollBottom();
    })
    .fail(function() {
      alert("error");
    }) 
    .always(function(data){
      $('.send').prop('disabled', false);
    })
  })
})    