import GetWikiResult from "@/lib/getWikiResult";
import { Suspense } from "react";
import Item from "./components/item";
type Props = {
  params: {
    searchTerm: string;
  };
};

export async function generateMetadata({ params: { searchTerm } }: Props) {
  const Wikidata: Promise<SearchResult> = GetWikiResult(searchTerm);
  const data = await Wikidata;
  const displayterms = searchTerm.replaceAll("20%", " ");

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
      {results ? (
        Object.values(results).map((result) => {
          return <Item key={result.pageid} result={result} />;
        })
      ) : (
        <h1 className=" max-w-lg py-1 text-white min-h-screen">
          {`${searchTerm.replaceAll("%20", " ")} Not found`.toLocaleUpperCase()}
        </h1>
      )}
    </main>
  );
}
