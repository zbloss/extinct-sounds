import os
import json
import time
from typing import Union

from brownie import Contract, accounts, config, network, web3
from brownie.network import priority_fee
from web3 import Web3

NON_FORKED_LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["hardhat", "development", "ganache"]
LOCAL_BLOCKCHAIN_ENVIRONMENTS = NON_FORKED_LOCAL_BLOCKCHAIN_ENVIRONMENTS + [
    "mainnet-fork",
    "binance-fork",
    "matic-fork",
]
OPENSEA_TESTNET_URL = "https://testnets.opensea.io/assets"


def read_file(
    filepath: str, as_json: bool = True, as_bytes: bool = False
) -> Union[str, dict]:
    """
    Simple helper function to read files.

    Arguments:
        filepath (str): File you want to open.
        as_json (bool): If you want to read the file as
                        json then True else False.
        as_bytes (bool): Read the file as bytes, `rb`.

    Returns:
        Union[str, dict]: String if as_json==False else Dict.

    """

    with open(filepath, "rb" if as_bytes else "r") as f:
        contents = f.read()
        if as_json:
            contents = json.loads(contents)

        f.close()

    return contents


def write_file(
    contents: str,
    filepath: str,
    as_bytes: bool = False,
) -> bool:
    """
    Simple helper function to write files.

    Arguments:
        contents (str): Contents to write to `filepath`.
        filepath (str): File you want to write to.
        as_bytes (bool): Write the file as bytes, `wb`.

    Returns:
        bool: True if successful else False.
    """
    success = False
    with open(filepath, "wb" if as_bytes else "w", encoding="utf-8") as f:
        f.write(contents)
        success = True
        f.close()

    return success


class Utils:
    def __init__(
        self,
        non_forked_local_blockchain_environments: list = [
            "hardhat",
            "development",
            "ganache",
        ],
        local_blockchain_environments: list = [
            "hardhat",
            "development",
            "ganache",
            "mainnet-fork",
            "binance-fork",
            "matic-fork",
        ],
        opensea_testnet_url: str = "https://testnets.opensea.io/assets",
    ):
        self.non_forked_local_blockchain_environments = (
            non_forked_local_blockchain_environments
        )
        self.local_blockchain_environments = local_blockchain_environments
        self.opensea_testnet_url = opensea_testnet_url

        self.active_network = network.show_active()

    def get_account(self, index: int = None, id: int = None):
        """
        Given an optional index or id, this method checks to see
        what environment our code is running on and either grabs
        a dummy account or pulls a specified account given either
        the index or id.
        Arguments:
            index (int): Index of an account to return from the
                         accounts array.
            id (int): The id of an account to be loaded and returned.
        Returns:
            brownie.network.accounts: Brownie account.
        """
        if index:
            return accounts[index]
        if self.active_network in self.local_blockchain_environments:
            return accounts[0]
        if id:
            return accounts.load(id)
        return accounts.add(config["wallets"]["from_key"])

    def get_contract(self, contract_name: str):
        """If you want to use this function, go to the brownie config and add a new entry for
        the contract that you want to be able to 'get'. Then add an entry in the variable 'contract_to_mock'.
        You'll see examples like the 'link_token'.
            This script will then either:
                - Get a address from the config
                - Or deploy a mock to use for a network that doesn't have it
        Arguments:
            contract_name (str): This is the name that is referred to in the
            brownie config and 'contract_to_mock' variable.
        Returns:
            brownie.network.contract.ProjectContract: The most recently deployed
            Contract of the type specificed by the dictionary. This could be either
            a mock or the 'real' contract on a live network.
        """
        contract_type = contract_to_mock[contract_name]
        if self.active_network in self.non_forked_local_blockchain_environments:
            if len(contract_type) <= 0:
                # TODO: Add deploy_mocks() method
                # self.deploy_mocks()
                print("Deployed Mocks")

            contract = contract_type[-1]
        else:
            try:
                contract_address = config["networks"][self.active_network][
                    contract_name
                ]
                contract = Contract.from_abi(
                    contract_type._name, contract_address, contract_type.abi
                )
            except KeyError:
                print(
                    f"{self.active_network} address not found, perhaps you should add it to the config or deploy mocks?"
                )
                print(
                    f"brownie run scripts/deploy_mocks.py --network {self.active_network}"
                )
        return contract

    def get_artifacts(self):
        with open(config["artifacts"], "r") as f:
            artifacts = json.loads(f.read())
            f.close()
        return artifacts

    @staticmethod
    def get_publish_source():
        if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS or not os.getenv(
            "ETHERSCAN_TOKEN"
        ):
            return False
        else:
            return True
