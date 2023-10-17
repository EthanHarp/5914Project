from django.core.management.base import BaseCommand
from elasticsearch_dsl import Index


class Command(BaseCommand):
    help = 'Rebuild the Elasticsearch index'

    def handle(self, *args, **options):
        index_name = 'cars'  # Replace with the name of your Elasticsearch index
        index = Index(index_name)
        index.delete(ignore=404)
        index.create()
        self.stdout.write(self.style.SUCCESS(
            f'Successfully rebuilt the {index_name} index'))
