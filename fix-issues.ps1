# PowerShell script to fix Next.js memory and lockfile issues

Write-Host "Fixing Next.js issues..." -ForegroundColor Green

# Navigate to the project directory
Set-Location "C:\Users\HP\Desktop\car rent thanamlwila\my-app"

# 1. Clear Next.js cache
Write-Host "`n1. Clearing Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "   ✓ Cleared .next directory" -ForegroundColor Green
}

if (Test-Path ".turbo") {
    Remove-Item -Recurse -Force ".turbo"
    Write-Host "   ✓ Cleared .turbo directory" -ForegroundColor Green
}

# 2. Clear node_modules cache (optional, uncomment if needed)
# Write-Host "`n2. Clearing node_modules..." -ForegroundColor Yellow
# if (Test-Path "node_modules") {
#     Remove-Item -Recurse -Force "node_modules"
#     Write-Host "   ✓ Cleared node_modules" -ForegroundColor Green
# }

# 3. Set NODE_OPTIONS to increase memory limit
Write-Host "`n3. Setting memory options..." -ForegroundColor Yellow
$env:NODE_OPTIONS = "--max-old-space-size=4096"
Write-Host "   ✓ Set NODE_OPTIONS=--max-old-space-size=4096" -ForegroundColor Green

# 4. Check for parent directory lockfile
Write-Host "`n4. Checking for parent lockfile..." -ForegroundColor Yellow
$parentLockfile = "C:\Users\HP\package-lock.json"
if (Test-Path $parentLockfile) {
    Write-Host "   ⚠ Found lockfile in parent directory: $parentLockfile" -ForegroundColor Yellow
    Write-Host "   Consider removing it if not needed" -ForegroundColor Yellow
}

Write-Host "`n✓ Setup complete!" -ForegroundColor Green
Write-Host "`nTo start the dev server with increased memory:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host "`nOr if memory issues persist, use webpack instead:" -ForegroundColor Cyan
Write-Host "  npm run dev:webpack" -ForegroundColor White
