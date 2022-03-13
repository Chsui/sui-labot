const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('퐁으로 대답해요!'),
	async execute(interaction) {
		await interaction.reply('퐁?');
	},
};