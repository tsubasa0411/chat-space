class UsersController < ApplicationController

  def edit
    
  end

  def update
    # 保存をできた場合、できなかった場合の分岐
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
      # editに戻る
    end
  end
  def index

    respond_to do |format|
      format.html
      format.json
  end
  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
# ユーザー情報の編集機能実装