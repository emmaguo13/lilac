import { apolloClient } from './apollo-client';
// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { gql } from '@apollo/client'

const HAS_TX_BEEN_INDEXED = `
  query($request: HasTxHashBeenIndexedRequest!) {
    hasTxHashBeenIndexed(request: $request) { 
             ... on TransactionIndexedResult {
        indexed
                txReceipt {
          to
          from
          contractAddress
          transactionIndex
          root
          gasUsed
          logsBloom
          blockHash
          transactionHash
          blockNumber
          confirmations
          cumulativeGasUsed
          effectiveGasPrice
          byzantium
          type
          status
          logs {
            blockNumber
            blockHash
            transactionIndex
            removed
            address
            data
            topics
            transactionHash
            logIndex
          }
        }
        metadataStatus {
          status
          reason
        }
        }
        ... on TransactionError {
        reason
                txReceipt {
          to
          from
          contractAddress
          transactionIndex
          root
          gasUsed
          logsBloom
          blockHash
          transactionHash
          blockNumber
          confirmations
          cumulativeGasUsed
          effectiveGasPrice
          byzantium
          type
          status
          logs {
            blockNumber
            blockHash
            transactionIndex
            removed
            address
            data
            topics
            transactionHash
            logIndex
          }
        }
        }
            __typename
        }
  }
`

export const hasTxBeenIndexed = (txHash) => {
   return apolloClient.query({
    query: gql(HAS_TX_BEEN_INDEXED),
    variables: {
      request: {
         txHash,
      },
    },
    fetchPolicy: 'network-only',
  })
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const pollUntilIndexed = async (txHash) => {
  while (true) {
    const result = await hasTxBeenIndexed(txHash);
    const response = result.data.hasTxHashBeenIndexed;
    if (response.__typename === 'TransactionIndexedResult') {
      if (response.metadataStatus) {
        if (response.metadataStatus.status === 'SUCCESS') {
          return response;
        }

        if (response.metadataStatus.status === 'METADATA_VALIDATION_FAILED') {
          throw new Error(response.metadataStatus.reason);
        }
      } else {
        if (response.indexed) {
          return response;
        }
      }

      // sleep for a second before trying again
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // it got reverted and failed!
    throw new Error(response.reason);
  }
};