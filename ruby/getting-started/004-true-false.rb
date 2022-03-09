# True  正しい、トゥルークラス(TrueClass)に所属している
# False 誤り(あやまり)、フォールスクラス(FalseClass)に所属している
p 10 > 1         # true
p (10 > 1).class # TrueClass

p 10 < 1         # false
p (10 < 1).class # FalseClass