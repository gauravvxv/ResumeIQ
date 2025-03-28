import { PDFDocument } from "pdf-lib";

export const extractTextFromPDF = async (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        const pdfData = new Uint8Array(event.target.result);
        const pdfDoc = await PDFDocument.load(pdfData);
        
        let extractedText = "";
        for (let i = 0; i < pdfDoc.getPageCount(); i++) {
          const page = pdfDoc.getPage(i);
          extractedText += await page.getTextContent();
        }

        resolve(extractedText);
      } catch (error) {
        reject("Error extracting text from PDF");
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
