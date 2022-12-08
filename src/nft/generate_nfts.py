# Adds `src` to path so we can import it
import sys
from pathlib import Path

file = Path(__file__).resolve()
package_root_directory = file.parents[2]
sys.path.append(str(package_root_directory))

from metaflow import FlowSpec, Parameter, step

import time
from src.infura.infura import Infura
from src.nft.animate import add_drawing_animation
from src.nft.metadata_schema import Attribute, Metadata
from src.utils import read_file, write_file


class GenerateNFTs(FlowSpec):

    mapping_file = Parameter(
        "mapping_file",
        type=str,
        required=False,
        default="artifacts/raw_mapping.json",
        help="Filepath to a JSON file containing the metadata you want to upload.",
    )
    video_output_directory = Parameter(
        "video_output_directory", type=str, required=False, default="./artifacts/video"
    )
    output_nft_mapping_filepath = Parameter(
        "output_nft_mapping_filepath", type=str, required=False, default="/Users/zbloss/Projects/extinct-sounds/website/src/nfts.json"
    )

    @step
    def start(self):
        import json
        import os

        assert os.path.isfile(self.mapping_file)
        self.artifacts = read_file(self.mapping_file, as_json=True)
        self.next(self.read_nft_keys)

    @step
    def read_nft_keys(self):

        self.nft_keys = list(self.artifacts.keys())
        self.next(self.generate_videos, foreach="nft_keys")

    @step
    def generate_videos(self):
        import os

        self.video_mapping = {}
        try:
            name = self.artifacts[self.input]["name"]
            description = self.artifacts[self.input]["description"]
            image = self.artifacts[self.input]["image"]
            audio = self.artifacts[self.input]["audio"]

        except:
            name = description = image = audio = None

        if (
            name is not None
            and description is not None
            and image is not None
            and audio is not None
        ):
            output_file = os.path.join(self.video_output_directory, f"{self.input}.mp4")
            self.video_filepath = add_drawing_animation(image, audio, output_file)
            print(f'Created video for: {self.input}')
            self.video_mapping[self.input] = {"video": self.video_filepath}

        self.next(self.join)

    @step
    def join(self, inputs):
        import json

        self.artifacts_with_video = {}

        for meta in inputs:

            if meta.video_mapping:
                id_ = list(meta.video_mapping.keys())[0]
                self.artifacts_with_video[id_] = meta.video_mapping[id_]

        self.next(self.add_video_to_artifacts)

    @step
    def add_video_to_artifacts(self):
        artifacts = read_file(self.mapping_file, as_json=True)

        for nft_id in self.artifacts_with_video:
            if nft_id in artifacts:
                artifacts[nft_id]["video"] = self.artifacts_with_video[nft_id]["video"]

        self.combined_artifacts = artifacts
        self.next(self.export_mapping)

    @step
    def export_mapping(self):
        import json
        import os

        self.mapping_file_directory, mapping_filename = os.path.split(self.mapping_file)
        _ = write_file(
            json.dumps(self.combined_artifacts, ensure_ascii=False),
            os.path.join(self.mapping_file_directory, "mapping.json"),
        )

        self.next(self.upload_nft_metadata)

    @step
    def upload_nft_metadata(self):

        import os

        from dotenv import load_dotenv

        load_dotenv()

        infura_project_id = os.getenv("INFURA_PROJECT_ID")
        infura_project_secret = os.getenv("INFURA_API_KEY_SECRET")

        self.infura = Infura(
            infura_project_id=infura_project_id,
            infura_project_secret=infura_project_secret,
        )
        author = "Zachary Bloss"
        info_description = """All of the attached metadata is built for 
            the Extinct-Sounds game (https://extinct-sounds.com/).

            The images were generated using Machine Learning, 
            the audio and description curated from the internet.

            The video was created by applying animations 
            programmatically to the images and combining
            them with the video.
        """

        required_keys = set(["name", "description", "image", "audio", "video"])
        all_metadata = {}
        for nft_id in self.combined_artifacts:
            meta = self.combined_artifacts[nft_id]
            if isinstance(meta, dict) and required_keys.issubset(meta.keys()):
                if (
                    meta["name"] != '' and \
                    meta["description"] != '' and \
                    meta["image"] != '' and \
                    meta["audio"] != '' and \
                    meta["video"] != ''
                ):
                    # upload metadata
                    image_response = self.infura.upload_file(meta["image"], as_bytes=True)
                    audio_response = self.infura.upload_file(meta["audio"], as_bytes=True)
                    video_response = self.infura.upload_file(meta["video"], as_bytes=True)

                    if image_response is None:
                        time.sleep(3)
                        image_response = self.infura.upload_file(meta["image"], as_bytes=True)

                    if audio_response is None:
                        time.sleep(3)
                        audio_response = self.infura.upload_file(meta["audio"], as_bytes=True)

                    if video_response is None:
                        time.sleep(3)
                        video_response = self.infura.upload_file(meta["video"], as_bytes=True)

                    try:
                        image_cid = image_response.Hash
                        audio_cid = audio_response.Hash
                        video_cid = video_response.Hash

                        metadata = [
                            Metadata(
                                name=meta["name"],
                                description=meta["description"],
                                image=f"ipfs://{image_cid}",
                                audio=f"ipfs://{audio_cid}",
                                attributes=[Attribute(trait_type="guesses", value=guess)],
                                external_url=f"ipfs://{video_cid}",
                                author=author,
                                info=info_description,
                            ).dict()
                            for guess in range(1, 7)
                        ]
                        all_metadata[nft_id] = metadata
                        print(f"Successfully uploaded: {nft_id} metadata")
                    except Exception as e:
                        print(f"Failed to upload metadata for nft_id: {nft_id}")
                        print(f"Associated Metadata:", meta)

        self.metadata = all_metadata
        self.next(self.upload_nfts)

    @step
    def upload_nfts(self):
        import json
        import os

        mapping = {}
        for nft_id in self.metadata:
            nft_id_path = os.path.join(self.mapping_file_directory, nft_id)

            if not os.path.exists(nft_id_path):
                os.makedirs(nft_id_path)

            for nft in self.metadata[nft_id]:
                guess_value = nft["attributes"][0]["value"]
                nft_filepath = os.path.join(nft_id_path, f"{guess_value}.json")
                _ = write_file(
                    json.dumps(nft),
                    nft_filepath,
                )
                upload_response = self.infura.upload_file(nft_filepath)
                ipfs_cid = upload_response.Hash
                ipfs_uri = f"ipfs://{ipfs_cid}"

                if not nft_id in mapping:
                    mapping[nft_id] = {}
                mapping[nft_id][guess_value] = ipfs_uri

        _ = write_file(
            json.dumps(mapping),
            self.output_nft_mapping_filepath,
        )

        self.next(self.end)

    @step
    def end(self):
        print("Done")


if __name__ == "__main__":
    GenerateNFTs()
