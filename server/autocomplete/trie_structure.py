class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.word = True

    def search(self, word):
        curr = self.root
        for c in word:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return curr.word

    def _find_node(self, prefix):
        curr = self.root
        for c in prefix:
            if c not in curr.children:
                return None
            curr = curr.children[c]
        return curr

    def _collect_words(self, node, prefix):
        words = []
        if node.word:
            words.append(prefix)

        for c, child_node in node.children.items():
            words.extend(self._collect_words(child_node, prefix + c))

        return words

    def is_valid(self, prefix):
        node = self._find_node(prefix)
        if not node:
            return False
        return True

    def autocomplete(self, prefix):
        node = self._find_node(prefix)
        if not node:
            return []
        return self._collect_words(node, prefix)