import brownie
import pytest
from web3 import Web3
from utils import Utils

@pytest.fixture(scope="function", autouse=True)
def isolate(fn_isolation):
    # perform a chain rewind after completing each test, to ensure proper isolation
    # https://eth-brownie.readthedocs.io/en/v1.12.3/tests-pytest-intro.html#isolation-fixtures
    pass

@pytest.fixture(scope="module")
def nft(ExtinctSounds):
    utils = Utils()
    account = utils.get_account()
    return ExtinctSounds.deploy({"from": account})

@pytest.fixture(scope="module")
def utils():
    return Utils()

@pytest.fixture
def token_metadata_uri():
    return "https://my-nft.metadata/here-is-some-cool-metadata.json"

@pytest.fixture(scope="module")
def zero_address():
    return "0x0000000000000000000000000000000000000000"


@pytest.fixture(scope="module")
def valid_account():
    utils = Utils()
    account = utils.get_account()
    return account


@pytest.fixture(scope="module")
def invalid_account():
    utils = Utils()
    account = utils.get_account(1)
    return account