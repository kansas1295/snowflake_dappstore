/* eslint-disable */

import React from 'react'
import { ethers } from 'ethers'
import { isWeb3 } from 'web3-react'
import { Typography } from '@material-ui/core';
import contracts from './contracts'
import { default as defaultLogo } from './defaultLogo.png'

const networkDataById = {
  1: {
    name: 'Mainnet',
    etherscanPrefix: ''
  },
  3: {
    name: 'Ropsten',
    etherscanPrefix: 'ropsten.'
  },
  4: {
    name: 'Rinkeby',
    etherscanPrefix: 'rinkeby.'
  },
  42: {
    name: 'Kovan',
    etherscanPrefix: 'kovan.'
  }
}

const etherscanTypes = {'transaction': 'tx', 'address': 'address', 'token': 'token'}

const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
]

function ensureHexPrefix (string) {
  const candidate = string.substring(0, 2) === '0x' ? string : `0x${string}`
  if (!ethers.utils.isHexString(candidate))
    throw Error('Passed string is not valid hex.')
  return candidate
}

export const TRANSACTION_ERROR_CODES = [
  'GAS_PRICE_UNAVAILABLE', 'FAILING_TRANSACTION', 'SENDING_BALANCE_UNAVAILABLE', 'INSUFFICIENT_BALANCE'
]

export function getNetworkName (networkId) {
  if (!Object.keys(networkDataById).includes(String(networkId))) throw Error(`networkID '${networkId}' is invalid.`)
  return networkDataById[networkId].name
}

export function getAccountBalance (library, address, format = 'ether') {
  return library.eth.getBalance(address)
    .then(balance => library.utils.fromWei(balance, format))
}

export function getEtherscanLink(networkId, type, data) {
  if (!Object.keys(etherscanTypes).includes(type)) throw Error(`type '${type}' is invalid.`)
  if (!Object.keys(networkDataById).includes(String(networkId))) throw Error(`networkID '${networkId}' is invalid.`)

  const path = etherscanTypes[type]
  const prefix = networkDataById[networkId].etherscanPrefix

  return `https://${prefix}etherscan.io/${path}/${data}`
}

export function getERC20Balance (web3js, ERC20Address, address) {
  const ERC20 = new web3js.eth.Contract(ERC20_ABI, ERC20Address)

  const decimalsPromise = () => ERC20.methods.decimals().call()
  const balancePromise = () => ERC20.methods.balanceOf(address).call()

  return Promise.all([decimalsPromise(), balancePromise()])
    .then(([decimals, balance]) => toDecimal(balance, decimals))
}

// Get the selected contract.
export function getContract (contractName) {
  const contractData = contracts[this.props.w3w.getNetworkName()][contractName]
  return this.props.w3w.getContract(contractData.ABI, contractData.address)
}

export const GENERIC_SNOWFLAKE_RESOLVER_ABI = [{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"snowflakeDescription","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"snowflakeName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"callOnRemoval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"callOnSignUp","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"snowflakeAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_snowflakeName","type":"string"},{"name":"_snowflakeDescription","type":"string"},{"name":"_snowflakeAddress","type":"address"},{"name":"_callOnSignUp","type":"bool"},{"name":"_callOnRemoval","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"_snowflakeAddress","type":"address"}],"name":"setSnowflakeAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

function getProvider (library) {
  if (isWeb3(library))
    return library.currentProvider
  else
    return library._web3Provider
}

export function sendAsync (library, method, params, from) {
  return new Promise((resolve, reject) => {
    getProvider(library).sendAsync({ method, params, from }, (error, result) => {
      if (error) return reject(error)
      if (result.error) return reject(result.error.message)
      return resolve(result)
    })
  })
}

export async function signPersonal (library, address, message) {
  address = ethers.utils.getAddress(address)

  // format message properly
  let encodedMessage;
  if (Buffer.isBuffer(message)) {
    encodedMessage = ensureHexPrefix(message.toString('hex'))
  } else if (message.slice(0, 2) === '0x') {
    encodedMessage = message
  } else {
    encodedMessage = ensureHexPrefix(Buffer.from(message, 'utf8').toString('hex'))
  }

  return sendAsync(library, 'personal_sign', [encodedMessage, address], address)
    .then((result) => {
      const returnData = {}
      returnData.signature = result.result

      // ensure that the signature matches
      const messageHash = ethers.utils.hashMessage(encodedMessage)
      if (!ethers.utils.verifyMessage(messageHash, returnData.signature))
        throw Error('Signature did not originate from specified address.')

      const signature = ethers.utils.splitSignature(returnData.signature)
      returnData.r = signature.r
      returnData.s = signature.s
      returnData.v = signature.v
      returnData.from = address
      returnData.message = encodedMessage
      returnData.messageHash = messageHash

      return returnData
    })
}

// Links to Etherscans txn.
export function linkify (type, data, display, variant) {
  display = display === undefined ? data : display

  return (
    <Typography
      style={{display: 'inline-block', textDecoration: 'none'}}
      color='primary'
      variant={variant}
      component="a"
      href={this.props.w3w.etherscanFormat(type, data)}
      target="_blank"
    >
      {display}
    </Typography>
  )
}

async function sendTransaction(library, address, method, handlers = {}, transactionOptions = {}) {
      // send the transaction
      return method().send(
        {from: address, value: transactionOptions.value}
      )
        .on('transactionHash', (transactionHash) => {
          handlers['transactionHash'](transactionHash)
        })
        .on('receipt', (receipt) => {
          handlers['receipt'](receipt)
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          handlers['confirmation'](confirmationNumber, receipt)
        })
}

export function toDecimal (number, decimals) {
  number = String(number)
  decimals = Number(decimals)

  if (number.length < decimals) {
    number = '0'.repeat(decimals - number.length) + number
  }
  const difference = number.length - decimals

  const integer = difference === 0 ? '0' : number.slice(0, difference)
  const fraction = number.slice(difference).replace(/0+$/g, '')

  return integer + (fraction === '' ? '' : '.') + fraction
}

export function fromDecimal (number, decimals) {
  number = String(number)
  decimals = Number(decimals)

  var [integer, fraction] = number.split('.')

  fraction = fraction === undefined ? '' : fraction
  if (fraction.length > decimals) throw Error('The fractional amount of the passed number was too high.')
  fraction = fraction + '0'.repeat(decimals - fraction.length)

  return integer + fraction
}

// Function to camel case string
export function toTitleCase(str) {
  return str.replace(
      /\w\S*/g,
      function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  );
}

// Function to remove dashes '-' from a string
export function removeDashes(str) {
  return str.replace(/-/g, ' ');
}

// Function to remove forward slashes '/' from a string
export function removeForwardSlashes(str) {
  return str.replace(/\//g, '')
}

// Function to convert a url string to formatted text: convert dashes to spaces and camel case.
export function titalizeText(str) {
  const removedForwardSlashes = removeForwardSlashes(str)
  const removedDashes = removeDashes(removedForwardSlashes)
  const titalizeText = toTitleCase(removedDashes)

  return titalizeText
}

export {
  sendTransaction,
};
