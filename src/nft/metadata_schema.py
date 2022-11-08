from typing import List, Optional, Union

import pydantic


class Attribute(pydantic.BaseModel):
    trait_type: str
    value: Union[int, str, float]


class Metadata(pydantic.BaseModel):

    name: str
    image: str
    description: str
    attributes: List[Attribute]
    external_url: str
    animation_url: Optional[str]

    @pydantic.validator("animation_url", always=True)
    def set_animation_url(cls, v, values, **kwargs):
        return v or values.get("external_url")
