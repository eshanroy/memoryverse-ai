import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

MODEL = os.getenv(
    "GROQ_MODEL",
    "llama-3.3-70b-versatile"
)


def ask_aura(question: str, context: str):
    prompt = f"""
You are AURA, the AI assistant for MemoryVerse.

MemoryVerse stores documents uploaded by one user.

The retrieved memories below belong to the same user.

If multiple memories are retrieved, combine the information naturally.

If the user asks:

- "my resume"
- "my skills"
- "my projects"
- "my certificates"

assume they are referring to the retrieved memories.

Never say you don't know simply because multiple memories exist.

If multiple resumes are found, summarize the most relevant one returned by the search.

------------------------
MEMORIES
------------------------

{context}

------------------------
QUESTION
------------------------

{question}

Answer naturally and professionally.
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.2,
    )

    return response.choices[0].message.content