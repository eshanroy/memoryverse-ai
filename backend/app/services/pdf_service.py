import fitz


def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract selectable text from a PDF.

    Note:
    Scanned/image-based PDFs will not contain selectable text.
    OCR support will be added in a future version.
    """

    document = fitz.open(pdf_path)

    print(f"\nReading PDF: {pdf_path}")

    full_text = ""

    for i, page in enumerate(document):
        text = page.get_text("text") or ""

        print(f"Page {i + 1}: {len(text)} characters")

        full_text += text

    document.close()

    full_text = full_text.strip()

    if not full_text:
        raise ValueError(
            "No readable text found. This appears to be a scanned or image-based PDF. OCR support will be added in a future version."
        )

    return full_text