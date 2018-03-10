import web3 from './web3'
import RentalLibrary from '../../truffle/build/contracts/RentalLibrary'
import contractsConfig from '@/contractsConfig'

var Contract = web3.eth.contract(RentalLibrary.abi)
var contractInstance = Contract.at(contractsConfig.addresses.RentalLibrary)

function getAccount() {
  return web3.eth.accounts[0]
}

function contractCall(contractFnName, argsArr) {
  argsArr = argsArr || []

  const acc = getAccount()
  argsArr.push({from: acc})

  return new Promise(function(resolve, reject) {
    function callback(err, res) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log(res)
        resolve(res)
      }
    }

    argsArr.push(callback)

    contractInstance[contractFnName].apply(null, argsArr)
  })
}

export default {
  addBook({ISBN, pricePerDay, lendDays, hasCovers, hasAllPages, isStrikedThrough, isShabby}) {
    // TODO: validate inputs

    return contractCall('addBook', [ISBN, pricePerDay, lendDays, hasCovers, hasAllPages, isStrikedThrough, isShabby])
  },
  getArbitrators() {
    return contractCall('getArbitrators')
  },
  getISBNs() {
    return contractCall('getISBNs')
  },
  addArbitrator({addr}) {
    // TODO: validate inputs

    return contractCall('addArbitrator', [addr])
  },
  removeArbitrator(addr) {
    // TODO: validate inputs

    return contractCall('removeArbitrator', [addr])
  },
}
