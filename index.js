const puppeteer = require("puppeteer-core");

const targetUrl =
	"https://94c1351bfa-wegroup-nv.campaigns.staging.louiseforbrokers.be/";

function success(body) {
	return buildResponse(200, body);
}

function failure(body) {
	return buildResponse(400, body);
}

function buildResponse(statusCode, body) {
	return {
		statusCode: statusCode,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
			"Content-Type": "text/html",
		},
		body: body,
	};
}

(async () => {
	const browser = await puppeteer.launch({
		args: [],
		executablePath:
			"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
	});

	try {
		let page = await browser.newPage();
		await page.goto(targetUrl);
		await page.waitForSelector("meta[property='og:image']");
		// await page.waitfor(/.*v1\/api\/broker\/v1\/api\/campaigns\/.*/, {
		// 	method: "GET",
		// });
		const result = await page.content();
		console.log(result);
		browser.close();
		return success(result);
	} catch (e) {
		return failure("Could not render!");
	}
})();
