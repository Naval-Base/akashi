process.env.NODE_ENV = 'test';
process.env.PORT = 9991;
const server = require('../src/index');
const fetch = require('node-fetch');

describe('validation', () => {
	it('should return a valid discord webhook', async () => {
		const body = {
			title: 'Test1',
			color: '3394611',
			description: 'Test2',
			thumbnail: { url: 'Test3' }
		};

		const res = await fetch(`http://localhost:${process.env.PORT}/api/plex/recently_added`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});
		const json = await res.json();

		expect(json).toEqual({ embeds: [body] });

		server.server.close();
	});
});
