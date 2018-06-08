require('dotenv').config();
const polka = require('polka');
const send = require('@polka/send-type');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const fetch = require('node-fetch');
const logger = require('./logger');

const server = polka()
	.use(cors({
		allowedHeaders: ['Accept', 'Content-Type'],
		optionsSuccessStatus: 200
	}))
	.use(helmet())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(compression())
	.use((req, res, next) => {
		res.send = (code, data, headers) => send(res, code, data, headers);
		next();
	})
	.get('/api', (req, res) => res.send(200, { message: 'Akashi!' }))
	.post('/api/plex/recently_added', async (req, res) => {
		const { body } = req;
		const embed = {
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
		};

		if (process.env.NODE_ENV !== 'test') {
			try {
				await fetch(process.env.DISCORD_WEBHOOK, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(embed)
				});
			} catch (error) {
				logger.error(error);
			}
		}

		return res.send(200, embed);
	});

server
	.listen(process.env.PORT)
	.then(() => logger.info(`> Running on localhost:${process.env.PORT}`));

module.exports = server;
