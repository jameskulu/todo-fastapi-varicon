from fastapi import FastAPI
from app.db import models, base, session
from app.api.v1.endpoints import todo

models.Base.metadata.create_all(bind=session.engine)

app = FastAPI(title="FastAPI Todo")

app.include_router(todo.router)
