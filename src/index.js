require('dotenv').config();
const polka = require('polka');
const send = require('@polka/send-type');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const { Rest } = require('@spectacles/rest');
const logger = require('./logger');
const fetch = new Rest('', { tokenType: '' });

const server = polka()
	.use(cors({
		allowedHeaders: ['Accept', 'Content-Type'],
		optionsSuccessStatus: 200
	}))
	.use(helmet())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(compression())
	.use((_, res, next) => {
		res.send = (code, data, headers) => send(res, code, data, headers);
		next();
	})
	.get('/api', (_, res) => res.send(200, { message: 'Akashi!' }))
	.post('/api/plex/recently_added', async (req, res) => {
		const embed = { embeds: [req.body] };
		logger.info(`Received request for ${req.body.title}`);

		if (process.env.NODE_ENV !== 'test') {
			try {
				await fetch.post(process.env.DISCORD_WEBHOOK, embed);
			} catch (error) {
				logger.error(error);
			}
		}

		logger.info(`Sent notification for ${req.body.title}`);
		return res.send(200, embed);
	});

server.listen(process.env.PORT, () => logger.info(`> Running on localhost:${process.env.PORT}`));

module.exports = server;
