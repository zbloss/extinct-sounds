from brownie import ExtinctSounds, accounts, network, config
from utils import Utils

def main():
    utils = Utils()
    account = utils.get_account()
    print(utils.active_network)
    ExtinctSounds.deploy({"from": account}, publish_source=utils.get_publish_source())
