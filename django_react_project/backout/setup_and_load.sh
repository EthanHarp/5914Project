#!/bin/bash

if [ ! -d "elasticsearch_loader" ]; then
    git clone https://github.com/svernier/elasticsearch_loader.git &&
    cd elasticsearch_loader &&
    python setup.py install &&
    cd ..
fi

elasticsearch_loader --es-host http://es01:9200 --index newsgroup json data/*.json
