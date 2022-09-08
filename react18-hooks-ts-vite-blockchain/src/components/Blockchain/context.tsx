/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/08/09 20:02:43 (GMT+0900)
 */
import { SHA256 } from 'crypto-js';
import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from '../../helpers';

const chainsCacheKey = '_chains';
const transactionsCacheKey = '_transactions';

interface TransactionItem {
  id: string;
  name: string;
}

interface BlockItem {
  // `hash value of the previous block` + `current transactions string`
  // SHA256(blocks[index - 1].hash + JSON.stringify(transactions))
  hash: string;
  // An array of transaction IDs
  transactions: string[];
}

interface BlockchainContextValue {
  transactions: TransactionItem[];
  addTransaction: (name: string) => void;
  blocks: BlockItem[];
  writeToBlockchain: () => void;
  tamper: () => void;
  isValid: boolean;
  clearAllBlockchain: () => void;
}

const GENESIS_BLOCK_HASH = 'acb';

// Genesis Block
// see https://en.bitcoin.it/wiki/Genesis_block
// A genesis block is the first block of a block chain.
const GENESIS_BLOCK: BlockItem = {
  hash: GENESIS_BLOCK_HASH,
  transactions: [],
};

export const BlockchainContext = createContext<BlockchainContextValue | null>(
  null
);

interface BlockchainProviderProps {
  children: React.ReactNode;
}

export function BlockchainProvider(props: BlockchainProviderProps) {
  const [transactions, setTransactions] = useState<TransactionItem[]>(
    getLocalStorage(transactionsCacheKey, [])
  );
  const [blocks, setBlocks] = useState<BlockItem[]>(
    getLocalStorage(chainsCacheKey, [GENESIS_BLOCK])
  );

  useEffect(() => {
    setLocalStorage(transactionsCacheKey, transactions);
  }, [transactions]);

  useEffect(() => {
    setLocalStorage(chainsCacheKey, blocks);
  }, [blocks]);

  function addTransaction(name: string) {
    setTransactions([
      ...transactions,
      {
        id: new Date().getTime().toString(16),
        name,
      },
    ]);
  }

  function writeToBlockchain() {
    const prevBlock = blocks[blocks.length - 1];
    // prevBlock.hash + JSON.stringify(transactions.map(item => item.id))
    const hash = SHA256(
      prevBlock.hash + JSON.stringify(transactions.map((item) => item.id))
    ).toString();

    const newBlock: BlockItem = {
      hash,
      transactions: transactions.map((item) => item.id),
    };

    setBlocks([...blocks, newBlock]);
    setTransactions([]);
  }

  function tamperingWithTransaction() {
    const _blocks = [...blocks];
    // remove genesis block
    const genesisBlock = _blocks.shift() as BlockItem;

    const fakeTransactions = Array.from({
      length: Math.ceil(Math.random() * 5),
    }).map(() => Math.random().toString(16).replace('0.', ''));

    if (!_blocks.length) {
      _blocks.push({
        hash: SHA256(
          genesisBlock.hash + JSON.stringify(fakeTransactions)
        ).toString(),
        transactions: fakeTransactions,
      });
    } else {
      const randomIndex = Math.max(
        0,
        Math.floor(Math.random() * _blocks.length)
      );
      _blocks[randomIndex].transactions = fakeTransactions;
    }
    // console.log(_blocks[randomIndex].transactions)
    setBlocks([genesisBlock, ..._blocks]);
  }

  const isValid = useMemo(() => {
    return blocks.every((block, index) => {
      if (index === 0) return block.hash === GENESIS_BLOCK_HASH;
      const hash = SHA256(
        blocks[index - 1].hash + JSON.stringify(block.transactions)
      ).toString();
      return hash === block.hash;
    });
  }, [blocks]);

  function clearAllBlockchain(): void {
    setBlocks([GENESIS_BLOCK]);
  }

  return (
    <BlockchainContext.Provider
      value={{
        transactions,
        addTransaction,
        blocks: blocks.slice(1),
        writeToBlockchain,
        tamper: tamperingWithTransaction,
        isValid,
        clearAllBlockchain,
      }}
    >
      {props.children}
    </BlockchainContext.Provider>
  );
}

export function useBlockchain() {
  return useContext(BlockchainContext);
}
