import pytest


def test_contract_address_is_returned(nft):
    contract_address = None
    if nft.address:
        contract_address = nft.address
    assert (
        contract_address is not None
    ), f"address is not returning a valid address."
