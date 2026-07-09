from fastembed import TextEmbedding

# Load model once
model = TextEmbedding()


def create_embedding(text: str):
    """
    Convert text into a vector embedding.
    """
    embedding = next(model.embed([text]))
    return embedding.tolist()