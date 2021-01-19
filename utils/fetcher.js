import { queryRepeatableDocuments } from "./queries";
import { mutate } from "swr";

export async function fetcher(input) {
	const { docType, locale, filters } = JSON.parse(input);
	const documents = await queryRepeatableDocuments(
		(doc) =>
			doc.type === docType &&
			doc.lang.slice(0, 2) === locale.slice(0, 2) &&
			(!filters ||
				!doc.data.type ||
				(filters.type &&
					filters.type.toLowerCase() === doc.data.type.toLowerCase()))
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

export function fetchAndCache(key, fetcher) {
	const request = fetcher(key);
	mutate(key, request, false);
	return request;
}

export function getProjects(locale) {
	return fetchAndCache(`project/${locale}`, fetcher);
}
