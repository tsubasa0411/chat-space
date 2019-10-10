$(function() {

  function buildHTML(message){
  image = (message.image) ? `<img class="lower-message__image" src="${ message.image }">`: "";
  var html =  `<div class="message" user_id= "${message.id}">
                  <div class="upper-message">
                        <div class="upper-message__user-name">
                            ${ message.user_name }
                        </div>
                        <div class="upper-message__date">
                            ${ message.time }
                        </div>
                    </div>
                    <div class="lower-message">
                    <p class="lower-message__content">
                    ${ message.content }
                    </p>
                    </div>
                    ${image}
                </div>`
      return html;
  
    };
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
      $(".messages").append(html.animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form__message')[0].reset();
      $('.form__submit').prop('disabled', false);
})
      .fail(function(){
        alert('error');
        $('.form__submit').prop('disabled', false);
  
  });

});
})
