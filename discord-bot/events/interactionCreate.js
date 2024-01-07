const discord = require("discord.js");
const client = require("../index.js")
const venom = require('venom-bot');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
var conexao;
process.on('uncaughtException', (err, origin) => { console.log(err, origin) })
venom.create({
  session: 'session-name', puppeteerOptions: {
    args: ['--no-sandbox']
  }
}).then((client) => {
  conexao = client
})

// Função para gerar código de 4 dígitos único
function generateUniqueCode() {
    const characters = '0123456789';
    const codeLength = 4;
    let uniqueCode;

    do {
        // Gera um código aleatório de 4 dígitos
        uniqueCode = '';
        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            uniqueCode += characters[randomIndex];
        }
    } while (codeAlreadyUsed(uniqueCode));

    // Registra o código gerado para evitar repetição
    usedCodes.push(uniqueCode);

    return uniqueCode;
}

// Array para armazenar códigos utilizados
const usedCodes = [];

// Função para verificar se o código já foi utilizado
function codeAlreadyUsed(code) {
    return usedCodes.includes(code);
}

function addNewUserToJSON(username, userId, code) {
    // Carrega o conteúdo do arquivo JSON existente
    const filePath = path.resolve(__dirname, '../../usuarios.json');
    const usuariosJSON = require(filePath);

    // Adiciona o novo usuário ao objeto JSON
    usuariosJSON.usuarios[username] = {
        id_usuario: userId,
        name: username,
        code: code
    };

    // Converte o objeto JSON atualizado de volta para string
    const updatedJSONString = JSON.stringify(usuariosJSON, null, 2);

    // Escreve o conteúdo de volta ao arquivo JSON
    fs.writeFileSync(filePath, updatedJSONString);
}

async function checkResponseForCode(modalresponse, message, userCode, name, number, success, conexao) {

    // Carrega o conteúdo do arquivo JSON
    const filePath = path.resolve(__dirname, '../../usuarios.json');
    const usuariosJSON = require(filePath);

    // Verifica se o usuário está no JSON e se o código corresponde
    if (usuariosJSON.usuarios[name].code === userCode) {
        // Usuário aprovado

        // Adicione aqui qualquer lógica adicional para tratar a aprovação do usuário
        // Por exemplo, você pode adicionar o usuário a um papel específico no Discord.
        await conexao.startTyping(message.from)
        await conexao.reply(
            `${number}@c.us`,
            '✅ Você foi verificado na nossa comunidade é recebeu o cargo de membro oficial.',
            `${success.to._serialized}`
          )
        // Exiba uma mensagem para o usuário aprovado no Discord
        modalresponse.editReply({ content: `✅ Você foi aprovado! Bem-vindo à nossa comunidade.`, ephemeral: true});
    } else {
        // Usuário recusado
        await conexao.startTyping(message.from)
        await conexao.reply(
            message.from,
            '❌ O código digitado está incorrete, tente novamente.',
            `${success.to._serialized}`
          )
          console.log(message.from)
          await conexao.sendVoice(
            message.from,
            './mp3/errocode.mp3'
            )
        // Exiba uma mensagem para o usuário recusado no Discord
        modalresponse.editReply({ content: `❌ Desculpe, você não foi aprovado. Verifique se digitou o código corretamente ou entre em contato conosco para obter assistência.\nhttps://youtu.be/2GKsYa71enM`, ephemeral: true });
    }
}

