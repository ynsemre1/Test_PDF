document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log("✅ Cordova is Ready!");

    var captureButton = document.getElementById('capturePhoto');
    var scanBarcodeButton = document.getElementById('scanBarcode');
    var pdfButton = document.getElementById('pdfOpener'); // ✅ PDF butonu

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

    // 📌 PDF Açma veya İndirme
    pdfButton.addEventListener("click", function () {
        var filePath = cordova.file.dataDirectory + "ornekpdf.pdf"; // 📂 Uygulama dizinine kaydet

        checkIfFileExists(filePath, function (exists) {
            if (exists) {
                // ✅ Dosya zaten varsa direkt aç
                console.log("📂 PDF dosyası bulundu, açılıyor...");
                openPDF(filePath);
            } else {
                // 🌍 Dosya yoksa indir
                console.log("📥 PDF bulunamadı, indirme başlatılıyor...");
                downloadPDF();
            }
        });
    });

    console.log("🎯 Tüm butonlar aktif hale getirildi.");
}

/**
 * 📥 Web'den PDF indir ve UYGULAMA DİZİNİNE kaydet
 */
function downloadPDF() {
    var fileTransfer = new FileTransfer();
    var uri = encodeURI("https://www.odgyapi.com/upload/urunler/unique-tower-139460.pdf"); // 🌍 Web'deki PDF dosyası
    var fileURL = cordova.file.dataDirectory + "ornekpdf.pdf"; // 📂 Uygulama dizinine kaydet

    fileTransfer.download(uri, fileURL, function (entry) {
        console.log("✅ PDF başarıyla indirildi: " + entry.toURL());
        alert("📄 PDF başarıyla indirildi!");

        // ✅ İndirilen PDF'yi aç
        openPDF(entry.toURL());
    }, function (error) {
        console.log("❌ PDF indirme hatası:", JSON.stringify(error));
        alert("❌ PDF indirilemedi: " + JSON.stringify(error));
    }, false);
}

/**
 * 📖 PDF Açma İşlemi
 */
function openPDF(filePath) {
    cordova.plugins.fileOpener2.open(
        filePath,
        "application/pdf",
        {
            error: function (e) {
                console.log("❌ PDF Açma Hatası:", JSON.stringify(e));
                alert("❌ PDF açılamadı: " + JSON.stringify(e));
            },
            success: function () {
                console.log("✅ PDF başarıyla açıldı");
            }
        }
    );
}

/**
 * 📂 Belirtilen dosyanın var olup olmadığını kontrol eder
 */
function checkIfFileExists(filePath, callback) {
    window.resolveLocalFileSystemURL(filePath, function () {
        callback(true); // ✅ Dosya var
        alert("pdf var");
    }, function () {
        callback(false); // ❌ Dosya yok
        alert("pdf yok");
    });
}

// 📌 QR Kod Tarama Başarı & Hata Fonksiyonları
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

// 📌 Kamera Fotoğraf Çekme İşlevi
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

// 📌 Yükleniyor göstergesini kontrol etme
function showLoading(show) {
    var loadingIndicator = document.getElementById("loadingIndicator");
    if (loadingIndicator) {
        loadingIndicator.style.display = show ? "block" : "none";
    }
}