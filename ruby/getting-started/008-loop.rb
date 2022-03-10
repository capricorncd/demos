# 繰り返し：反複処理、ループ処理
# for文
# 
# for 変数(カウンタ変数index) in 範囲(又は配列)(スタート値..継続条件) do
#   繰り返し中に実行する処理
# end
#
# for i in スタート値..継続(けいぞく)条件
# for i in 0..5 do
# 「do」を省略できる
for i in 0 .. 5
    if i == 4
        # break 繰り返し処理を終了する、ループを中止する
        break
    elsif i == 2
        # next 処理をスキップする
        next
    end
    print i
end

# for文のネスト
for i in 0 .. 2
  for j in 0 .. 2
    print i.to_s + "-" + j.to_s
  end
end

# 配列
p "for 配列"
arr = [1, 3, 5, 7]
sum = 0
for i in arr
    sum += i
    print i.to_s + ', '
end
p sum