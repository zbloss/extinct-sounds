from brownie import ExtinctSounds, accounts, network, config
from utils import Utils
import shutil
import os

def main():
    utils = Utils()
    account = utils.get_account()
    print(utils.active_network)
    ExtinctSounds.deploy({"from": account}, publish_source=utils.get_publish_source())

    source_directory = './build'
    destination_directory = '../website/src/build'
    if os.path.isdir(destination_directory):
        shutil.rmtree(destination_directory)
    shutil.copytree('./build', '../website/src/build')
    