document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log("✅ Cordova is Ready!");

    var captureButton = document.getElementById('capturePhoto');
    var scanBarcodeButton = document.getElementById('scanBarcode');
    var pdfButton = document.getElementById('pdfOpener');

    if (!captureButton || !scanBarcodeButton || !pdfButton) {
        console.error("❌ ERROR: HTML buttons not found!");
        return;
    }

    // 📌 Fotoğraf Çekme
    captureButton.addEventListener("click", function () {
        console.log("📸 Kamera açılıyor...");
        showLoading(true);
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            correctOrientation: true
        });
    });

    // 📌 QR Kod Tarama
    scanBarcodeButton.addEventListener("click", function () {
        console.log("📡 QR Tarayıcı açılıyor...");
        cordova.plugins.barcodeScanner.scan(onQrSuccess, onQrFail);
    });

    console.log("🎯 Tüm butonlar aktif hale getirildi.");
}

/**
     * @summary Opens a PDF file using the file opener plugin.
     */
pdfReaderButton.addEventListener("click", function () {
    var filePath = "/storage/emulated/0/Android/data/com.example.testcase/files/ornekpdf.pdf";
    console.log("Opening PDF...");
    cordova.plugins.fileOpener2.open(
        filePath,
        "application/pdf",
        {
            error: function (e) {
                console.log("PDF Open Error:", JSON.stringify(e));
                alert("❌ PDF Açılırken Bir Hata Oluştu: " + JSON.stringify(e));
            },
            success: function () {
                console.log("PDF Opened Successfully");
            }
        }
    );
});

function onQrSuccess(result) {
    if (result.cancelled) {
        console.log("🔕 Kullanıcı QR taramayı iptal etti.");
        return;
    }

    console.log("✅ QR Kod Okundu:", result.text);
    if (confirm("✅ QR Kod Tarandı!\n\n" + result.text + "\n\nBu linke gitmek ister misin?")) {
        window.open(result.text, "_blank");
    }
}

function onQrFail(error) {
    alert("🚫 QR kod tarama başarısız: " + error);
}

function onSuccess(imageData) {
    showLoading(false);

    if (!imageData) {
        console.error("❌ Hata: Kamera resmi boş döndürdü!");
        alert("🚫 Hata! Kamera resmi boş döndü.");
        return;
    }

    console.log("✅ Resim başarıyla çekildi.");

    var image = document.getElementById("myImage");
    image.style.display = "block";
    image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    showLoading(false);
    alert("🚫 İşlem başarısız! " + message);
}

function showLoading(show) {
    var loadingIndicator = document.getElementById("loadingIndicator");
    if (loadingIndicator) {
        loadingIndicator.style.display = show ? "block" : "none";
    }
}