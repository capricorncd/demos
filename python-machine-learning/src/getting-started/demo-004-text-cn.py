from sklearn.feature_extraction.text import CountVectorizer


def demo():
    """
    中文文本特征抽取
    :return:
    """
    data = ["我 爱 北京 天安门", "天安门 上 太阳 升"]
    # 1。实例化一个转换器类
    transfer = CountVectorizer()

    # 2。调用fit_transform，返回sparse(稀疏)矩阵
    result = transfer.fit_transform(data)
    print(result)

    print("特征名字：\n", transfer.get_feature_names())

    # 数组形式的结果
    print("数组形式的结果\n", result.toarray())

    return None

if __name__ == '__main__':
    demo()

"""
  (0, 0)	1
  (0, 1)	1
  (1, 1)	1
  (1, 2)	1
特征名字：
 ['北京', '天安门', '太阳']
数组形式的结果
 [[1 1 0]
 [0 1 1]]
"""