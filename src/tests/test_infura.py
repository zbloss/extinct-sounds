import os
import unittest

from dotenv import load_dotenv

from src.infura.infura import Infura
from src.infura.infura_response import InfuraResponse


class TestInfura(unittest.TestCase):
    def setUp(self):
        load_dotenv()
        self.infura_project_id = os.getenv("INFURA_PROJECT_ID")
        self.infura_project_secret = os.getenv("INFURA_API_KEY_SECRET")

        assert self.infura_project_id is not None
        assert self.infura_project_secret is not None

        self.infura_api_endpoint = "https://ipfs.infura.io:5001/api/v0"
        self.test_filepath = "testfile.txt"
        self.test_file_content = "Here is a test file"
        self.test_hash = "QmaYu8guCRP8AJmD5x13LbmivcUJETXZJFzCjQYnRgMBGq"
        self.test_size = "27"

        self.expected_upload_infura_response = InfuraResponse(
            **{
                "Name": self.test_filepath,
                "Hash": self.test_hash,
                "Size": self.test_size,
            }
        )

        with open(self.test_filepath, "w") as f:
            f.write(self.test_file_content)
            f.close()

        self.infura = Infura(
            infura_project_id=self.infura_project_id,
            infura_project_secret=self.infura_project_secret,
        )

    def test_upload_file(self):

        upload_file_response = self.infura.upload_file(self.test_filepath)
        self.assertEqual(upload_file_response, self.expected_upload_infura_response)

    def test_download_file_type(self):

        download_file_response = self.infura.download_file(self.test_hash)
        self.assertIsInstance(download_file_response, bytes)

    def test_download_file_content(self):

        upload_file_response = self.infura.upload_file(self.test_filepath)
        uploaded_file_hash = upload_file_response.Hash
        download_file_response = self.infura.download_file(uploaded_file_hash)

        self.assertEqual(download_file_response.decode(), self.test_file_content)

    def tearDown(self):
        os.remove(self.test_filepath)
