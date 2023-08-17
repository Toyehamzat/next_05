import GetWikiResult from "@/lib/getWikiResult";
import { Suspense } from "react";
type Props = {
  params: {
    searchTerm: string;
  };
};

export async function generateMetadata({ params: { searchTerm } }: Props) {
  const Wikidata: Promise<SearchResult> = GetWikiResult(searchTerm);
  const data = await Wikidata;
  const displayterms = searchTerm.replaceAll("20%", "");

  if (!data?.query?.pages) {
    return {
      title: `${displayterms} NOT FOUND`.toUpperCase(),
    };
  }
  return {
    title: displayterms.toUpperCase(),
  };
}

export default async function page({ params: { searchTerm } }: Props) {
  const Wikidata: Promise<SearchResult> = GetWikiResult(searchTerm);
  const data = await Wikidata;
  const results: Result[] | undefined = data?.query?.pages;
  return (
    <main className=" max-w-lg py-1 text-white min-h-screen">
      <Suspense
        fallback={
          <h2 className="max-w-lg py-1 text-white min-h-screen">loading....</h2>
        }
      >
        {results ? (
          Object.values(results).map((result) => {
            return <p>{JSON.stringify(result).toLocaleLowerCase()}</p>;
          })
        ) : (
          <h1 className=" max-w-lg py-1 text-white min-h-screen">
            {`${searchTerm} Not found`.toLocaleUpperCase()}
          </h1>
        )}
      </Suspense>
    </main>
  );
}
