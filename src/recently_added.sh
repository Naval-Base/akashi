#!/bin/sh

accept="Accept:application/json"
content_type="Content-Type:application/json"
url="http://$1:$2/api/plex/recently_added"
payload='{"title": "'"$3"'", "color": 3394611, "description": "'"$4"' (Episode: '"$5"') has been added to Plex!\n\nWatch here: [Plex Web]('"$7"')", "thumbnail": {"url":"'"$6"'"}}'

curl -s --max-time 10 -H $accept -H $content_type -d "$payload" $url > /dev/null
