# オブジェクト
# 文字列、数字、変数、配列
# オブジェクトはメソッドで操作（そうさ）できる

# 数値オブジェクト
# 整数 => Integerオブジェクト
# 小数 => Floatオブジェクト

integerNum = 10

# 割り算メソッド
p 10.div(5) # 2
# 割り算の余(あま)りを算出するメソッド
p integerNum.remainder(3) # 1

p 10.class   # Integer
p 10.0.class # Float

# 文字列オブジェクト
# 文字のインデックスを探す
p "string001".index("n") # 4
# 文字列の長さをカウントするメソッド
p "string002".length     # 9
p "string003".class      # String