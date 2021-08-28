from sklearn.feature_extraction import DictVectorizer


def dict_demo():
    """
    字典特征抽取
    :return:
    """
    data = [{"city": "BeiJing", "t": 32}, {"city": "ShangHai", "t": 38}, {"city": "Chengdu", "t": 28}]
    # 1。实例化一个转换器类
    transfer = DictVectorizer()

    # 2。调用fit_transform，返回sparse(稀疏)矩阵
    result = transfer.fit_transform(data)
    print(result)

    print("特征名字：\n", transfer.get_feature_names())

    transfer = DictVectorizer(sparse=False)
    result = transfer.fit_transform(data)
    print(result)

    return None


if __name__ == '__main__':
    dict_demo()


"""
  (0, 0)	1.0
  (0, 3)	32.0
  (1, 2)	1.0
  (1, 3)	38.0
  (2, 1)	1.0
  (2, 3)	28.0
特征名字：
 ['city=BeiJing', 'city=Chengdu', 'city=ShangHai', 't']
[[ 1.  0.  0. 32.]
 [ 0.  0.  1. 38.]
 [ 0.  1.  0. 28.]]
"""