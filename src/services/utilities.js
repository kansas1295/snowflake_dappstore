import hydro from './contracts/hydro';
import identityRegistry from './contracts/identityRegistry';
import clientRaindrop from './contracts/clientRaindrop';
import oldClientRaindrop from './contracts/oldClientRaindrop';
import snowflake from './contracts/snowflake';
import statusAbi from '../legacy/Rinkeby/0x16fD6e2E1C4afB9C4e7B901141706596317e4ceB/abi';


function subscribeToDeposits(lib, address, callback) {
  const snowflakeContract = new lib.eth.Contract(
    snowflake.abi,
    snowflake.address,
  );

  lib.currentProvider.setMaxListeners(350);

  return snowflakeContract.events.SnowflakeDeposit({
    filter: {
      from: address,
    },
  }, () => {
    callback();
  })
    .on('error', console.error);
}

function getAccountEthBalance(lib, address) {
  return lib.eth.getBalance(address)
    .then(balance => lib.utils.toBN(balance))
    .catch(err => err);
}

function getAccountHydroBalance(lib, address) {
  const hydroContract = new lib.eth.Contract(hydro.abi, hydro.address);

  return hydroContract.methods.balanceOf(address).call()
    .then(balance => lib.utils.toBN(balance))
    .catch(err => err);
}

function getAccountEin(lib, address) {
  const identityRegistryContract = new lib.eth.Contract(
    identityRegistry.abi,
    identityRegistry.address,
  );

  return identityRegistryContract.methods.getEIN(address).call()
    .then((ein) => {
      if (ein === '3963877391197344453575983046348115674221700746820753546331534351508065746944') {
        /* TODO: Utility - Return an error if no ein is found */
        // throw new Error('No ein');
        return '';
      }

      return ein;
    })
    .catch(err => err);
}

function getIdentity(lib, account) {
  const identityRegistryContract = new lib.eth.Contract(
    identityRegistry.abi,
    identityRegistry.address,
  );

  return getAccountEin(lib, account)
    .then(ein => identityRegistryContract.methods.getIdentity(ein).call())
    .catch(err => err);
}

function getAccountDetails(lib, ein) {
  const clientRaindropContract = new lib.eth.Contract(
    clientRaindrop.abi,
    clientRaindrop.address,
  );

  return clientRaindropContract.methods.getDetails(ein).call()
    .then(details => details)
    .catch(err => err);
}

function isHydroIdAvailable(lib, hydroId) {
  const clientRaindropContract = new lib.eth.Contract(
    clientRaindrop.abi,
    clientRaindrop.address,
  );

  return clientRaindropContract.methods.hydroIDAvailable(hydroId).call()
    .then(result => result)
    .catch(err => err);
}

