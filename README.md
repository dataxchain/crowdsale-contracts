# crowdsale-contracts
DataXchain Crowdsale contracts http://dataxchain.org/

### Prerequisites
- Install npm
- Install Truffle and Ganache

### Install requirements with npm:
```
npm install
```

### Run tests
```bash
$ rm -rf ./build && truffle compile && truffle test --network development --reset
```

### Deploy
#### Prepare the ethereum keystore
```$json
$ cat ./ropsten_keyfile
{
    "crypto" : {
        "cipher" : "aes-128-ctr",
        "cipherparams" : {
            "iv" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        },
        "ciphertext" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "kdf" : "scrypt",
        "kdfparams" : {
            "dklen" : 32,
            "n" : xxxxxx,
            "r" : 1,
            "p" : 8,
            "salt" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        },
        "mac" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    },
    "id" : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "version" : 3
}
```
#### Setup environment variables
```$bash
$ export INFURA_API_KEY=YourInfuraAPIKey
$ export ACCOUNT_PASSWORD=yourpassword

# Ethereum accounts for the reserved allocation
$ export MEMBER_ADDR=0xYourEthereumAddress
$ export FOUNDATION_ADDR=0xYourEthereumAddress
```
#### Deploy contracts
```bash
$ rm -rf ./build && truffle compile && truffle migrate --network ropsten --verbose
```
