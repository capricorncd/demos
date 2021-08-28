import jieba


def split_words(input):
    """
    中文分词
    :return:
    """
    return " ".join(list(jieba.cut(input)))