from brownie import ExtinctSounds, accounts, config, network

from utils import Utils


def main():
    utils = Utils()
    account = utils.get_account()
    artifacts = utils.get_artifacts()
    sample_token_uri = artifacts["01"]["4"]

    # dev = accounts.add(config["wallets"]["from_key"])
    print(f'network.show_active(): {network.show_active()}')
    nft = ExtinctSounds[len(ExtinctSounds) - 1]
    token_id = nft.tokenCounter()
    transaction = nft.safeMint(account, sample_token_uri, {"from": account})
    transaction.wait(1)

    opensea_test_url = f"{utils.opensea_testnet_url}/{nft.address}/{token_id}"
    print(opensea_test_url)