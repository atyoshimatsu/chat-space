$(function(){
  function addUser(user){
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $("#user-search-result").append(html);
  }

  function addNoUser(){
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function  addUserToGroup(user_name, user_id){
    let html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${user_id}'>
              <p class='chat-group-user__name'>${user_name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
            `
    $('#chat-group-users').append(html);
  }

  function addMember(user_id) {
    let html = `<input value="${user_id}" name="group[user_ids][]" type="hidden" id="group_user_ids_${user_id}" />`;
    $(`#${user_id}`).append(html);
  }

  $('#user-search-field').on("keyup", function(){
    let input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length != 0){
        users.forEach(function(user) {
          let existUsers = $('.js-add-user .chat-group-user__name').text();
          if (existUsers.search(user.name) == -1) {
            addUser(user);
          }
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
      
    })
    .fail(function(){
      alert('ユーザの検索に失敗しました！');
    });
  });

  $(document).on('click', '.chat-group-user__btn--add', function(){
    const userName = $(this).data('userName');
    const userId = $(this).data('userId');
    $(this).parent().remove();
    addUserToGroup(userName, userId);
    addMember(userId);
  });

  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  });
});