from fastapi import APIRouter, status

from dependencies import llm
from models import VocabList, SentenceResponse

router = APIRouter()

@router.get("/", tags=['client'], status_code=status.HTTP_200_OK)
async def healthCheck():
    return {"message": "Client API OK"}

@router.get("/status", tags=['client'], status_code=status.HTTP_200_OK)
async def healthStatus():
    return {"message": "Client API Healthy"}

@router.get("/get-initial-story", tags=['client'], status_code=status.HTTP_200_OK)
async def getInitialStory() -> str:
    pass

@router.get("/get-story-continue", tags=['client'], status_code=status.HTTP_200_OK)
async def getStoryContinue(story: str) -> dict:
    # Langchain stuff here
    next_sentence = "Next Sentence."
    new_story = story + next_sentence
    return {"story": new_story, "next_sentence": next_sentence}

@router.get("/get-sentence options", tags=['client'], status_code=status.HTTP_200_OK)
async def getSentenceOptions(story: str, vocab_list: VocabList) -> SentenceResponse:
    # Langchain stuff here
    
    # Generate audio

    # Return
    ret = SentenceResponse(
        sentence1="TODO",
        sentence2="TODO",
        sentence3="TODO",
        audio1="TODO",
        audio2="TODO",
        audio3="TODO",
    )

    return ret