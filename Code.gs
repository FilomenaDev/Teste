function doGet() {
  return ContentService
    .createTextOutput('Google Apps Script ativo. Use o site para enviar informações por e-mail.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const recipient = Session.getEffectiveUser().getEmail();
    if (!recipient) {
      throw new Error('Não foi possível identificar o e-mail da conta que executa o Apps Script.');
    }

    const details = JSON.stringify(payload, null, 2);
    MailApp.sendEmail({
      to: recipient,
      subject: `Novo acesso ao site - ${payload.timestamp || new Date().toISOString()}`,
      body: `Foi registado um novo acesso ao site.\n\n${details}`
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, recipient }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
