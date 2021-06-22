const dateIndex = 1;
const commissionIndex = 3;
const statusIndex = 4;
const nonDecliendStatuses = ['Approved', 'Pending'];
let total = 0;
let previousMonth = '2021-1';
let logs = {};

const rows = document.querySelectorAll('tr');
rows.forEach((row, index) => {
	// Skip the first line of headers
	if (index > 0) {
		const values = row.querySelectorAll('td');
		const statusText = values[statusIndex].textContent;
		const dateString = new Date(values[dateIndex].textContent);
		const month = dateString.getFullYear() + '-' + (dateString.getMonth() + 1);

		// Get number value from string with thousand operators and $
		const value = parseFloat(
			values[commissionIndex].textContent
				.split('$')[1]
				.replace(/[^\d\-.,]/g, '')
				.replace(/,/g, '.')
				.replace(/\.(?=.*\.)/g, '')
		);

		if (previousMonth !== month) {
			logs[previousMonth] = total;
			previousMonth = month;
			total = 0;
		}
		if (nonDecliendStatuses.includes(statusText)) {
			total += value;
		}
		if (index + 1 === rows.length) {
			logs[month] = total;
		}
	}
});

console.log(logs);
