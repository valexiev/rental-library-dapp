var RentalLibrary = artifacts.require("./RentalLibrary.sol")

module.exports = function(deployer) {
  deployer.deploy(RentalLibrary)
}
