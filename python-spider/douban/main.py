from scrapy import cmdline

# cmdline.execute('scrapy crawl douban_spider'.split())

# output movie-list-data.json
# cmdline.execute('scrapy crawl douban_spider -o movie-list-data.csv'.split())
cmdline.execute('scrapy crawl douban_spider -o movie-list-data.json'.split())
