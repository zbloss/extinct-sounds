import json
import logging
import os
import sys
from glob import glob

import requests

from .infura_response import InfuraResponse


class Infura:
    def __init__(
        self,
        infura_project_id: str,
        infura_project_secret: str,
        infura_api: str = "https://ipfs.infura.io:5001/api/v0",
    ):
        self.infura_project_id = infura_project_id
        self.infura_project_secret = infura_project_secret
        self.infura_api = infura_api
        self.infura_api_add_endpoint = f"{infura_api}/add"
        self.infura_api_cat_endpoint = f"{infura_api}/cat"
        self.requests_auth = tuple([self.infura_project_id, self.infura_project_secret])

    def __extract_filename(self, filepath: str):
        """
        Given a path to a file, this extracts
        the filename from the path and returns
        it.

        Arguments:
            filepath (str): Path to the file you want to upload.

        Returns:
            str: Filename.

        """
        assert os.path.isfile(filepath), f"Filepath is not valid: {filepath}"
        _, filename = os.path.split(filepath)
        return filename

    def upload_file(self, filepath: str) -> InfuraResponse:
        """
        Given a path to a file, this uploads that
        file to IPFS via Infura and returns the
        IPFS CID

        Arguments:
            filepath (str): Path to the file you want to upload.

        Returns:
            InfuraResponse: Contains the Name, Hash, and Size of
                            the uploaded file.

        """

        assert os.path.isfile(filepath), f"Filepath provided does not exist: {filepath}"

        with open(filepath, "r") as f:
            file = f.read()
            f.close()

        filename = self.__extract_filename(filepath)

        response = requests.post(
            self.infura_api_add_endpoint,
            files={filename: file},
            auth=self.requests_auth,
        )

        if response.status_code == 200:
            json_response = json.loads(response.content.decode())
            return InfuraResponse(**json_response)

    def download_file(self, ipfs_cid: str) -> str:
        """
        Given an IPFS CID, downloads the file
        from IPFS and returns the file contents.

        Arguments:
            ipfs_cid (str): IPFS CID Hash of the file you want
                            to retrieve.

        Returns:
            bytes: File contents from IPFS as a bytes object.

        """

        params = (("arg", ipfs_cid),)

        response = requests.post(
            "https://ipfs.infura.io:5001/api/v0/cat",
            params=params,
            auth=self.requests_auth,
        )

        if response.status_code == 200:
            content_as_bytes = response.content
            return content_as_bytes
