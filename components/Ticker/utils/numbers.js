export function withSeparator(
	number = 0,
	decimalSeparator = ".",
	thousandsSeparator = ","
) {
	let parts = number.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
	return parts.join(decimalSeparator);
}
