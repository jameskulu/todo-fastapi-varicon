from pydantic import BaseModel


class TodoBase(BaseModel):
    title: str
    description: str | None = None


class TodoCreate(TodoBase):
    pass


class TodoUpdate(TodoBase):
    completed: bool


class Todo(TodoBase):
    id: int
    completed: bool

    class Config:
        orm_mode = True
