# -*- coding: utf-8 -*-
import pymongo
from douban.settings import MONGO_HOST, MONGO_PORT, MONGO_DB_NAME, MONGO_DB_COLLECTION


# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


class DoubanPipeline:
    def __init__(self):
        client = pymongo.MongoClient(host=MONGO_HOST, port=MONGO_PORT)
        mydb = client[MONGO_DB_NAME]
        self.post = mydb[MONGO_DB_COLLECTION]

    def process_item(self, item, spider):
        # 需要先开启settings.py里的'ITEM_PIPELINES'配置
        data = dict(item)
        self.post.insert(data)
        return item
