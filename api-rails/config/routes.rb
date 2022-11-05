Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :categories
      resources :persons

      patch '/tasks/complete/:id', to: 'tasks#set_completed'
      patch '/tasks/todo/:id', to: 'tasks#set_todo'
      resources :tasks
    end
  end
end
