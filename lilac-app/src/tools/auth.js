import { apolloClient } from './apollo-client';
import { gql } from '@apollo/client'

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`

export const generateChallenge = (address) => {
   return apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
         address,
      },
    },
  })
}

export const authenticate = (address, signature) => {
    return apolloClient.mutate({
     mutation: gql(AUTHENTICATION),
     variables: {
       request: {
         address,
         signature,
       },
     },
   })
 }