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
#### Prepare an ethereum keystore
```$json
$ cat ./ropsten_keyfile
{
    "crypto" : {
        "cipher" : "aes-128-ctr",
        "cipherparams" : {
            "iv" : "83dbcc02d8ccb40e466191a123791e0e"
        },
        "ciphertext" : "d172bf743a674da9cdad04534d56926ef8358534d458fffccd4e6ad2fbde479c",
        "kdf" : "scrypt",
        "kdfparams" : {
            "dklen" : 32,
            "n" : 262144,
            "r" : 1,
            "p" : 8,
            "salt" : "ab0c7876052600dd703518d6fc3fe8984592145b591fc8fb5c6d43190334ba19"
        },
        "mac" : "2103ac29920d71da29f15d75b4a16dbe95cfd7ff8faea1056c33131d846e3097"
    },
    "id" : "3198bc9c-6672-5ab3-d995-4942343ae5b6",
    "version" : 3
}
```
#### Setup environment variables
```$bash
$ export INFURA_API_KEY=YourInfuraAPIKey
$ export ACCOUNT_PASSWORD=yourpassword
```
#### Deploy contracts
```bash
$ rm -rf ./build && truffle compile && truffle migrate --network ropsten --verbose
```
