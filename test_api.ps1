$body = @{
    code = "print('Hello from Docker STDIN!'); print(2 + 2)"
    language = "python"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri http://localhost:3000/api/execute `
    -Method POST `
    -ContentType "application/json" `
    -Body $body

Write-Host "Response Status: " $response.StatusCode
Write-Host "Response Content:"
Write-Host $response.Content | ConvertFrom-Json | ConvertTo-Json
