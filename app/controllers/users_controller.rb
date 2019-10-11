class UsersController < ApplicationController
  def index
    @users = User.where('name LIKE(?)', "%#{params[:name]}%" ).where("id NOT IN (#{current_user.id})")
    respond_to do |format|
      format.html
      format.json
    end
  end


  def edit
    @user =User.find(params[:id])
  end

  def update
    # 保存をできた場合、できなかった場合の分岐
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
      
    end
  end
  
  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
# ユーザー情報の編集機能実装