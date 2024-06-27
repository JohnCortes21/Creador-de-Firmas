document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signatureForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const signatureText = document.getElementById('signatureText').value;
        const signatureRole = document.getElementById('signatureRole').value;
        const signatureImage = document.getElementById('signatureImage').files[0];
        
        if (signatureImage && signatureText && signatureRole) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const signatureOutput = document.getElementById('signatureOutput');
                signatureOutput.innerHTML = `
                    <img src="${e.target.result}" alt="Signature Image">
                    <div>
                        <p>${signatureText}</p>
                        <span>${signatureRole}</span>
                    </div>
                `;
                
                // Mostrar el botón de descarga
                document.getElementById('downloadBtn').style.display = 'block';
            };
            
            reader.readAsDataURL(signatureImage);
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    document.getElementById('downloadBtn').addEventListener('click', function() {
        if (typeof html2canvas !== 'undefined') {
            html2canvas(document.getElementById('signatureOutput')).then(function(canvas) {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'firma_digital.png';
                link.click();
            }).catch(function(error) {
                console.error('Error capturando la firma: ', error);
            });
        } else {
            console.error('html2canvas no está definido');
        }
    });
});

