function generateCV() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const summary = document.getElementById("summary").value;

  // Create PDF
  const doc = new jsPDF();
  doc.text(`CV for ${name}`, 10, 10);
  doc.text(`Email: ${email}`, 10, 20);
  doc.text(`Summary: ${summary}`, 10, 30);
  
  // Save PDF
  doc.save("my-cv.pdf");
}
