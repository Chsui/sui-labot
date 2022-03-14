const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Formatters } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('규칙위반')
		.setDescription('규칙위반 임베드를 작성할 수 있어요.')
		.addUserOption(option =>
			option.setName('대상')
				.setDescription('처벌 대상을 입력해 주세요.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('처벌')
				.setDescription('적용한 처벌을 입력해 주세요.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('사유')
			.setDescription('제재 사유를 입력해 주세요.')
			.setRequired(true)),
	async execute(interaction) {
		if(interaction.channel.id != '952404393699991562') {
			await interaction.replay({ content: '해당 명령어를 사용할 수 없는 채널입니다.', ephemeral: true });
		} else {
			const target = interaction.options.getUser('대상')
			const punish = interaction.options.getString('처벌');
			const reason = interaction.options.getString('사유');
			const warningEmbed = new MessageEmbed()
				.setAuthor({ name: `${target.tag}`, iconURL: `${target.avatarURL()}` })
				.setColor('#FF6C6C')
				.setTitle('제재 처리')
				.setDescription('규칙 위반으로 제재 처리 되었습니다.')
				.addFields(
					{ name: '제재 대상', value: Formatters.userMention(`${target.id}`)+'('+`${target.tag}`+')', inline: true },
					{ name: '적용 처벌', value: punish, inline: true },
					{ name: '제재 사유', value: reason+'\n\n`       이의 제기는 주인장에게 DM을 통해 문의 바랍니다.       `'},
				)
				.setTimestamp()
			await interaction.reply({ content: '완료 되었습니다', ephemeral: true });
			await interaction.channel.send({ content: Formatters.userMention(`${target.id}`), embeds: [warningEmbed] });
		}
	},
};