<?php
require_once("libraries/TeamSpeak3/TeamSpeak3.php");

function secondsToTime($seconds) {
    $dtF = new \DateTime('@0');
    $dtT = new \DateTime("@$seconds");
    return $dtF->diff($dtT)->format('%a days, %h hours, %i minutes and %s seconds');
}

$ts3 = TeamSpeak3::factory("serverquery://kremowka.xyz:10011/?server_port=9987");
$ts3Info = $ts3->getInfo();

$result = json_encode([
    "name" => $ts3Info["virtualserver_name"]->toString(),
    "platform" => $ts3Info["virtualserver_platform"]->toString(),
    "version" => $ts3Info["virtualserver_version"]->toString(),
    "maxclients" => $ts3Info["virtualserver_maxclients"],
    "clientsonline" => $ts3Info["virtualserver_clientsonline"],
    "channelsonline" => $ts3Info["virtualserver_channelsonline"],
    "uptime" => secondsToTime($ts3Info["virtualserver_uptime"])
]);

file_put_contents('../teamspeak.json', $result);
