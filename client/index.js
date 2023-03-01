const axios = require("axios")
const niceList = require("../utils/niceList.json")
const MerkleTree = require("../utils/MerkleTree")

const serverUrl = "http://localhost:1225"

async function main() {
    // create the merkle tree for the whole nice list
    const merkleTree = new MerkleTree(niceList)

    // find the proof that the person is in the list
    const name = "Chris Windler" // You can chose whatever you want. We can even make a website to enter a name
    const index = niceList.findIndex((n) => n === name)
    const proof = merkleTree.getProof(index)

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        name: name,
        proof: proof,
    })

    console.log({ gift })
}

main()
