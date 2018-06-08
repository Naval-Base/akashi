process.env.NODE_ENV = 'test';
process.env.PORT = 9901;
const server = require('../src/index');
const fetch = require('node-fetch');

describe('validation', () => {
	it('should return a valid discord webhook', async () => {
		const body = {
			showname: 'Test1',
			episode_name: 'Test2',
			episode_num: 'Test3',
			poster_url: 'Test4',
			plex_url: 'Test5'
		};

		const res = await fetch(`http://localhost:${process.env.PORT}/api/plex/recently_added`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});
		const json = await res.json();

		expect(json).toEqual({
			embeds: [
				{
					title: body.showname,
					color: 0x33cc33,
					description: `${body.episode_name} (Episode: ${body.episode_num}) has been added to Plex!\n\nWatch here: [Plex Web](${body.plex_url})`,
					thumbnail: {
						url: body.poster_url
					}
				}
			]
		});

		server.server.close();
	});
});
