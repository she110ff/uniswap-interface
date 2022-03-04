import { ChainId } from 'moonbeamswap'
import MULTICALL_ABI from './abi.json'
import { multicall } from '../../boaswap_address.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.STANDALONE]: '0xF8cef78E923919054037a1D03662bBD884fF4edf',
  [ChainId.ROPSTEN]: multicall,
  [ChainId.LUNIVERSE_TEST]: multicall,
  [ChainId.LUNIVERSE_PROD]: multicall
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
