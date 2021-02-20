module Aqt::Extensions::QuizzesController
  def edit
    js_bundle(:aqt, plugin: :aqt)
    super
  end
end
