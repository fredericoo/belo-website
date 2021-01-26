import { queryRepeatableDocuments } from "./queries";
import { mutate } from "swr";

export async function fetcher(input) {
	const { docType, locale, filters } = JSON.parse(input);
	const typeFilters =
		typeof filters.type === "object"
			? filters.type.map((filter) => filter.toLowerCase())
			: [filters.type.toLowerCase];

	const documents = await queryRepeatableDocuments(
		(doc) =>
			doc.type === docType &&
			doc.lang.slice(0, 2) === locale.slice(0, 2) &&
			(!filters ||
				!doc.data.type ||
				(filters.type && typeFilters.includes(doc.data.type.toLowerCase())))
	);

	return documents.map((p) => {
		return {
			...p.data,
			slug: p.uid,
			lang: p.lang,
			date: p.first_publication_date,
		};
	});
}
