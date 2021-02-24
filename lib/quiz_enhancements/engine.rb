module QuizEnhancements
  class Engine < ::Rails::Engine
    config.paths['lib'].eager_load!

    Autoextend.hook(:"Quizzes::QuizzesController",
                    :"QuizEnhancements::Extensions::QuizzesController",
                    method: :prepend)
  end
end
