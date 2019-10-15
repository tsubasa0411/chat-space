$(function() {

  function buildHTML(message) {
  image = (message.image) ? `<img class="lower-message__image" src="${ message.image }">`: "";
  var html = 
    `<div class="message" user_id= "${message.id}">
                  <div class="upper-message">
                        <div class="upper-message__user-name">
                            ${ message.user.name }
                        </div>
                        <div class="upper-message__date">
                            ${ message.created_at }
                        </div>
                    </div>
                    <div class="lower-message">
                    <p class="lower-message__content">
                    ${ message.content }
                    </p>
                    </div>
                    <div class="lower-message__image">
                    ${image.url}
                </div>`
      return html

    
  }

$('#new_message').on('subumit',function(e){
  e.preventDefault();
  // イベントを止め、同期通信で送信されるのをやめる
  var formData = new FormData(this);
  // formから送信された内容を取得
  var url = $(this).attr('action');
  // formのアクションの属性を取得し、変数に代入
$.ajax({//データベース送信
  url: url,
  type: "POST",
  data: formData,
  dataType: "json",
  processData: false,
  contentType: false
    })


      .done(function(data){
              var html = buildHTML(data);
            $(".messages").append(html);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
            $('form')[0].reset();
            // $('.form__message').val('');
            // $('.form__submit').prop('disabled', false);

})
      .fail(function(){
        alert('error');
        $('.form__submit').prop('disabled', false);
})
return false;
})


 
    // ↓自動更新
    $(function() {
      $(function() {
        if (location.href.match(/\/groups\/\d+\/messages/)) {
          setInterval(update, 5000);
        }
      });
      function update(){
        if($('.message')[0]){
          var message_id = $('.message:last').data('id');
        } else {
          return false
        }

  $.ajax({
    url: "api/messages", //サーバを指定。今回はapi/message_controllerに処理を飛ばす
        type: 'get', //メソッドを指定
        dataType: 'json', //データはjson形式
        data: {last_id: last_message_id},
        //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
        dataType: 'json'
          })
  
  .done(function(data){
    if (data.length){
      $.each(data, function(index,data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      })
    }
  })
  .fail(function(){
    console.log('自動更新に失敗しました')
  })
}
})
});
