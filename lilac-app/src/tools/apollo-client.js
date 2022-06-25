// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { getAuthenticationToken } from '../utils/state';

const httpLink = new HttpLink({ 
  uri: 'https://api-mumbai.lens.dev',
  fetch,});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  // if your using node etc you have to handle your auth different
  const token = getAuthenticationToken();
  console.log('jwt token:', token);

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      'x-access-token':token ? `Bearer ${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})