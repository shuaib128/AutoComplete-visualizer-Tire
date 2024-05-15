class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Inserts a word into the Trie
    insert(word) {
        let currentNode = this.root;
        for (let char of word) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
            }
            currentNode = currentNode.children[char];
        }
        currentNode.isEndOfWord = true;
    }

    // Finds all words in the Trie that start with the given prefix
    findWordsWithPrefix(prefix) {
        let results = [];
        let currentNode = this.root;

        // Navigate to the node of the last char of the prefix
        for (let char of prefix) {
            if (!currentNode.children[char]) {
                return results; // Return empty if prefix is not present
            }
            currentNode = currentNode.children[char];
        }

        // Recursive function to find all words from the current node
        const search = (node, string) => {
            if (node.isEndOfWord) {
                results.push(string);
            }
            for (let char in node.children) {
                search(node.children[char], string + char);
            }
        };

        search(currentNode, prefix);
        return results;
    }
}

// Helper function for autocomplete
function autocomplete(trie, prefix) {
    return trie.findWordsWithPrefix(prefix);
}

const trie = new Trie();

function updateWordList(words) {
    const wordsDiv = document.querySelector(".words");
    wordsDiv.innerHTML = ""; // Clear any existing words

    words.forEach((word) => {
        const wordDiv = document.createElement("p");
        wordDiv.className = "word";
        wordDiv.innerText = word;
        wordsDiv.appendChild(wordDiv);
    });
}

/**
 * Fetch the data
 */
fetch("/data/words.txt")
    .then((response) => response.text())
    .then((text) => {
        const words = text.split("\n").map((word) => word.trim());
        words.forEach((word) => trie.insert(word));
    })
    .catch((error) => console.error("Error loading word list:", error));

const textInput = document.getElementById("search-field");
textInput.addEventListener("input", (event) => {
    updateWordList(autocomplete(trie, event.target.value));
    // console.log(autocomplete(trie, event.target.value));
});
