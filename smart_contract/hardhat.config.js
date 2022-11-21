require('@nomiclabs/hardhat-waffle');
//https://eth-goerli.g.alchemy.com/v2/eErCUzpYMdtL1ozhI2D5yVkG-rdzKC_U

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/eErCUzpYMdtL1ozhI2D5yVkG-rdzKC_U',

      accounts: [
        'dcf8b2f843ab71ff5f75ad28ebbba14685cc5db604038bb75e14e0f6112c772d',
      ],
    },
  },
};
