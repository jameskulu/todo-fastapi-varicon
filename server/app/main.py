from fastapi import FastAPI
from app.db import models, base, session
from app.api.v1.endpoints import todo
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

models.Base.metadata.create_all(bind=session.engine)

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(todo.router, prefix=f"{settings.API_V1_STR}", tags=["Todos"])
