function loadTS3Status() {
    $.getJSON("./teamspeak.json", function(data) {
        $("#teamspeak [data-id=name] :nth-child(2)").html(data.name);
        $("#teamspeak [data-id=platform] :nth-child(2)").html(data.platform);
        $("#teamspeak [data-id=version] :nth-child(2)").html(data.version);
        $("#teamspeak [data-id=clients] :nth-child(2)").html(data.clientsonline + "/" + data.maxclients);
        $("#teamspeak [data-id=channels] :nth-child(2)").html(data.channelsonline);
        $("#teamspeak [data-id=uptime] :nth-child(2)").html(data.uptime);
        $("#teamspeak [data-id=loading]").remove();
        $("#teamspeak").slideDown();
    });

    setTimeout(loadTS3Status, 60000);
}

function loadIcecastStatus() {
    $.getJSON("./icecast.json", function(data) {
        if (data.icestats.source) {
            $("#icecast [data-id=genre] :nth-child(2)").html(data.icestats.source.genre);
            $("#icecast [data-id=listeners] :nth-child(2)").html(data.icestats.source.listeners);
            $("#icecast [data-id=listener_peak] :nth-child(2)").html(data.icestats.source.listener_peak);
            $("#icecast [data-id=stream_start] :nth-child(2)").html(data.icestats.source.stream_start);
            $("#icecast [data-id=title] :nth-child(2)").html(data.icestats.source.title);

            $("#icecast [data-id=offline]").slideUp();
            $("#icecast [data-id=online]").slideDown();
        } else {
            $("#icecast [data-id=offline]").slideDown();
            $("#icecast [data-id=online]").slideUp();
        }
    });

    setTimeout(loadIcecastStatus, 60000);
}

$(document).ready(function() {
    loadTS3Status();
    loadIcecastStatus();

    $("nav a").click(function() {
        if ($(this).attr('data-id')) {
            $("nav a").parent().attr('class', '');
            $(this).parent().attr('class', 'active');

            $("section").hide();
            $("section[data-id=" + $(this).attr('data-id') + "]").show();
        }
    });
});