[System.String] $utct = (Get-Date(Get-Date).ToUniversalTime() -uformat "%s")
$utct = $utct -replace ',', '.'
[System.Decimal] $utc = $utct
[system.string] $service = 'ABS EKT Inlezen 10'

[System.Object] $body = New-Object system.object
Add-Member -InputObject $body -MemberType NoteProperty -Name CreatedHeartBeatAt -Value ([system.math]::floor($utc))
Add-Member -InputObject $body -MemberType NoteProperty -Name HostName -Value $env:COMPUTERNAME
Add-Member -InputObject $body -MemberType NoteProperty -Name HostServiceName -Value $service
Add-Member -InputObject $body -MemberType NoteProperty -Name HostServiceStatus -Value 'Error'
Add-Member -InputObject $body -MemberType NoteProperty -Name HostServiceStatusMessage -Value 'Unable to access folder x'

ConvertTo-Json -InputObject $body

Invoke-WebRequest `
    -Uri 'http://127.0.0.1:1337/api/v1/serviceheartbeatcontroller' `
    -UseBasicParsing `
    -Method Post `
    -ContentType "application/json" `
    -Body (ConvertTo-Json -InputObject $body)
