module.exports = {
  // Docs: http://truffleframework.com/docs/advanced/configuration
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};