class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :content
      t.string :image
      t.references :group, foreign_key: true
      # ログイン済みユーザー（user_idをもつユーザー）でないとコメントできないようにするためにreferencesでモデルを生成
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
