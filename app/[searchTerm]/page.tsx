import GetWikiResult from "@/lib/getWikiResult";
type Props = {
  params: {
    searchTerm: string;
  };
};

export default async function page({ params: { searchTerm } }: Props) {
  const Wikidata: Promise<SearchResult> = GetWikiResult(searchTerm);
  const data = await Wikidata;
  const results: Result[] | undefined = data?.query?.pages;
  return (
    <main className=" max-w-lg py-1  min-h-screen">
      {results ? (
        Object.values(results).map((result) => {
          return <p>{JSON.stringify(result)}</p>;
        })
      ) : (
        <h1 className=" max-w-lg py-1  min-h-screen">{`${searchTerm} Not found`}</h1>
      )}
    </main>
  );
}
