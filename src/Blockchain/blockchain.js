class Block {
    constructor(index, previousHash, timestamp, data, hash) {
        this.index = index;
        this.previousHash = previousHash.toString();
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash.toString();
    }
}

const hashCode = (s) => {
    return s.split("").reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
}

const calculateHash = (index, previousHash, timestamp, data) => {
    return hashCode(index + previousHash + timestamp + data);
};

const getGenesisBlock = () => {
    const timestamp = new Date().getTime() / 1000;
    const data = 0;
    return new Block(0, "0", timestamp, data,
        calculateHash(0, "0", timestamp, data));
};

const genesisBlock = getGenesisBlock()

const generateNextBlock = (blockData, blockchain) => {
    const previousBlock = getLatestBlock(blockchain);
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = new Date().getTime() / 1000;
    const nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
};


const calculateHashForBlock = (block) => {
    return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
};

const addBlock = (newBlock, blockchain) => {
    blockchain.push(newBlock);
};

const isValidNewBlock = (newBlock, previousBlock) => {
    if (previousBlock.index + 1 !== newBlock.index) {
        //invalid index
        console.log("invalid index")
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        //invalid previous hash
        console.log("invalid previous hash")
        return false;
    } else if (String(calculateHashForBlock(newBlock)) !== String(newBlock.hash)) {
        // invalid hash
        console.log("invalid hash")
        return false;
    }
    return true;
};

const replaceChain = (newBlocks, blockchain) => {
    if (isValidChain(newBlocks) && newBlocks.length > blockchain.length) {
        console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
        blockchain = newBlocks;
        return blockchain;
    } else {
        console.log('Received blockchain invalid');
    }
};

const isValidChain = (blockchainToValidate) => {
    if (JSON.stringify(blockchainToValidate[0]) !== JSON.stringify(getGenesisBlock())) {
        return false;
    }
    let tempBlocks = [blockchainToValidate[0]];
    for (let i = 1; i < blockchainToValidate.length; i++) {
        if (isValidNewBlock(blockchainToValidate[i], tempBlocks[i - 1])) {
            tempBlocks.push(blockchainToValidate[i]);
        } else {
            return false;
        }
    }
    return true;
};

const getLatestBlock = (blockchain) => blockchain[blockchain.length - 1];
const write = (ws, message) => ws.send(JSON.stringify(message));
