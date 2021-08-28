# pip install jieba
from sklearn.feature_extraction.text import CountVectorizer
from texts import *
from helps import *

def demo():
    """
    中文文本特征抽取，自动分词
    :return:
    """
    arr = []
    for text in text_data_cn:
        arr.append(split_words(text))

    # print(arr)
    # 1。实例化一个转换器类
    transfer = CountVectorizer(stop_words=["其中", "就是", "然后", "文化"])

    # 2。调用fit_transform，返回sparse(稀疏)矩阵
    result = transfer.fit_transform(arr)
    print(result)

    print("特征名字：\n", transfer.get_feature_names())

    # 数组形式的结果
    print("数组形式的结果\n", result.toarray())

    return None

if __name__ == '__main__':
    demo()

"""
  (0, 20)	1
  (0, 22)	1
  (0, 23)	1
  (0, 1)	1
  (0, 5)	1
  (1, 21)	1
  (1, 18)	1
  (1, 10)	1
  (1, 16)	1
  (1, 11)	1
  (1, 4)	1
  (2, 16)	1
  (2, 9)	1
  (2, 3)	1
  (2, 17)	1
  (2, 19)	1
  (3, 14)	1
  (3, 13)	1
  (3, 27)	1
  (3, 6)	1
  (3, 15)	1
  (3, 25)	1
  (3, 12)	1
  (4, 2)	1
  (4, 8)	1
  (4, 26)	1
  (4, 24)	1
  (4, 0)	1
  (4, 7)	1
特征名字：
 ['99', '一发', '一点', '万家', '上市公司', '不可收拾', '不湿鞋', '亿为证', '今天', '包括', '参股', '各种', '嫌疑', '岸边', '常在', '据说', '控股', '改名', '盆满', '祥源', '网传', '赚得', '赵薇', '还珠', '追缴', '逃税', '郑爽', '难免']
数组形式的结果
 [[0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 1 0 0 0 0]
 [0 0 0 0 1 0 0 0 0 0 1 1 0 0 0 0 1 0 1 0 0 1 0 0 0 0 0 0]
 [0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 1 1 0 1 0 0 0 0 0 0 0 0]
 [0 0 0 0 0 0 1 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 1 0 1]
 [1 0 1 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0]]
"""