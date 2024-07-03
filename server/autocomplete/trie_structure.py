#Custom trie impelmentation for the autocomplete feature

# Trie Node
# Each node has a dictionary of children nodes and a boolean value to indicate if the node represents a word
class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = False

# Trie
# The trie has a root node and supports the following operations:
# - insert(word): inserts a word into the trie
# - search(word): searches for a word in the trie
# - autocomplete(prefix): returns a list of words in the trie that start with the given prefix
class Trie:
    def __init__(self):
        self.root = TrieNode()

    # Inserts a word into the trie
    def insert(self, word):
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.word = True

    # Searches for a word in the trie
    def search(self, word):
        curr = self.root
        for c in word:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return curr.word

    # Finds the node corresponding to the given prefix
    def _find_node(self, prefix):
        curr = self.root
        for c in prefix:
            if c not in curr.children:
                return None
            curr = curr.children[c]
        return curr


    # Collects words starting from the given node with the given prefix
    def _collect_words(self, node, prefix):
        words = []
        if node.word:
            words.append(prefix)

        for c, child_node in node.children.items():
            words.extend(self._collect_words(child_node, prefix + c))

        return words
    
    #Not used handled in front end
    # Returns True if the given prefix is valid (i.e., there is a word in the trie that starts with the prefix)
    def is_valid(self, prefix):
        node = self._find_node(prefix)
        if not node:
            return False
        return True
    

    # Returns a list of words in the trie that start with the given prefix
    def autocomplete(self, prefix):
        node = self._find_node(prefix)
        if not node:
            return []
        return self._collect_words(node, prefix)