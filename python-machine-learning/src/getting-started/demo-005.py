# pip install pandas
from sklearn.preprocessing import MinMaxScaler
import pandas as pd


def demo():
    """
    归一化
    :return:
    """
    # 1、读取数据
    data = pd.read_csv("data/dating.csv")
    # 去掉目标值target列。
    # :每行都需要，:3取前3列
    data = data.iloc[:, :3]
    print(data)
    # 2、实例化一个转换器类
    transfer = MinMaxScaler()

    # 3、调用fit_transform
    result = transfer.fit_transform(data)
    print(result)

    print("特征名字：\n", transfer.get_feature_names())

    # 数组形式的结果
    print("数组形式的结果\n", result.toarray())

    return None


if __name__ == '__main__':
    demo()
