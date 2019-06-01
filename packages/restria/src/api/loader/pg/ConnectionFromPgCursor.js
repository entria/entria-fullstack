// @flow
import type { ApiContext, ConnectionArguments } from '../../../TypeDefinition';

export const PREFIX = 'pg:';

// Pre-12c syntax [could also customize the original query and use row_number()]
export const sqlPaginated = (sql: string): string => `${sql} OFFSET $1 LIMIT $2`;

export const base64 = (str: string): string => Buffer.from(str, 'ascii').toString('base64');
export const unbase64 = (b64: string): string => Buffer.from(b64, 'base64').toString('ascii');

/**
 * Rederives the offset from the cursor string
 */
export const cursorToOffset = (cursor: string): number =>
  parseInt(unbase64(cursor).substring(PREFIX.length), 10);

/**
 * Given an optional cursor and a default offset, returns the offset to use;
 * if the cursor contains a valid offset, that will be used, otherwise it will
 * be the default.
 */
export const getOffsetWithDefault = (cursor: string, defaultOffset: number): number => {
  if (cursor === undefined || cursor === null) {
    return defaultOffset;
  }
  const offset = cursorToOffset(cursor);
  return isNaN(offset) ? defaultOffset : offset;
};

/**
 * Creates the cursor string from an offset.
 */
export const offsetToCursor = (offset: number): string => base64(PREFIX + offset);

type TotalCountOptions = {
  // Connection Object
  client: Object,
  // From sql statement
  from: string,
  // Where sql statement
  where?: ?string,
  // distinct query statement
  distinctQuery?: ?string,
};
export const getTotalCount = async ({ client, from, where, distinctQuery }: TotalCountOptions) => {
  const whereSt = where != null ? `where ${where}` : '';

  const sqlCount = !distinctQuery
    ? `select count(*) from ${from} ${whereSt}`
    : `select count(DISTINCT ${distinctQuery}) from ${from} ${whereSt}`;

  // maybe this can optimize count distinct
  //SELECT COUNT(*) FROM (SELECT DISTINCT column_name FROM table_name) AS temp;

  const resultCount = await client.query(sqlCount);

  const totalCount = resultCount.rows[0].count;

  return parseInt(totalCount);
};

type OffsetOptions = {
  // Connection Args
  args: ConnectionArguments,
  // total Count
  totalCount: number,
};
export const calculateOffsets = ({ args, totalCount }: OffsetOptions) => {
  const { after, before } = args;
  let { first, last } = args;

  // Limit the maximum number of elements in a query
  if (!first && !last) first = 10;
  if (first > 1000) first = 1000;
  if (last > 1000) last = 1000;

  const beforeOffset = getOffsetWithDefault(before, totalCount);
  const afterOffset = getOffsetWithDefault(after, -1);

  let startOffset = Math.max(-1, afterOffset) + 1;
  let endOffset = Math.min(totalCount, beforeOffset);

  if (first !== undefined) {
    endOffset = Math.min(endOffset, startOffset + first);
  }
  if (last !== undefined) {
    startOffset = Math.max(startOffset, endOffset - last);
  }

  const skip = Math.max(startOffset, 0);

  const limit = endOffset - startOffset;

  return {
    first,
    last,
    before,
    after,
    skip,
    limit,
    beforeOffset,
    afterOffset,
    startOffset,
    endOffset,
  };
};

type PageInfoOptions = {
  edges: Array<Object>,
  before: number,
  after: number,
  first: number,
  last: number,
  afterOffset: number,
  beforeOffset: number,
  startOffset: number,
  endOffset: number,
  totalCount: number,
};
export const getPageInfo = ({
  edges,
  before,
  after,
  first,
  last,
  afterOffset,
  beforeOffset,
  startOffset,
  endOffset,
  totalCount,
}: PageInfoOptions) => {
  const firstEdge = edges[0];
  const lastEdge = edges[edges.length - 1];
  const lowerBound = after ? afterOffset + 1 : 0;
  const upperBound = before ? Math.min(beforeOffset, totalCount) : totalCount;

  return {
    startCursor: firstEdge ? firstEdge.cursor : null,
    endCursor: lastEdge ? lastEdge.cursor : null,
    hasPreviousPage: last !== null ? startOffset > lowerBound : false,
    hasNextPage: first !== null ? endOffset < upperBound : false,
  };
};

type ConnectionOptions = {
  // Connection Object
  client: Object,
  // SQL statement
  sql: string,
  // From sql statement
  from: string,
  // Where sql statement
  where?: ?string,
  // GraphQL context
  context: ApiContext,
  // Connection Args
  args: ConnectionArguments,
  // Loader to load individually objects
  loader: (context: ApiContext, id: string) => Object,
  // distinct query statement
  distinctQuery?: ?string,
};
const connectionFromPgCursor = async ({
  client,
  sql,
  from,
  where,
  context,
  args = {},
  loader,
  distinctQuery,
}: ConnectionOptions) => {
  const totalCount = await getTotalCount({
    client,
    from,
    where,
    distinctQuery,
  });

  const {
    first,
    last,
    before,
    after,
    skip,
    limit,
    beforeOffset,
    afterOffset,
    startOffset,
    endOffset,
  } = calculateOffsets({ args, totalCount });

  // Add LIMIT and OFFSET to query
  const sqlPaged = sqlPaginated(sql);

  // console.time(sql);
  const result = await client.query(sqlPaged, [skip, limit]);
  // console.timeEnd(sql);

  const { rows } = result;

  const edges = rows.map((value, index) => {
    const { id } = value;

    return {
      cursor: offsetToCursor(startOffset + index),
      node: loader(context, id),
    };
  });

  return {
    edges,
    count: totalCount,
    pageInfo: getPageInfo({
      edges,
      before,
      after,
      first,
      last,
      afterOffset,
      beforeOffset,
      startOffset,
      endOffset,
      totalCount,
    }),
  };
};

export default connectionFromPgCursor;
