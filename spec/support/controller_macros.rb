module ControllerMacros
  def login(user)
    @request.env["devise.mapping"] = Devise.mappings[:user]
    sign_in user
  end
end
# コントローラーのテスト
# インスタンス変数に代入されたオブジェクトは、コントローラのassigns メソッド経由で参照できます。
# @messageを参照したい場合、assigns(:message)と記述することができます。