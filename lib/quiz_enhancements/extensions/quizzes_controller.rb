module Aqt::Extensions::QuizzesController
  def edit
    css_bundle(:main, plugin: :aqt)
    js_bundle(:quiz_edit, plugin: :aqt)
    super
  end
end
