var PrivateKeyProvider = require("truffle-privatekey-provider");

var Web3 = require("web3");
var fs = require("fs");

function get_provider(provider_url, keyfile_name) {
    try {
        var provider_url = provider_url + process.env.INFURA_API_KEY;
        var web3 = new Web3(new Web3.providers.HttpProvider(provider_url));

        var keyfile = fs.readFileSync(keyfile_name, 'utf-8');
        const decrypted_keyfile =
            web3.eth.accounts.decrypt(keyfile, process.env.ACCOUNT_PASSWORD);
        const privatekey = decrypted_keyfile.privateKey.substring(2);

        return new PrivateKeyProvider(privatekey, provider_url);
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = {
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    },
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*" // Match any network id
        },
        ropsten: {
            provider: get_provider(
                "https://ropsten.infura.io/", "keyfiles/ropsten_keyfile"),
            network_id: 3,
            gas: 4.7e6
        },
        mainnet: {
            provider: get_provider(
                "https://mainnet.infura.io/", "keyfiles/mainnet_keyfile"),
            network_id: 1,
            gas: 4e6
        }
    },
    mocha: {
        reporter: 'eth-gas-reporter',
        reporterOptions: {
            currency: 'CHF',
            gasPrice: 21
        }
    }
};
