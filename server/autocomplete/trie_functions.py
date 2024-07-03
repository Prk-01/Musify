import json
import nltk
from nltk import tokenize
# from trie_structure import Trie

nltk.download('punkt')


def get_data(path):
    try:
        with open(path, 'r') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        # I know its a bad practice to use print but i am just trying to see if the file is not found
        # and we will have this file as is uploaded manully for now
        print("Database not found")


def build_trie(data,Trie):
    trie = Trie()
    for artist in data:
        name = artist.get("name", "No Name").lower()
        trie.insert(name)

        for album in artist.get("albums", []):
            trie.insert(album.get("title", "No Title").lower())
            description = album.get("description", "No Description").strip().lower()
            # descriptions are tokenized into sentences, well its long so shotening it a bit
            # Can be improved by using a better tokenizer or a better approach
            des = tokenize.sent_tokenize(description)
            for d in des:
                trie.insert(d)

            for track in album.get("songs", []):
                trie.insert(track.get("title", "No Track"))
    return trie


# Testing


# data = get_data('../data/data.json')
# trie = build_trie(data,Trie)
#
# completions=trie.autocomplete("t")
# for i in completions:
#     print(i)