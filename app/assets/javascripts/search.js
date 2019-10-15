$(document).on('turbolinks:load', function() {
  var search_list = $("#chat-group-users")
  function appendUser(user) {
    // console.log(user)
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`
    search_list.append(html)
  }
  var chat_member = $("#chat-group-users")
  function addUser(id,name) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    chat_member.append(html)             
  }
  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    //var input = $("#user-seach-result").val();
    var input = $("#user-search-field").val(); 
    
    if(input.length == 0) {
      $("#chat-group-users").empty();
      return;
    }
    console.log(input);
    $.ajax({
      type: "GET",
      url: "/users",
      data: {keyword: input},
      dataType: "json"
    })
    .done(function(users) {
      // console.log(users)
       $("#chat-group-users").empty();
       users.forEach(function(user) {
          appendUser(user);
       })
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました。");
    })
    $("#chat-group-users").on("click", ".user-search-add", function(e) {
      e.preventDefault();
      $(this).parent().remove();
      var id = $(this).data("user-id");
      var name = $(this).data("user-name");
      addUser(id,name);
      $("#chat-group-users").on("click", ".user-search-remove", function(e) {
        e.preventDefault();
        $(this).parent().remove();
      })

    })
  })
})