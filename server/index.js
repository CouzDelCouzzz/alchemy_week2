const express = require("express")
const verifyProof = require("../utils/verifyProof")

const port = 1225

const app = express()
app.use(express.json())

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
// Here I got it by running the example and printing the root
const MERKLE_ROOT = "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa"

app.post("/gift", (req, res) => {
    // grab the parameters from the front-end here
    const body = req.body
    const name = body["name"]
    const proof = body["proof"]

    // verify the proof given by the client
    const isInTheList = verifyProof(proof, name, MERKLE_ROOT)
    if (isInTheList) {
        res.send(`You got a toy robot ${name}!`)
    } else {
        res.send(`You are not on the list ${name}:(`)
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})
