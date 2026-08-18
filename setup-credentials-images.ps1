# ============================================
# Élanora Beauty Studio — Setup Credentials Images
# ============================================

$credentialsDir = Join-Path $PSScriptRoot "assets\images\credentials"

if (-not (Test-Path $credentialsDir)) {
    New-Item -ItemType Directory -Path $credentialsDir -Force | Out-Null
}

$brainDir = "$env:USERPROFILE\.gemini\antigravity-ide\brain\a8928fb5-c46d-4717-8a8c-f25bc64fa330"

$lorealImg     = Join-Path $brainDir "loreal_cert_1787055874195.png"
$cidescoImg    = Join-Path $brainDir "cidesco_cert_1787055893861.png"
$opiImg        = Join-Path $brainDir "opi_cert_1787056534944.png"
$schwarzkopfImg = Join-Path $brainDir "schwarzkopf_cert_1787056567563.png"

if (Test-Path $lorealImg) {
    Copy-Item -Path $lorealImg -Destination (Join-Path $credentialsDir "loreal-cert.jpg") -Force
    Write-Host "✅ Set L'Oréal Professionnel credential image" -ForegroundColor Green
}

if (Test-Path $cidescoImg) {
    Copy-Item -Path $cidescoImg -Destination (Join-Path $credentialsDir "cidesco-cert.jpg") -Force
    Write-Host "✅ Set CIDESCO International credential image" -ForegroundColor Green
}

if (Test-Path $opiImg) {
    Copy-Item -Path $opiImg -Destination (Join-Path $credentialsDir "opi-cert.jpg") -Force
    Write-Host "✅ Set OPI Professional credential image" -ForegroundColor Green
}

if (Test-Path $schwarzkopfImg) {
    Copy-Item -Path $schwarzkopfImg -Destination (Join-Path $credentialsDir "schwarzkopf-cert.jpg") -Force
    Write-Host "✅ Set Schwarzkopf Academy credential image" -ForegroundColor Green
}

Write-Host "🎉 All credential images set up successfully!" -ForegroundColor Cyan
