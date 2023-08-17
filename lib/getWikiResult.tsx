export default async function GetWikiResult(searchTerm: string) {
  const searchParams = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: searchTerm,
    gsrlimit: "20",
    format: "json",
    prop: "pageimages|extracts",
    exchars: "100",
    exintro: "true",
    explaintext: "true",
    exlimit: "max",
    origin: "*",
  });
  const res = await fetch("https://en.wikipedia.org/w/api.php?" + searchParams);
  return res.json();
}
