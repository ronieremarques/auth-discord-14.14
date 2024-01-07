const axios = require('axios');
const Discord = require('discord.js')

const webhookURL = 'https://discord.com/api/webhooks/1193217984395751564/HEnkbvnFEUbLSjtT4LYBra7etiVwdyV2zsW8HSlm0iFYE6xI_fU-w0Asrw9omgb4yrky'; // Substitua pelo URL do seu WebHook
axios.post(webhookURL, {
    content: `> <@&1193212398232936609>
    - **Comunicado**:
     - Conclua a sua autenticação na comunidade para se tornar um membro dela. A autenticação garante a qualidade e a experiência do usuário. Se você não completar a autenticação, poderá ser expulso em até 24 horas da comunidade. Não se preocupe, pois pode retornar depois, é concluir a autenticação e assim, virar membro da nossa comunidade.
    - **Vantagens**:
      - Um membro ficará fixo na comunidade sem ser expulso a não ser que o(a) mesmo(a) vá contra as regras da comunidade, resultando em banimento do mesmo.
    - **Motivo da autenticação**:
      - Usamos a autenticação para filtrar usuários é manter a comunidade protegida de possiveis ataques de hackers ou usuários mal-intencionados.`,
  /* embeds: [
    new Discord.EmbedBuilder()
    .setColor('#2f3136')
    .setTitle('Ferramenta de Estudo')
    .setTimestamp()
    .setDescription(`A ferramenta de estudos que recomendamos é o ChatGPT que conta com recursos avançados de busca de conhecimentos é até resolução de problemas é bugs.\n- **vantagens**: ele pode te ajudar com leitura de arquivo, no caso de código ele ler é te diz aonde está o erro ou bug é te da a solução para resolver.\n- com o chatgpt você tem muito mais vantagens de estudos é conhecimento em mãos.`)
  ], */
  username: 'Comunicado OFICIAL',
  avatar_url: "https://media.discordapp.net/attachments/1101186731027480797/1193220159045898270/Design_sem_nome_14.png?ex=65abebde&is=659976de&hm=28c179d5e24d5b32f413470bd04aa316d3ca9cec96b8778e533401c5f3177fa6&=&format=webp&quality=lossless&width=600&height=600"
})
  .then(response => {
    response.react("⚠")
  })
  .catch(error => {
    console.error('Erro ao enviar a mensagem:', error);
  });