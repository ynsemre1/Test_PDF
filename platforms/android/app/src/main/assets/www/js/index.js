document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log("✅ Cordova is Ready!");

    var captureButton = document.getElementById('capturePhoto');
    var scanBarcodeButton = document.getElementById('scanBarcode');

    if (!captureButton || !scanBarcodeButton) {
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