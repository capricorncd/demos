# 1列以上の配列は1次元配列
# 2列以上の配列は多次元配列
# 配列のアイテムは要素（ようそ）と言う
# 数は要素数という

# 配列の作り方
# Array.new()と[]「角カッコ」

# 変数 = Array.new(要素数)
arr1 = Array.new(4)
arr1[0] = "Tom"
arr1[1] = "Mary"
arr1[2] = "Kit"
arr1[3] = "Jack"
p arr1

# 角カッコ []
arr2 = ["Tom", "Mary", "Kit", "Jack"]
# データ変更
arr2[0] = "Tony"
p arr2

# 多次元配列
arr3 = [["Tom", "Mary"], ["Kit", "Jack"]]
p arr3[0][1] # Mary
p arr3

