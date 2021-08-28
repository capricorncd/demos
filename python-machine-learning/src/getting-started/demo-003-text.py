from sklearn.feature_extraction.text import CountVectorizer


def demo():
    """
    文本特征抽取
    :return:
    """
    data = ["life is short, i like like python", "life is too long, i dislike python"]
    # 1。实例化一个转换器类
    transfer = CountVectorizer()
    # stop_words停用词（网上可以搜索常用的停用词表）
    # transfer = CountVectorizer(stop_words=["is", "too"])

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
  (0, 2)	1
  (0, 1)	1
  (0, 6)	1
  (0, 3)	2
  (0, 5)	1
  (1, 2)	1
  (1, 1)	1
  (1, 5)	1
  (1, 7)	1
  (1, 4)	1
  (1, 0)	1
特征名字：
 ['dislike', 'is', 'life', 'like', 'long', 'python', 'short', 'too']
数组形式的结果
 [[0 1 1 2 0 1 1 0]
 [1 1 1 0 1 1 0 1]]
"""