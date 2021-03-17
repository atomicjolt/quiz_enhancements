module QuizEnhancements::Extensions::QuizzesController
  def edit
    css_bundle(:main, plugin: :quiz_enhancements)
    js_bundle(:quiz_edit, plugin: :quiz_enhancements)
    super
  end
end
