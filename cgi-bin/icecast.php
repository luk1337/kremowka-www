<?php
$result = file_get_contents("https://radio.kremowka.xyz/status-json.xsl");

file_put_contents(dirname(__FILE__) . '/../icecast.json', $result);
