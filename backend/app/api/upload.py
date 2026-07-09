from pathlib import Path
import shutil

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.core.config import UPLOAD_DIR
from app.services.memory_service import preserve_memory

router = APIRouter(
    prefix="/api",
    tags=["Upload"],
)


@router.post("/upload")
async def upload_memory(file: UploadFile = File(...)):
    """
    Upload a document and convert it into an AI Memory.
    """

    # Only allow PDFs
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )

    destination = Path(UPLOAD_DIR) / file.filename

    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        result = preserve_memory(str(destination))

        return {
            "success": True,
            "message": "Memory preserved successfully.",
            "filename": file.filename,
            "database_id": result["database_id"],
            "memory": result["analysis"].model_dump(),
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:
        print("UPLOAD ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail="Failed to process the uploaded document."
        )