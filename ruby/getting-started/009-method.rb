# メソッド = 処理
# 便利なところ：
# 1.同じものを2度書く必要がない
# 2.同じものを他の場面で使える
# 3.他の人も使うことができる

# メソッド定義
# def メソッド名(引数1, 引数2, ...)
#   実行する処理
#   return 戻り値(ち)
# end

# 引数なし
def sayHello
    p "Hello World."
end

sayHello

# 引数あり
def say(str)
    p str
end

say("Hi, Bro")

# return
def add(n1, n2)
    return n1 + n2
end

p add(10, 29)

# 例
# 9と4と2の平均を表示させてください
def average(a, b, c)
    return (a + b + c) / 3
end

p average(9, 4, 2)