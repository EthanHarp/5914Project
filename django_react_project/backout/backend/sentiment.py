from transformers import pipeline
def bulk_sentiment_analyze(texts:list[str]):
    sentiment_pipeline = pipeline(model = "ProsusAI/finbert") 
    data = texts
    results = sentiment_pipeline(data)
    return results


