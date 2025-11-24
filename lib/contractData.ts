/**
 * Contract Data Helper
 * 
 * Implementação temporária local (substitui @wodxpro/contract-data)
 * TODO: Substituir por pacote NPM quando disponível
 */

// Endereços dos contratos deployados na Polygon Mainnet (Chain ID: 137)
// IMPORTANTE: Estes são os endereços reais na mainnet
const CONTRACT_ADDRESSES: Record<string, Record<number, string>> = {
  WODToken: {
    137: '0x888476eA56322CFd5D08DFf8F247b1ab6bd6bB3e', // Polygon Mainnet
  },
  ValidatorRegistry: {
    137: '0xC802ceb791831949504E8CE5982F6D9625eA6cC1', // Polygon Mainnet
  },
  Arena: {
    137: '0x9B2A87D4C28FA8aBEB14dE889764F66D54b775EE', // Polygon Mainnet
  },
};

// ABIs básicos (minimal - apenas funções essenciais)
// TODO: Adicionar ABIs completos quando disponíveis
const CONTRACT_ABIS: Record<string, any[]> = {
  WODToken: [
    {
      inputs: [{ name: 'account', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { name: 'spender', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [{ name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  Arena: [
    {
      inputs: [{ name: 'challengeId', type: 'uint256' }],
      name: 'getChallenge',
      outputs: [
        { name: 'id', type: 'uint256' },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'reward', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
        { name: 'active', type: 'bool' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ name: 'challengeId', type: 'uint256' }],
      name: 'enterChallenge',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { name: 'challengeId', type: 'uint256' },
        { name: 'proofCID', type: 'string' },
      ],
      name: 'submitProof',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { name: 'challengeId', type: 'uint256' },
        { name: 'athlete', type: 'address' },
        { name: 'approved', type: 'bool' },
      ],
      name: 'vote',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  ValidatorRegistry: [
    {
      inputs: [{ name: 'validator', type: 'address' }],
      name: 'isValidator',
      outputs: [{ name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
  ],
};

export type ContractName = 'WODToken' | 'ValidatorRegistry' | 'Arena';

// IMPORTANTE: Os contratos estão deployados na Polygon Mainnet (Chain ID: 137)
// Usar 137 como padrão, não 80002 (Amoy testnet)
const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '137', 10);

/**
 * Get contract data for a specific contract
 */
export async function getContractDataForChain(contractName: ContractName) {
  const address = CONTRACT_ADDRESSES[contractName]?.[CHAIN_ID] || '0x0';
  const abi = CONTRACT_ABIS[contractName] || [];

  if (address === '0x0') {
    console.warn(`Endereço do contrato ${contractName} não encontrado para chain ${CHAIN_ID}`);
  }

  return {
    address,
    abi,
    chainId: CHAIN_ID,
  };
}

/**
 * Get contract ABI
 */
export async function getContractABIForChain(contractName: ContractName) {
  return CONTRACT_ABIS[contractName] || [];
}

/**
 * Get contract address
 */
export async function getContractAddressForChain(contractName: ContractName) {
  const address = CONTRACT_ADDRESSES[contractName]?.[CHAIN_ID] || '0x0';
  
  if (address === '0x0') {
    console.warn(`Endereço do contrato ${contractName} não encontrado para chain ${CHAIN_ID}`);
  }
  
  return address;
}

/**
 * Get current chain ID
 */
export function getChainId(): number {
  return CHAIN_ID;
}
