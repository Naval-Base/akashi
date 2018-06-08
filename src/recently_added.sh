#!/bin/sh

accept="Accept:application/json"
content_type="Content-Type:application/json"
payload='{"showname":"'"$3"'", "episode_name":"'"$4"'", "episode_num":"'"$5"'", "poster_url":"'"$6"'", "plex_url":"'"$7"'"}'
url="http://$1:$2/api/plex/recently_added"

curl -s --max-time 10 -H $accept -H $content_type -d "$payload" $url > /dev/null
