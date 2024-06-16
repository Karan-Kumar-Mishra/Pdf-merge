
function downloadpdf()
{
    var pdfUrl = 'merged.pdf';
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = pdfUrl;
    a.download = `Merged-file.pdf`; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}