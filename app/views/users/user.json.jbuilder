# jsonの形式データを配列で返したい場合にarray!を使用

json.array! @users do |user|
  json.id    user.id
  json.user  user.name
end

# テーブルのカラム名をみて追加する