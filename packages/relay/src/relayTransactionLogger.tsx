import { LogEvent } from 'relay-runtime';
// export type LogEvent =
//   | {
//       name: 'queryresource.fetch',
//       operation: OperationDescriptor,
//       // FetchPolicy from relay-experimental
//       fetchPolicy: string,
//       // RenderPolicy from relay-experimental
//       renderPolicy: string,
//       hasFullQuery: boolean,
//       shouldFetch: boolean,
//     }
//   | {
//       name: 'execute.info',
//       transactionID: number,
//       info: mixed,
//     }
//   | {
//       name: 'execute.start',
//       transactionID: number,
//       params: RequestParameters,
//       variables: Variables,
//     }
//   | {
//       name: 'execute.next',
//       transactionID: number,
//       response: GraphQLResponse,
//     }
//   | {
//       name: 'execute.error',
//       transactionID: number,
//       error: Error,
//     }
//   | {
//       name: 'execute.complete',
//       transactionID: number,
//     }
//   | {
//       name: 'execute.unsubscribe',
//       transactionID: number,
//     };

// TODO - improve this
export const relayTransactionLogger = (event: LogEvent) => {
  // eslint-disable-next-line
  console.log('RELAY: ', event);
  return;

  // if (event.name === 'execute.start') {
  //   const { transactionID, params, variables } = event;
  //
  //   const error = false;
  //
  //   console.groupCollapsed &&
  //     console.groupCollapsed(`%c${transactionID}`, error ? 'color:red' : '');
  //
  //   const log = {params, variables};
  //   Object.keys(log).map(key => {
  //     console.log(`${key}:`, log[key]);
  //   });
  // }
  //
  // if (event.name === 'execute.error') {
  //
  // }
  //
  // if (event.name === 'execute.next') {
  //   const { response } = event;
  //
  //   console.log(`response:`, response);
  // }
};
