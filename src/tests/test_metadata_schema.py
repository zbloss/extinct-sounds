import unittest

from src.nft.metadata_schema import Attribute, Metadata


class TestMetadataSchema(unittest.TestCase):
    def setUp(self):
        sample_attributes = []
        for i in range(5):
            sample_attributes.append(Attribute(trait_type=f"trait_{i}", value=i))

        self.sample_attributes = sample_attributes
        self.name = "my_nft"
        self.description = "Here is a sample\n description!"
        self.image = "ipfs://link/to/image.png"
        self.external_url = "ipfs://link/to/audio.mp3"
        self.animation_url = self.external_url
        self.attributes = [attribute.dict() for attribute in self.sample_attributes]
        self.expected_dictionary = {
            "name": self.name,
            "description": self.description,
            "image": self.image,
            "external_url": self.external_url,
            "animation_url": self.animation_url,
            "attributes": self.attributes,
        }

    def test_metadata_builds(self):

        meta = Metadata(
            name=self.name,
            description=self.description,
            image=self.image,
            external_url=self.external_url,
            animation_url=self.animation_url,
            attributes=self.sample_attributes,
        )
        metadata_dictionary = meta.dict()
        self.assertDictEqual(metadata_dictionary, self.expected_dictionary)

    def test_metadata_builds_without_animation_url(self):
        name = "my_nft"
        description = "Here is a sample\n description!"
        image = "ipfs://link/to/image.png"
        external_url = "ipfs://link/to/audio.mp3"
        attributes = [attribute.dict() for attribute in self.sample_attributes]

        meta = Metadata(
            name=self.name,
            description=self.description,
            image=self.image,
            external_url=self.external_url,
            attributes=self.sample_attributes,
        )
        metadata_dictionary = meta.dict()
        self.assertDictEqual(metadata_dictionary, self.expected_dictionary)
