# Git Push Script for patient-domain branch (for PR)
$ErrorActionPreference = "Continue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Git Push for Pull Request" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set working directory
Set-Location "c:\Users\nada\Downloads\ClinicWebSite_Frontend"
Write-Host "[1/7] Changed directory to:" (Get-Location).Path -ForegroundColor Green

# Abort any existing merge
Write-Host "[2/7] Cleaning up any pending merges..." -ForegroundColor Yellow
git -c core.editor=true merge --abort 2>$null
Write-Host "      Done" -ForegroundColor Green

# Ensure we're on main branch first
Write-Host "[3/7] Switching to main branch..." -ForegroundColor Yellow
git checkout main 2>$null
Write-Host "      Done" -ForegroundColor Green

# Pull latest from main
Write-Host "[4/7] Pulling latest changes from main..." -ForegroundColor Yellow
git -c core.editor=true pull origin main 2>&1 | Out-Null
Write-Host "      Done" -ForegroundColor Green

# Create and checkout patient-domain branch
Write-Host "[5/7] Creating patient-domain branch..." -ForegroundColor Yellow
git checkout -b patient-domain 2>$null
if ($LASTEXITCODE -ne 0) {
    # Branch exists, just switch to it
    git checkout patient-domain 2>$null
    # Merge latest from main
    git merge main --no-edit 2>$null
}
Write-Host "      Current branch:" (git branch --show-current) -ForegroundColor Green

# Add all changes
Write-Host "[6/7] Adding all changes..." -ForegroundColor Yellow
git add .
$status = git status --short
Write-Host "      Files to commit:" -ForegroundColor Cyan
$status | ForEach-Object { Write-Host "        $_" -ForegroundColor White }

# Commit changes
Write-Host "[7/7] Committing changes..." -ForegroundColor Yellow
git commit -m "feat: Add dynamic notifications and dashboard improvements

- Dynamic notification system using localStorage
- Auto-update notifications on appointment booking  
- Dashboard refresh button with live data
- Improved patient authentication flow
- Fixed module import paths
- Enhanced dashboard UI with Quick Actions
- Real-time appointment count updates
- Notification system integration

User: nada2hossam (Patient Domain Implementation)"

if ($LASTEXITCODE -eq 0) {
    Write-Host "      Commit successful!" -ForegroundColor Green
    
    # Push to remote
    Write-Host ""
    Write-Host "Pushing to origin patient-domain..." -ForegroundColor Yellow
    git push -u origin patient-domain
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  ✅ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Branch: patient-domain" -ForegroundColor Cyan
        Write-Host "User: nada2hossam" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "🔗 Create Pull Request:" -ForegroundColor Yellow
        Write-Host "   https://github.com/fhrginada/ClinicWebSite_Frontend/compare/main...patient-domain" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Or run: gh pr create --base main --head patient-domain" -ForegroundColor Gray
    } else {
        Write-Host ""
        Write-Host "⚠️  Push failed. You may need to authenticate with GitHub." -ForegroundColor Red
    }
} else {
    Write-Host "      No changes to commit or commit failed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Script completed!" -ForegroundColor Cyan
