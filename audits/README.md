### Audit by Oyente

```
$ truffle-flattener contracts/DataXchainToken.sol > DataXchainTokenFlattened.sol
$ truffle-flattener contracts/TokenDistributor.sol > TokenDistributorFlattened.sol
$ truffle-flattener contracts/TokenRegistor.sol > TokenRegistorFlattened.sol
```

```
# solc 버전 변경을 위해 기존 oyente 이미지에 복사
$ sudo docker build -f ./audits/DockerfileOyente -t myoyente .
$ sudo docker run -it -v $(pwd):/tmp myoyente bash

$ cd /oyente/oyente && python oyente.py -s /tmp/DataXchainTokenFlattened.sol
$ cd /oyente/oyente && python oyente.py -s /tmp/TokenDistributorFlattened.sol
$ cd /oyente/oyente && python oyente.py -s /tmp/TokenRegistorFlattened.sol
```


### Audit by Mythril

```
$ sudo docker run -v $(pwd):/tmp -w "/tmp/" mythril/myth --truffle --max-depth 12
```