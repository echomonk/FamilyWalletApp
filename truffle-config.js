

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*",
    //  gasPrice: 20000000000,
    //  gasLimit: 550000000

    },
  },

  compilers: {
    solc: {
      version: "0.8.13",
    }
  },
}
