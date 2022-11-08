import pydantic


class InfuraResponse(pydantic.BaseModel):

    Name: str
    Hash: str
    Size: str
