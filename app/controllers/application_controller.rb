class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  # 未ログイン時はログインページにいく
  before_action :configure_permitted_parameters, if: :devise_controller?
  # config.action_view.automatically_disable_submit_tag = false 
  # 非同期通信で最初のメッセージは発火するが、二回め以降も自動的に処理が発火するように定義
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end# ユーザー登録時に名前も登録できるように定義
end
