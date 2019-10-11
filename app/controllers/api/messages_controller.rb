class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id]) 
    @messages = @group.messages.includes(:user).where('id > ?', params[:last_id]) #グループが所有しているメッセージの中から、params[:last_id]よりも大きいidがないかMessageから検索して、@messagesに代入。
    
  end



end