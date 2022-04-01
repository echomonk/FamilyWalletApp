const FamilyWalletMigration = artifacts.require("FamilyWallet");

module.exports = function (deployer) {
  deployer.deploy(FamilyWalletMigration);
};