function isHydroIdReserved(lib, hydroId) {
  const oldClientRaindropContract = new lib.eth.Contract(
    oldClientRaindrop.abi,
    oldClientRaindrop.address,
  );

  /* TODO: Utilities - This function must use getUserByName instead of hydroIDAvailable */
  return oldClientRaindropContract.methods.hydroIDAvailable(hydroId).call()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

function createSignedMessage(lib, address, timestamp) {
  const signature = lib.utils.soliditySha3(
    '0x19', '0x00', identityRegistry.address,
    'I authorize the creation of an Identity on my behalf.',
    address,
    address, {
      t: 'address[]',
      v: [snowflake.address],
    }, {
      t: 'address[]',
      v: [],
    },
    timestamp,
  );

  return signature;
}

function createSignedMessageToLinkAddress(lib, account, newAddress, timestamp) {
  return getAccountEin(lib, account)
    .then((ein) => {
      const signature = lib.utils.soliditySha3(
        '0x19', '0x00', identityRegistry.address,
        'I authorize adding this address to my Identity.',
        ein,
        newAddress,
        timestamp,
      );

      return signature;
    })
    .catch(err => err);
}

function signPersonal(lib, address, message) {
  return new Promise((resolve, reject) => {
    lib.currentProvider.sendAsync({
      method: 'personal_sign',
      params: [
        address,
        message,
      ],
      address,
    },
    (err, result) => {
      if (result.err) {
        return reject(err);
      }

      const signature = result.result.substring(2);
      const r = "0x" + signature.substring(0, 64);
      const s = "0x" + signature.substring(64, 128);
      const v = parseInt(signature.substring(128, 130), 16);

      const signatureObject = {};

      signatureObject.r = r;
      signatureObject.s = s;
      signatureObject.v = v;
      signatureObject.from = address;

      return resolve(signatureObject);
    });
  });
}

function createIdentity(lib, hydroId, timestamp, signature) {
  const snowflakeContract = new lib.eth.Contract(
    snowflake.abi,
    snowflake.address,
  );

  return snowflakeContract.methods.createIdentityDelegated(
    signature.from, signature.from, [], hydroId, signature.v, signature.r, signature.s, timestamp,
  ).send({
    from: signature.from,
  });
}

function getHydroTestTokens(lib, account) {
  const hydroContract = new lib.eth.Contract(
    hydro.abi,
    hydro.address,
  );

  return hydroContract.methods.getMoreTokens().send({
    from: account,
  });
}

async function getHydroBalance(lib, account) {
  const hydroContract = new lib.eth.Contract(
    hydro.abi,
    hydro.address,
  );

  const balance = await hydroContract.methods.balanceOf(account).call();

  return lib.utils.toBN(balance);
}

function getSnowflakeBalance(lib, account) {
  const snowflakeContract = new lib.eth.Contract(
    snowflake.abi,
    snowflake.address,
  );

  return getAccountEin(lib, account)
    .then(ein => snowflakeContract.methods.deposits(ein).call())
    .then(balance => lib.utils.toBN(balance))
    .catch(err => err);
}

function withdrawSnowflakeBalance(lib, account, amount) {
  const snowflakeContract = new lib.eth.Contract(
    snowflake.abi,
    snowflake.address,
  );

  return snowflakeContract.methods.withdrawSnowflakeBalance(
    account,
    amount,
  ).send({
    from: account,
  });
}

function depositTokens(lib, account, amount) {
  const hydroContract = new lib.eth.Contract(
    hydro.abi,
    hydro.address,
  );

  return hydroContract.methods.approveAndCall(
    snowflake.address,
    amount,
    '0x00',
  ).send({
    from: account,
  });
}

function addResolver(lib, account, resolver, amount) {
  const snowflakeContract = new lib.eth.Contract(
    snowflake.abi,
    snowflake.address,
  );

  return snowflakeContract.methods.addResolver(
    resolver,
    true,
    lib.utils.toWei(amount),
    lib.eth.abi.encodeParameters(['string', 'string'], ['', '']),
  ).send({
    from: account,
  });
}

function removeResolver(lib, account, resolver) {
  const snowflakeContract = new lib.eth.Contract(
    snowflake.abi,
    snowflake.address,
  );

  return snowflakeContract.methods.removeResolver(
    resolver,
    true,
    '0x00',
  ).send({
    from: account,
  });
}

function getPastDeposits(lib, account) {
  const snowflakeContract = new lib.eth.Contract(
    snowflake.abi,
    snowflake.address,
  );

  lib.currentProvider.setMaxListeners(350);

  const deposits = [];

  return getAccountEin(lib, account)
    .then(ein => snowflakeContract.getPastEvents(
      'SnowflakeDeposit', {
        filter: {
        // from: account,
          einTo: ein,
        },
        fromBlock: 0,
        toBlock: 'latest',
      },
    ))
    .then((events) => {
      for (let i = 0; i < events.length; i += 1) {
        const deposit = {
          amount: events[i].returnValues.amount,
          blocknumber: events[i].blockNumber,
          txHash: events[i].transactionHash,
          event: 'deposit',
        };

        deposits.push(deposit);
      }

      return deposits;
    })
    .catch(err => err);
}

function getPastWithdrawals(lib, account) {
  const snowflakeContract = new lib.eth.Contract(
    snowflake.abi,
    snowflake.address,
  );

  lib.currentProvider.setMaxListeners(350);

  const withdrawals = [];

  return getAccountEin(lib, account)
    .then(ein => snowflakeContract.getPastEvents(
      'SnowflakeWithdraw', {
        filter: {
          einFrom: ein,
        },
        fromBlock: 0,
        toBlock: 'latest',
      },
    ))
    .then((events) => {
      for (let i = 0; i < events.length; i += 1) {
        const withdrawal = {
          amount: events[i].returnValues.amount,
          blocknumber: events[i].blockNumber,
          txHash: events[i].transactionHash,
          event: 'withdrawal',
        };

        withdrawals.push(withdrawal);
      }

      return withdrawals;
    })
    .catch(err => err);
}

function getPastPurchasedDapps(lib, account) {
  const snowflakeContract = new lib.eth.Contract(
    snowflake.abi,
    snowflake.address,
  );

  const purchases = [];

  lib.currentProvider.setMaxListeners(350);

  return getAccountEin(lib, account)
    .then(ein => snowflakeContract.getPastEvents(
      'SnowflakeResolverAdded', {
        filter: {
          ein,
        },
        fromBlock: 0,
        toBlock: 'latest',
      },
    ))
    .then((events) => {
      for (let i = 0; i < events.length; i += 1) {
        const deposit = {
          resolver: events[i].returnValues.resolver,
          amount: events[i].returnValues.withdrawAllowance,
          blocknumber: events[i].blockNumber,
          txHash: events[i].transactionHash,
          event: 'purchase',
        };

        if (events[i].returnValues.resolver !== '0x387Ce3020e13B0a334Bb3EB25DdCb73c133f1D7A') {
          purchases.push(deposit);
        }
      }

      return purchases;
    })
    .catch(err => err);
}

function getBlockTimestamp(lib, blocknumber) {
  return lib.eth.getBlock(blocknumber)
    .then(res => res.timestamp)
    .catch(err => err);
}

function isResolverFor(lib, account, resolver) {
  const identityRegistryContract = new lib.eth.Contract(
    identityRegistry.abi,
    identityRegistry.address,
  );

  return getAccountEin(lib, account)
    .then(ein => identityRegistryContract.methods.isResolverFor(
      ein,
      resolver,
    ).call())
    .catch(err => err);
}

function removeLinkedAddress(lib, account) {
  const identityRegistryContract = new lib.eth.Contract(
    identityRegistry.abi,
    identityRegistry.address,
  );

  return identityRegistryContract.methods.removeAssociatedAddress().send({
    from: account,
  });
}

function addLinkedAddress(lib, account, newAddress, signature, timestamp) {
  const identityRegistryContract = new lib.eth.Contract(
    identityRegistry.abi,
    identityRegistry.address,
  );

  return identityRegistryContract.methods.addAssociatedAddress(
    account,
    newAddress,
    signature.v,
    signature.r,
    signature.s,
    timestamp,
  ).send({
    from: account,
  });
}

function getStatus(lib, account) {
  const statusContract = new lib.eth.Contract(
    statusAbi,
    '0x16fD6e2E1C4afB9C4e7B901141706596317e4ceB',
  );

  return getAccountEin(lib, account)
    .then(ein => statusContract.methods.getStatus(ein).call())
    .catch(err => err);
}

export {
  getAccountEthBalance,
  getAccountHydroBalance,
  getAccountEin,
  getAccountDetails,
  isHydroIdAvailable,
  isHydroIdReserved,
  createSignedMessage,
  signPersonal,
  createIdentity,
  getHydroTestTokens,
  getHydroBalance,
  getSnowflakeBalance,
  withdrawSnowflakeBalance,
  depositTokens,
  getIdentity,
  addResolver,
  removeResolver,
  getPastDeposits,
  getBlockTimestamp,
  getPastPurchasedDapps,
  getPastWithdrawals,
  isResolverFor,
  removeLinkedAddress,
  createSignedMessageToLinkAddress,
  addLinkedAddress,
  getStatus,
  subscribeToDeposits,
};
