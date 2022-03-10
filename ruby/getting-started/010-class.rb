# クラス
# Rubyでは、全ての値がオブジェクトであること
# オブジェクトは、クラスから作ることができること
# オブジェクトは何らかのクラスに所属している

# オブジェクト = インスタンス
# クラス：データ（インスタンス変数）と処理（メソッド）
# インスタンス変数：クラス内で定義された変数
# クラスのメソッドはインスタンスメソッドと言う、
# 以外のメソッドは関数的メソッドと言う

class Student
    # イニシャライズ
    # オブジェクト生成をした時に自動的に実行されるメソッド
    def initialize(name, score)
        # @name：インスタンス変数という
        @name = name
        @score = score
    end

    # インスタンスメソッド
    def toString()
        return @name + ": " + @score.to_s
    end

    # アクセサを定義する
    # オブジェクトの外からインスタンス変数を参照できる
    attr_accessor :name
end

# new オブジェクト生成をしている
# 「"Mary", 98」はイニシャライズメソッドに値を渡す
s = Student.new("Mary", 98)
p s.name, s.toString