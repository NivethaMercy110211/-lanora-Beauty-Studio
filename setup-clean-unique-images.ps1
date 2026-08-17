# PowerShell script to maintain local asset directories for Élanora Beauty Studio

$CurrentDir = if ($PSScriptRoot) { $PSScriptRoot } else { Get-Location }

$ServicesDir = Join-Path $CurrentDir "assets\images\services"
$StylistsDir = Join-Path $CurrentDir "assets\images\stylists"
$OffersDir   = Join-Path $CurrentDir "assets\images\offers"
$BrandsDir   = Join-Path $CurrentDir "assets\images\brands"

# Create directories if missing
New-Item -ItemType Directory -Force -Path $ServicesDir, $StylistsDir, $OffersDir, $BrandsDir | Out-Null

Write-Host "Local image directories prepared cleanly." -ForegroundColor Cyan
