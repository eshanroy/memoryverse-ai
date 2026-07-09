import json
import os

from dotenv import load_dotenv
from groq import Groq

from app.schemas.memory import MemoryAnalysis
from app.utils.prompt_loader import load_prompt

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

MODEL = os.getenv(
    "GROQ_MODEL",
    "llama-3.3-70b-versatile"
)


def analyze_memory(text: str) -> MemoryAnalysis:
    """
    Analyze extracted document text using Groq
    and return a validated MemoryAnalysis object.
    """

    prompt = load_prompt("analyze_memory.txt")
    prompt = prompt.replace("{{DOCUMENT}}", text[:8000])

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.2,
        response_format={
            "type": "json_object"
        },
    )

    content = response.choices[0].message.content

    data = json.loads(content)

    return MemoryAnalysis.model_validate(data)