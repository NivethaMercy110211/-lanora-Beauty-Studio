# ============================================
# Élanora Beauty Studio — Setup Hero Banner & Images
# ============================================

$heroDir = "assets/images/hero"
$pagesDir = "assets/images/pages"

if (-not (Test-Path $heroDir))  { New-Item -ItemType Directory -Path $heroDir -Force }
if (-not (Test-Path $pagesDir)) { New-Item -ItemType Directory -Path $pagesDir -Force }

$brainDir = "$env:USERPROFILE\.gemini\antigravity-ide\brain\0897cf53-68db-419f-9405-40079636a573"

# Copy high-fashion uploaded hero image
$uploadedMedia = "$brainDir\media__1786738785174.jpg"
if (Test-Path $uploadedMedia) {
    Copy-Item -Path $uploadedMedia -Destination "$heroDir/home1-salon-hero.jpg" -Force
    Copy-Item -Path $uploadedMedia -Destination "$heroDir/home1-salon-hero.png" -Force
    Write-Host "✅ Set high-fashion uploaded image as home1-salon-hero.jpg & png" -ForegroundColor Green
}

# Copy same-person before and after photos
$genBefore = Get-ChildItem "$brainDir\before_transformation_v2*.png" | Select-Object -First 1
$genAfter  = Get-ChildItem "$brainDir\after_transformation_v2*.png"  | Select-Object -First 1

if ($genBefore -and (Test-Path $genBefore.FullName)) {
    Copy-Item -Path $genBefore.FullName -Destination "$pagesDir/before.jpg" -Force
}

if ($genAfter -and (Test-Path $genAfter.FullName)) {
    Copy-Item -Path $genAfter.FullName -Destination "$pagesDir/after.jpg" -Force
}

Write-Host "🎉 All luxury assets set up cleanly!" -ForegroundColor Cyan
