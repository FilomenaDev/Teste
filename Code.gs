const FOLDER_ID = '1rHoulgb3m7yt5FqQx8AGw4tkc1IsJfIs';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const bytes = Utilities.base64Decode(payload.data);
    const blob = Utilities.newBlob(bytes, payload.mimeType || 'image/jpeg', payload.fileName || `foto_${Date.now()}.jpg`);
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
