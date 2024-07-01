############################################################################################################
# The Autocomplete system by trie data structure

#Tried methods: Brute force approach - O(n*m*k)~O(n^3) time complexity ; Can be improved

# Current Approach : Trie

# Better approach: Complex trie data structure (Automated), DP?? 
# Make life easy approach: Use a library (elastic search, redis,whoosh, mongodb or any other vector search)
############################################################################################################

# Import the necessary libraries
import pytrie
import json
import nltk
from nltk import tokenize
nltk.download('punkt')

#load the data from the json file (testing purposes)
# def load_data(file_path):
#     with open(file_path, 'r') as f:
#         data = json.load(f)
#     return data

# create a trie data structure
def load_trie(data):
    trie = pytrie.StringTrie()

    def insert(key, artist):
        if key:
            key = key.lower()
            artist = artist.lower()
            if key in trie:
                trie[key].add(artist)
            else:
                trie[key] = {artist}

    for artist in data:
        name = artist.get("name", "No Name").lower()
        insert(name, name)

        for album in artist.get("albums", []):
            insert(album.get("title", "No Title").lower(), name)
            description = album.get("description", "No Description").strip().lower()
            #descriptions are tokenized into sentences, well its long so shotening it a bit
            #Can be improved by using a better tokenizer or a better approach
            des = tokenize.sent_tokenize(description)
            for d in des:
                insert(d, name)
            insert(album.get("description", "No Description").strip().lower(), name)

            for track in album.get("songs", []):
                insert(track.get("title", "No Track"), name)

    return trie


#Partial Autocomplete function
def autocomplete_partial(trie, prefix):
    prefix = prefix.lower()
    matches = []
    for key in trie:
        if prefix in key:
            for artist in trie[key]:
                matches.append((key, artist))
    return matches

# Autocomplete function
def autocomplete(trie, prefix):
    results = []
    prefix = prefix.lower()
    for key in trie.iterkeys(prefix):
        for artist in trie[key]:
            results.append((key, artist))
    #if no results found, try partial autocomplete for now
    if len(results) == 0:
        results = autocomplete_partial(trie, prefix)
    return results




# # Main function (Testng purposes only)

# def main():
#     # Load the JSON data
#     data = load_data('####')

#     # Create a Trie
#     trie = create_trie(data)

#     # Test the autocomplete function
#     prefix = "To"
#     print(f"Autocomplete suggestions for {prefix} : ")
#     completions = autocomplete(trie, prefix)
#     for completion, artist in completions:
#         print('\n')
#         print(f"{completion} (Artist: {artist})")


# if __name__ == "__main__":
#     main()
