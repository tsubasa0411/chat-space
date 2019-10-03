Rails.application.routes.draw do

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    root to: 'messages#index' 
  
  # ルートパスの設定
  # root 'groups#index'
  resources :users, only: [:edit, :update, :index]
  # ユーザー編集するためのパス
  resources :groups, only: [:new, :create, :edit, :update] do
  resources :messages, only: [:index]
    # グループ機能のルーティング
  end
end
