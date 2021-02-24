module Aqt
  class Engine < ::Rails::Engine
    config.paths['lib'].eager_load!

    Autoextend.hook(:"Quizzes::QuizzesController",
                    :"Aqt::Extensions::QuizzesController",
                    method: :prepend)
  end
end
