# Boaswap Readme

# Deployment

build contracts

```solidity
yarn build
```

hardhat console

```solidity
yarn console
```

## deploy contracts

deploy standalone for local

```solidity
yarn standalone:deploy
```

deploy ropsten for Ethereum testNet

```solidity
yarn ropsten:deploy
```

deploy luniverse test

```solidity
yarn luniverse_test:deploy
```

deploy luniverse production

```solidity
yarn luniverse_prod:deploy
```

# Test

# Fork

Token Pair에 대한 Swap, Liquidity 를  목표로 하는 Boaswap에서 Uniswap, Pancakeswap, SushiSwap Moonbeam 을 포크 대상으로 비교하였습니다. 

- Uniswap은 v2/v3 를 모두 수용하기 위해 포함되는 필요하지 않은 코드들이 많습니다.
- Pancakeswap, Sushiswap은 farm, prediction등 필요하지 않은 서비스를 제공하는 인터페이스가 많습니다.
- Moonbeam 은 swap과 pool 만을 제공하므로 목적에 맞고 필요한 부분만을 구현하고 있습니다.

사용하지 않는 기능과 서비스를 제거하는 불필요한 작업을 수행할 필요가 없는 Moonbeam을 기반으로 포크를 결정하게 되었습니다. 

[Moonbeam Swap](https://github.com/PureStake/moonbeam-uniswap) 을 포크하면 하위에 세개의 저장소가 있습니다.

### **Uniswap Contracts Moonbeam**

Uniswap 의 periphery, core contract 패키지를 하위 폴더에 분리하여 하나의 저장소로 통합하였고,  Standalone Moonbeam node 를 사용하는 Hardhat 설정이 포함되어 있습니다.

### **Uniswap Interface Moonbeam**

The simple v2 Uniswap interface 에서 변경된  Moonbase Alpha 와 Standalone Moonbeam node 설정을 포함하고 있습니다. 

### **Uniswap SDK Moonbeam**

Uniswap SDK에서 변경된 Pancakeswap의 코드가 사용되고 있습니다. 그러나 Uniswap 의 sdk-core 패키지는 변경없이 사용합니다. 

# Changes

## Common

### naming

**디렉토리명을  Moonbeam에서 Boaswap으로 변경**합니다.

### network

4개의 네트워크를 대상으로 정합니다.

- local : standalone(local)
- dev : ropsten
- test : luniverse-test
- prod : luniverse-prod

## Boaswap Contracts

### Liquidity Token information

 Liquidity Token으로 사용하는 `UniswapV2ERC20` 컨트랙트의 `name`, `symbol`  을 각각 “Boaswap”, “BOA-LP” 로 변경합니다.  

### Init Code Hash

`UniswapV2Library` > `pairFor` 에서 사용되는 ‘init code hash’를 pair를 create2 하는 방식 호출 위해 변경된 `UniswapV2ERC20` 의 해시 값을 `hex'c6d3f0c0b4e23fa6fef6dff4530ac633fc081ff9e17b69e562a23a303db8f817'` 로 변경합니다. 

### hardhat.config.js

moonbase 대신 standalone, testNet(ropsten), mainNet(Luniverse)의 설정을 추가합니다. 

- standalone : http://127.0.0.1:9933, 1281
- ropsten : `https://ropsten.infura.io/v3/${***process***.env.INFURA_API_KEY}`**, 2**
- luniverse-test : ?**, 1286(임시)**
- luniverse-prod : ? **, 1287(임시)**

### deploy-factory.js

standalone-deploy-factory.js 를 추가하여 사용자 테스트를 쉽게 하기 위해 로컬 배포시 WBOA, GTA, GTB 토큰 생성과 WBOA-GTA 유동성을 공급합니다. 

### package.json

script 에 local:deploy, dev:deploy, test:deploy, prod:deploy 를 추가합니다. 

## Boaswap SDK

### abis

다음과 같이 `UniswapV2Pair.json` 의 일치를 위해 build 된 json을 abis 에 추가하고 constants.test.ts 에서 경로를 변경합니다.

```solidity
import { bytecode } from '../src/abis/UniswapV2Pair.json'
```

### constants.ts

enum `ChainId` 를 변경합니다. (hardhat.config.js 참고)

const ***`FACTORY_ADDRESS`*** 를 변경합니다.     

const ***`INIT_CODE_HASH`*** 를 변경합니다. 

### token.ts

const ***`WDEV` 에서***  chain에 맞는 WETH를 설정합니다.  

### test

대부분의 파일에서 아래와 같이

1. import 구문에서 WETH를 WDEV as WETH로 변경합니다. 
2. ChainId.MAINNET, RINKEBY 를 *`ROPSTEN`* , *`LUNIVERSE_PROD`*  등에 맞게 변경합니다. 

## Boaswap interface

# Unchanges

1. 소스 코드 내에 Uniswap을 Boaswap으로 변경하지 않습니다.