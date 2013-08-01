json.array!(@stickers) do |sticker|
  json.extract! sticker, :text, :position_x, :position_y
end
