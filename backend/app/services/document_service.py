from pathlib import Path

from app.services.pdf_service import extract_text_from_pdf


def extract_document_text(file_path: str) -> str:
    """
    Extract text from any supported document.

    Currently supported:
    - PDF

    Future:
    - DOCX
    - Images (OCR)
    """

    extension = Path(file_path).suffix.lower()

    if extension == ".pdf":
        return extract_text_from_pdf(file_path)

    raise ValueError(f"Unsupported file type: {extension}")