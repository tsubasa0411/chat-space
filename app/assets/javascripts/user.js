$(document).on('turbolinks:load', function(){

  var search_list = $("#user-search-result");
  var member_list = $("#member-append");

  function appendUser(user){
      var html = 
                  `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${user.name}</p>
                      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                  </div>`;
                  search_list.append(html);
  }

  function appendErrMsgToHTML(msg){
      var html = 
                  `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${msg}</p>
                  </div>`;
                  search_list.append(html);
  }
// 一致するユーザーは見つかりませんの定義
$('#user-search-field').on('keyup', function(e){
  var input = $("#user-search-field").val();
  $.ajax({
      type: 'GET',                // HTTPメソッドはGETで
      url:  '/users',             // /usersのURLに (これによりusersコントローラのindexアクションが起動)
      data: { keyword: input},    // keyword: inputを送信する
      dataType: 'json'            // サーバから値を返す際はjsonである
  })
  .done(function(users){                // usersにjson形式のuser変数が代入される。複数形なので配列型で入ってくる
      if (input.length === 0) {         // フォームの文字列長さが0であれば、インクリメンタルサーチ結果を表示しないようにする
          $('#user-search-result').empty();
        }
      else if (input.length !== 0){     // 値が等しくないもしくは型が等しくなければtrueを返す。
          $('#user-search-result').empty();
          users.forEach(function(user){ // users情報をひとつずつとりだしてuserに代入
              appendUser(user)
          });
      }
      else {
          $('#user-search-result').empty(); // ユーザーが見つからなければ「見つからない」を返す。
          appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
  })
  .fail(function() {
      alert('ユーザー検索に失敗しました');
  });
});
var search_list_add = $("#chat-group-users");

function appendUserNameAdd(user_name, user_id) {
  var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                <p class='chat-group-user__name'>${user_name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    search_list_add.append(html);
}
// 検索機能
$("#user-search-result").on("click", ".chat-group-user__btn--add", function () {
  var user_name = $(this).data("user_name");
  var user_id = $(this).data("user_id");
  appendUserNameAdd(user_name, user_id);
  $(this).parent().remove();
});
// 削除機能

$("#chat-group-users").on("click", ".js-remove-btn", function () {
  $(this).parent().remove();
});

});