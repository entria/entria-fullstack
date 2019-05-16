
import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { QueryRenderer, GraphQLTaggedNode } from 'react-relay';
import { Variables } from 'relay-runtime'

import Environment from './Environment';

type Config = {
  query: GraphQLTaggedNode,
  queriesParams?: (props: Object) => object,
  variables?: Variables,
  hideSplash?: boolean,
};

export default function createQueryRenderer<P>(
  FragmentComponent: any,
  Component: React.ComponentType<P>,
  config: Config,
) {
  const { query, queriesParams } = config;

  class QueryRendererWrapper extends React.Component<{}> {
    render() {
      const variables = queriesParams ? queriesParams(this.props) : config.variables;

      return (
        <QueryRenderer
          environment={Environment}
          query={query}
          variables={variables || {}}
          render={({ error, props }) => {
            if (error) {
              return <span>{error.toString()}</span>;
            }

            if (props) {
              return <FragmentComponent {...this.props} query={props} />;
            }

            return <span>loading</span>;
          }}
        />
      );
    }
  }

  return hoistStatics(QueryRendererWrapper, Component);
}
