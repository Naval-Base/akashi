# Akashi <img src="https://i.imgur.com/fl7Tu03.png" align="right">
> Tautulli (formerly PlexPy) script -> Discord webhook

Standard Tautulli Discord webhooks can look like this if semi-properly configured:

![](https://i.imgur.com/kekZvsM.png)

But that's pretty much where the configuration ends. Since there is no real way to further configure the output I have written `Akashi` to help me out with that.  
When running `Akashi` the output will look like this:

![](https://i.imgur.com/p8IsxUi.png)

The output generated will be a lot more controllable.

For this to properly work it executes a shell script that posts data to `Akashi` which then gets forwarded to Discord via a webhook.  
Currently it only has one endpoint which is `/api/plex/recently_added` since this is the only use-case I have for it at the moment. ~~It also forces a specific webhook output which could be refactored so that the Discord Embed gets constructed inside of the shell script instead of the API.~~

## Setup

Prerequisites:
- Node.js
- Tautulli Server
- Discord Webhook

First you need to make sure `Akashi` is running, how that is done is up to the user itself, whether it be tmux, screen, pm2 or Docker.  
The configuration for the env, port and Discord webhook is handled via environment variables, namely: `NODE_ENV=`, `PORT=`, `DISCORD_WEBHOOK=`

For a tutorial on how to setup a Discord webhook you can go here: <https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks>

After that a notification agent needs to be setup in Tautulli:

![](https://i.imgur.com/fmF0Z0F.png)

In the configuration tab, of the newly created script notification agent, the folder containing the script needs to be filled out and then selected:

![](https://i.imgur.com/G0CAmJe.png)

Afterwards in the `Triggers` tab a suitable trigger needs to be selected, in our case only `Recently Added` applies here currently.

And lastly in the `Arguments` tab the correct script arguments need to be passed down to the shell script:

![](https://i.imgur.com/cuKrPRu.png)

The order is as follows: `url port {show_name} {episode_name} {episode_num} {poster_url} {plex_url}`  
This ensures a somewhat configurable host and port setup without having to hardcode it inside of the shell script.

After all of this is done you are good to go and have updates to your recently added movies/series in Discord!

## Author

**Akashi** © [iCrawl](https://github.com/iCrawl).  
Authored and maintained by iCrawl.

> GitHub [@iCrawl](https://github.com/iCrawl)
