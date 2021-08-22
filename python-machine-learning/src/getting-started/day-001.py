from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split


def data_sets_demo():
    """

    :return:
    """
    iris = load_iris()
    print("鸢尾花数据集 \n", iris)
    print("查看数据集描述 \n", iris.DESCR)
    print("查看特征值名字 \n", iris.feature_names)
    print("查看目标值名字 \n", iris.target_names)
    print("查看特征值 \n", iris.data, iris.data.shape)
    print("查看特征值有几行几列 \n", iris.data.shape)

    # 数据集划分
    # data, target, test_size 默认0.25, random_state 随机数种子
    x_train, x_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.2, random_state=22)
    print("训练集特征值 \n", x_train, x_train.shape)

    return None


if __name__ == '__main__':
    data_sets_demo()
