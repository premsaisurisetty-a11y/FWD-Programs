$MavenVersion = "3.9.6"
# Using Maven Central which is more persistent
$MavenUrl = "https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/$MavenVersion/apache-maven-$MavenVersion-bin.zip"
$DestDir = "$PSScriptRoot\.tools"
$ZipPath = "$DestDir\maven.zip"
$ExtractPath = "$DestDir"

# Create directory
if (!(Test-Path $DestDir)) {
    New-Item -ItemType Directory -Path $DestDir | Out-Null
}

# Download
Write-Host "Downloading Maven from $MavenUrl..."
try {
    Invoke-WebRequest -Uri $MavenUrl -OutFile $ZipPath -ErrorAction Stop
} catch {
    Write-Error "Failed to download Maven: $_"
    exit 1
}

# Extract
Write-Host "Extracting Maven..."
Expand-Archive -Path $ZipPath -DestinationPath $ExtractPath -Force

# Cleanup
Remove-Item $ZipPath

# Output the bin path
$MavenBin = "$DestDir\apache-maven-$MavenVersion\bin\mvn.cmd"
Write-Host "Maven installed successfully at: $MavenBin"
