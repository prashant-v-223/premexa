// =========================================================================
// PREMEXA HIGH B12 - GOOGLE SHEET AUTOMATIC ORDER ENTRY SCRIPT (ZERO BACKEND)
// =========================================================================
// 
// INSTRUCTIONS TO CONNECT YOUR GOOGLE SHEET:
// 
// 1. Open Google Sheets (https://sheets.google.com) and create a new sheet named "Premexa Orders".
// 2. Add these column headers in Row 1:
//    Timestamp | Name | Mobile Number | Full Address | Course | Payment Mode | Total Amount
// 3. Go to top menu: Extensions -> Apps Script.
// 4. Delete any code in the editor, and paste THIS entire script below.
// 5. Click "Deploy" (top right button) -> "New deployment".
// 6. Select type: "Web app".
// 7. Change "Who has access" to: "Anyone" (VERY IMPORTANT!).
// 8. Click "Deploy", authorize permissions, and copy the Web App URL (starts with https://script.google.com/macros/s/...).
// 9. Paste that URL into index.html in the GOOGLE_SHEET_SCRIPT_URL variable (line 538).
// 
// That's it! Every new inquiry/order will automatically appear in your Google Sheet instantly!

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.name || "",
      data.phone || "",
      data.address || "",
      data.course || "",
      data.payment || "",
      data.total || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Premexa Google Sheet Webhook is active!");
}
