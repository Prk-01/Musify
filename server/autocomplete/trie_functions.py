import json
import nltk
import string
from nltk import tokenize
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
# from trie_structure import Trie

nltk.download('punkt')
nltk.download('stopwords')

# This function reads the data from the json file
def get_data(path):
    try:
        with open(path, 'r') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        # I know its a bad practice to use print but i am just trying to see if the file is not found
        # and we will have this file as is uploaded manully for now
        print("Database not found")


#This function is used to extract keywords from certain functions
#Only word selcted fields
def extract_keywords(sentence):
    # Define the list of stop words
    stop_words = set(stopwords.words('english'))
    # Tokenize the sentence into words
    words = word_tokenize(sentence)
    # if its only one word its already in the trie
    if len(words)>=2:
      # Remove punctuation from each word
      words = [word.strip(string.punctuation) for word in words]
      # Filter out stop words and smaller words
      keywords = [word for word in words if word not in stop_words and word.isalpha()and len(word)>3]
      return keywords
    return []


# This function builds the trie from the data
def build_trie(data,Trie):
    trie = Trie()
    for artist in data:
        name = artist.get("name", "No Name").strip().lower()
        trie.insert(name)
        split_name=extract_keywords(name)
        for word in split_name:
            trie.insert(word)

        for album in artist.get("albums", []):
            trie.insert(album.get("title", "No Title").strip().lower())
            description = album.get("description", "No Description").strip().lower()
            # descriptions are tokenized into sentences, well its long so shotening it a bit
            # Can be improved by using a better tokenizer or a better approach
            des = tokenize.sent_tokenize(description)
            for d in des:
                trie.insert(d)

            for track in album.get("songs", []):
                track_title = track.get("title", "No Title").strip().lower()
                trie.insert(track_title)
                split_track=extract_keywords(track_title)
                for word in split_track:
                    trie.insert(word)
    return trie


# Testing


# data = get_data('../data/data.json')
# trie = build_trie(data,Trie)
#
# completions=trie.autocomplete("t")
# for i in completions:
#     print(i)