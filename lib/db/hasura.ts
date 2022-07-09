export async function queryHasuraGQL(
  operationsDoc: any,
  operationName: string,
  variables: any
) {
  const result = await fetch(
    'https://included-sheep-34.hasura.app/v1/graphql',
    {
      method: 'POST',
      headers: {
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    }
  );

  return await result.json();
}
