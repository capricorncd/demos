# 分岐の代表例　if文
# 
# if 条件 then
#   条件を満たした時の処理
# end
# 
# if文のthenを省略可能である
# indent インデント
age = 22

if age >= 20
    p "adult"
end

# if 条件1
#   条件を満たした時の処理
# elsif 条件2
#   条件を満たさない時の処理
# else
#   条件を満たさない時の処理
# end
score = 99

if score == 100
    p "天才"
elsif score >= 60
    p "合格"
else
    p "不合格"
end

if age >= 10 && age < 20
    p "10代"
elsif age >= 20 && age < 30
    p "20代"
elsif age >= 30 && age < 40
    p "30代"
else
    p "それ以外"
end  