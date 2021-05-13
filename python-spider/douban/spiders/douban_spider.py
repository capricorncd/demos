# -*- coding: utf-8 -*-
import scrapy
from douban.items import DoubanItem

DOMAIN_URL = 'https://movie.douban.com/top250'


class DoubanSpiderSpider(scrapy.Spider):
    # 爬虫名
    name = 'douban_spider'
    # 允许爬取的域名
    allowed_domains = ['movie.douban.com']
    # 入口URL
    start_urls = [
        DOMAIN_URL
    ]

    def parse(self, response):
        li_xpath = '//div[@class="article"]//ol[@class="grid_view"]//li'
        movie_list = response.xpath(li_xpath)
        for li in movie_list:
            item = DoubanItem()
            item['serial_number'] = li.xpath('.//div[@class="item"]//em/text()').extract_first()
            # movie name
            movie_names = li.xpath('.//div[@class="info"]//div[@class="hd"]//a//span/text()').extract()
            item['movie_name'] = []
            for n in movie_names:
                item['movie_name'].append(' '.join(n.split()))
            # contents
            contents = li.xpath('.//div[@class="info"]//div[@class="bd"]//p[1]/text()').extract()
            introduce = []
            for content in contents:
                introduce.append(' '.join(content.split()))
            item['introduce'] = introduce
            item['star'] = li.xpath('.//span[@class="rating_num"]/text()').extract_first()
            item['evaluate'] = li.xpath('.//div[@class="star"]//span[4]/text()').extract_first()
            item['describe'] = li.xpath('.//p[@class="quote"]/span/text()').extract_first()
            # 电影海报/封面
            poster_url = li.xpath('.//div[@class="pic"]//img/@src').extract_first()
            item['file_urls'] = [poster_url]
            # yield item to pipelines, 进行数据的清洗或存储
            yield item

        # 解析下一页
        next_link = response.xpath('//span[@class="next"]/link/@href').extract()
        if next_link:
            next_link = next_link[0]
            # 提交至调度器
            yield scrapy.Request(DOMAIN_URL + next_link, callback=self.parse)
