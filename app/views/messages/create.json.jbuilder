#rubyで扱われていた変数を、json形式で扱えるように変換する。
json.user_id      @message.id
json.user_name    @message.user.name
json.date         @message.created_at.strftime("%Y/%m/%d %H:%M")
json.content      @message.content
json.image        @message.image.url
