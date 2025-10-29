@echo off
echo Building Living Map...
powershell -command "Invoke-RestMethod -Uri 'https://api.github.com/repos/Secret-Uzbek/FMP-monograph/contents' | ForEach-Object { $c = (Invoke-RestMethod -Uri $_.download_url); $hash = [System.BitConverter]::ToString([System.Security.Cryptography.SHA256]::Create().ComputeHash([System.Text.Encoding]::UTF8.GetBytes($c))).Replace('-',''); '| ' + $_.path + ' | ' + $hash + ' | ' + ($c -split \"`n\")[0] + ' |' } | Out-File -FilePath Living_Map_v1_0.md -Encoding UTF8"
start Living_Map_v1_0.md
echo Готово! Файл открыт.
pause