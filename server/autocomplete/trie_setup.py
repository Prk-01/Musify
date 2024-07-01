############################################################################################################
# The Autocomplete system by trie data structure

#Tried methods: Brute force approach - O(n*m*k)~O(n^3) time complexity ; Can be improved

# Current Approach : Trie

# Better approach: Complex trie data structure (Automated), DP?? 
# Make life easy approach: Use a library (elastic search, whoosh, mongodb or any other vector search)
############################################################################################################

# Import the necessary libraries
import pytrie
import json


# Load the JSON data
with open('../data/data.json', 'r') as f:
    data = json.load(f)


#Using the pytrie library as not sure if we would stick to this approach
#Simple imeplementation of Trie

# Create a Trie
trie = pytrie.StringTrie()

# Insert the data into the Trie,
# keeping the artist name as the value for the key to return soemthing relevant for search
def insert(key, artist):
    if key:
        key = key.lower()
        artist = artist.lower()
        if key in trie:
            trie[key].add(artist)
        else:
            trie[key] = {artist}


#Tavese the data to insert into the trie
#Our data is complete handling not fouund with "No *data*"
for artist in data:
    name = artist.get("name","No Name").lower()
    insert(name, name)

    #Traverse the the artist to get the albums and description
    for album in artist.get("albums", []):
        insert(album.get("title","No Title").lower(), name)
        insert(album.get("description","No Description").strip().lower(), name)

        #Traverse the album to get the tracks
        for track in album.get("songs", []):
            insert(track.get("title","No Track"), name)


# Function to autocomplete using prefix matching
def autocomplete(prefix):
    # Time Complexity: O(k + m) where k is the length of the prefix and m is the number of matching keys
    results = []
    prefix = prefix.lower()
    for key in trie.iterkeys(prefix):
        for artist in trie[key]:
            results.append((key, artist))
    return results


#Test the autocomplete function
prefix = "Taylor Swi"
print(f"Autocomplete suggestions for {prefix} : ")
completions = autocomplete(prefix)
for completion, artist in completions:
    print(f"{completion} (Artist: {artist})")