client.on("interactionCreate", async (interaction) => {
    if (interaction.customId === "autentics") {
        interaction.reply({
            embeds: [
                new discord.EmbedBuilder()
                .setDescription(`Precisamos que clique no botão de verificação, solicitado número de whatsapp, você deve preencher com o número de whatsapp correto, assim que preenchido vamos te pedir o código enviado para seu whatsapp que colocou, o número de telefone precisa ter código postal por exemplo se for do brasil é 55 mais o restante do número.\n**Forma correta**: 5500000000000\n**Forma errada**: +55 (00) 00000-0000`)
                .setTitle("Autenticação")
                .setColor("Green")
                .setTimestamp()
            ],
            components: [
                new discord.ActionRowBuilder().addComponents(
                    new discord.ButtonBuilder()
                        .setStyle(discord.ButtonStyle.Success)
                        .setLabel('WhatsApp')
                        .setCustomId("whatsapp_code")
                        .setEmoji("<:whatsapp:1193521703075188806>"),
                        new discord.ButtonBuilder()
                        .setStyle(discord.ButtonStyle.Danger)
                        .setLabel('Vídeo de ajuda')
                        .setCustomId("video")
                )
            ],
            ephemeral: true
        })
    } else if (interaction.customId === "whatsapp_code") {
        const modal = new discord.ModalBuilder()
            .setCustomId('numberwhatsapp')
            .setTitle('Número do WhatsApp');

        const phonenumber = new discord.TextInputBuilder()
            .setCustomId('phonenumb')
            // The label is the prompt the user sees for this input
            .setLabel("Preencha com seu número:")
            // Short means only a single line of text
            .setStyle(discord.TextInputStyle.Short);
            
        const firstActionRow = new discord.ActionRowBuilder().addComponents(phonenumber);

        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);

        const modalresponse = await interaction.awaitModalSubmit({
            filter: (i) => i.user.id === interaction.user.id,
            time: 691200_000,
        });

        const number = await modalresponse.fields.getTextInputValue(
            `phonenumb`
          );

        // Exemplo de uso
        const uniqueCode = generateUniqueCode();
        puppeteer.launch({ args: ['--no-sandbox'] });
        await conexao.startTyping(`${number}@c.us`)
        await conexao.sendText(`${number}@c.us`, `👋 Olá ${interaction.user.username}, o número *${number}* de whatsapp solicitou um código para participar da nossa comunidade, se isso não foi você responda *RECUSAR* se foi você que solicitou o código para entrar na nossa comunidade responda a essa mensagem com apenas o código de acesso. *Apenas o código sem nenhum texto.\nVocê será aprovado(a) automáticamente é entrará na nossa comunidade se tornando membro da mesma.\n\nQuem solicitou foi:\n*id*: ${interaction.user.id}\n*name*: ${interaction.user.username}\n\nSolicitou para entrar em:\n*id*: ${interaction.guildId}\n*name*: ${interaction.guild.name}\n\nDados para ser aprovado:\n*Código*: ${uniqueCode}\nCargo: \`@Membros\`\n\n*Link da comunidade*: https://discord.gg/cHm5bGBQy6\n*Blog*: https://www.empreendedo.com`)
            .catch((error) => {
                console.error('Erro ao enviar mensagem:', error);
                if (error.text === "The number does not exist") {
                    modalresponse.reply({ content: `❌ O número que você digitou não existe ou foi digitado sem o código postal.`, ephemeral: true })
                } else if (error.text === "incorrect parameters! Use as an example: 000000000000@c.us") {
                    modalresponse.reply({ content: `❌ Você preencheu da maneira errada! Use como exemplo essa maneira: 550000000000\nCaso precise de ajuda assista o vídeo para saber como passar pela autenticação.`, ephemeral: true })
                }
            })
            .then(async success => {
                addNewUserToJSON(interaction.user.username, interaction.user.id, uniqueCode);
                modalresponse.reply({ content: `<a:carregando:1193548467616874616> O código foi enviado para seu WhatsApp, você precisa responder a mensagem lá no seu WhatsApp com o código digitado na resposta.`, ephemeral: true })
                const response = await conexao.onMessage(async (message) => {
                    // Verifica se a mensagem é do usuário que solicitou o código
                    if (message.from.includes(number)) {
                        // Verifica se a mensagem contém apenas o código
                        if (/^\d{4}$/.test(message.body)) {
                            // Verifica se o código corresponde
                            const userCode = message.body;
                            let name = interaction.user.username
                            checkResponseForCode(modalresponse, message, userCode, name, number, success, conexao);
                        }
                    }
                });
            })
            
    }
    if (interaction.customId === "video") {

        // Cria uma instância do objeto MessageAttachment
        interaction.reply({ content: `[Assistir vídeo no YouTube](https://youtu.be/2GKsYa71enM)`, ephemeral: true })
    }
});