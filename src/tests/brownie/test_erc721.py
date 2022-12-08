from brownie import accounts, ExtinctSounds, exceptions

def test_account_balance():
    balance = accounts[0].balance()
    accounts[0].transfer(accounts[1], "10 ether", gas_price=0)

    assert balance - "10 ether" == accounts[0].balance()

def test_total_supply_is_zero(nft, valid_account, token_metadata_uri):
    assert nft.tokenCounter() == 0, f"totalSupply does not start at 0."
    assert (
        nft.balanceOf(valid_account) == 0
    ), f"balanceOf did not initialize at 0 for valid_account"

    safe_mint_tx = nft.safeMint(
        token_metadata_uri, {"from": valid_account}
    )
    safe_mint_tx.wait(1)

    assert nft.tokenCounter() == 1
    assert nft.balanceOf(valid_account) == 1
    assert nft.ownerOf(0) == valid_account

def test_non_contract_owner_can_mint(nft, utils, token_metadata_uri):

    non_owner = utils.get_account(1)

    safe_mint_tx = nft.safeMint(
        token_metadata_uri, {"from": non_owner}
    )
    safe_mint_tx.wait(1)
    assert nft.balanceOf(non_owner) == 1
    assert nft.ownerOf(0) == non_owner


def test_owner_can_transfer_nft(nft, utils, token_metadata_uri):
    owner = utils.get_account(0)

    safe_mint_tx = nft.safeMint(
        token_metadata_uri, {"from": owner}
    )
    safe_mint_tx.wait(1)

    assert nft.balanceOf(owner) == 1
    assert nft.ownerOf(0) == owner

    account_to_transfer_to = utils.get_account(1)

    transfer_tx = nft.safeTransferFrom(owner, account_to_transfer_to, 0)
    transfer_tx.wait(1)

    assert nft.balanceOf(account_to_transfer_to) == 1
    assert nft.ownerOf(0) == account_to_transfer_to
