const FOLDER_ID = '1rHoulgb3m7yt5FqQx8AGw4tkc1IsJfIs';

function doGet() {
  return ContentService
    .createTextOutput('Google Apps Script ativo. Use o site para enviar informações.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const fileName = `acesso_${Date.now()}.json`;
    const blob = Utilities.newBlob(JSON.stringify(payload, null, 2), 'application/json', fileName);
    const file = DriveApp.getFolderById(FOLDER_ID).createFile(blob);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, id: file.getId(), name: file.getName() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
