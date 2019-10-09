class UsersController < ApplicationController
  

  def index

  end
  
  def edit
    
  end
  
  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def search
    @users = User.whrere("title LIKE(?)", "%#{params[:keyword]}%")
    respond_to do |format|
      format.html
      format.json
  end

  private
  def user_params
    params.require(:user).permit(:name, :email)
  end

end
