from typing import List, Optional, Union

import pydantic


class Attribute(pydantic.BaseModel):
    trait_type: str
    value: Union[int, str, float]
    max_value: Union[int, str, float] = "6"

    @pydantic.validator("max_value")
    def set_max_value(cls, max_value):
        return max_value or "6"


class Metadata(pydantic.BaseModel):

    name: str
    description: str
    image: str
    audio: str
    attributes: List[Attribute]
    external_url: str
    animation_url: Optional[str]
    author: str
    info: str
    seller_fee_basis_points: Optional[int] = 100
    fee_recipient: Optional[str] = "0x2615e4520418848893f9F0d69Ecc84084119D0E5"

    @pydantic.validator("animation_url", always=True)
    def set_animation_url(cls, v, values, **kwargs):
        return v or values.get("external_url")

    @pydantic.validator("seller_fee_basis_points")
    def set_seller_fee_basis_points(cls, fee):
        return fee or 100
    
    @pydantic.validator("fee_recipient")
    def set_fee_recipient(cls, recipient):
        return recipient or "0x2615e4520418848893f9F0d69Ecc84084119D0E5"
