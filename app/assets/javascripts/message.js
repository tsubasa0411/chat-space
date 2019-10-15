$(function() {

  function buildHTML(message){
    var image = message.image ? `<img src = '${message.image}'>` : "";
    var html =
     `<div class="message" data-id="${message.id}">
        <div class="upper-message">
          <div class="upper-message__user">
            ${message.user_name}
          </div>
          <div class="upper-message__time">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__text">
            ${message.content}
          </p>
          <div class="lower-message__image">
            ${image}
          </div>
        </div>
      </div>`
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildHTML(message);
      $('.messages').append(html)
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert('エラー');
    })
    return false;
  })


  // 自動更新
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
        url: "api/messages",
        type: 'GET',
        data: { id : message_id },
        dataType: 'json'
      })
      .done(function(data){
        if (data.length){
          $.each(data, function(index,data){
            var html = buildHTML(data);
            $('.messages').append(html)
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