# Define parameters
$resourceGroupName = "myResourceGroup"
$location = "EastUS"
$storageAccountName = "mystorageaccount$(Get-Random)"
$skuName = "Standard_LRS"
$kind = "StorageV2"
$accessTier = "Hot"

# Authenticate to Azure
Connect-AzAccount

# Create the resource group
New-AzResourceGroup -Name $resourceGroupName -Location $location

# Create the storage account
New-AzStorageAccount -ResourceGroupName $resourceGroupName `
                     -Name $storageAccountName `
                     -Location $location `
                     -SkuName $skuName `
                     -Kind $kind `
                     -AccessTier $accessTier

Write-Output "Storage account $storageAccountName created in resource group $resourceGroupName."