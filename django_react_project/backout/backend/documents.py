from elasticsearch_dsl import Document, Text, Date

from .models import NewsArticle  # Import your Django model

class NewsArticleDocument(Document):
    title = Text()
    description = Text()
    published_utc = Date()

    class Index:
        name = 'news_articles'  # Choose a suitable name for your Elasticsearch index

    def prepare_title(self, instance):
        return instance.title

    def prepare_description(self, instance):
        return instance.description

    def prepare_published_utc(self, instance):
        return instance.published_utc
