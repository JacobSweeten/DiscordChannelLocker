const fs = require("fs");
const {Client, GatewayIntentBits} = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const checkTime = require("./checkTime");

var config;

try
{
	config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
}
catch(e)
{
	console.error(e);
	console.error("Failed to open config.json");
	process.exit(1);
}

function checkChannel(serverInfo, guild, channel)
{
	try
	{
		var hours = new Date().getHours();
		var minutes = new Date().getMinutes();

		var stopTimeHours = serverInfo.insomniaStopTime.split(":")[0];
		var stopTimeMinutes = serverInfo.insomniaStopTime.split(":")[1];

		var startTimeHours = serverInfo.insomniaStartTime.split(":")[0];
		var startTimeMinutes = serverInfo.insomniaStartTime.split(":")[1];
			
		var shouldBeOpen = checkTime(hours, minutes, startTimeHours, startTimeMinutes, stopTimeHours, stopTimeMinutes);
		
		console.log("Server \"" + guild.name + "\" and channel " + channel.name + " should" + (shouldBeOpen ? "" : " not") + " be open");

		channel.permissionOverwrites.edit(guild.roles.everyone, {"SendMessages": shouldBeOpen});
	}
	catch(e)
	{
		console.error(e);
		console.error("Failed to check channel or change permissions");
	}
}

function checkServer(server)
{
	try
	{
		let serverInfo = config.servers[server];

		client.guilds.fetch(server).then((guild) => {
			try
			{
				guild.channels.fetch(serverInfo.channelID).then((channel) => {
					checkChannel(serverInfo, guild, channel);
				});
			}
			catch(e)
			{
				console.error(e);
				console.error("Failed to get channel " + serverInfo.channelID + " from server " + server);
			}
		});
	}
	catch(e)
	{
		console.error(e);
		console.error("Failed to check server " + server);
	}
}

function checkInsomnia()
{
	for(server in config.servers)
	{
		checkServer(server);
	}
}

client.on("ready", async () => {
	console.log("Connected");
	checkInsomnia();
	setInterval(checkInsomnia, 60 * 1000);
});

client.login(config.APIKey);
