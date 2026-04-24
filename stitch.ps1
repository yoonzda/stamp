Add-Type -AssemblyName System.Drawing
$canvasWidth = 1024
$canvasHeight = 1800

$tallBmp = New-Object System.Drawing.Bitmap($canvasWidth, $canvasHeight)
$g = [System.Drawing.Graphics]::FromImage($tallBmp)

$canvasImg = [System.Drawing.Image]::FromFile('c:\0_z\stamp\src\assets\original_blank_canvas.png')
$mapImg = [System.Drawing.Image]::FromFile('c:\0_z\stamp\src\assets\map_bg_dadora.png')

$brush = New-Object System.Drawing.TextureBrush($canvasImg)
$g.FillRectangle($brush, 0, 0, $canvasWidth, $canvasHeight)

$yOffset = [int](($canvasHeight - $mapImg.Height) / 2)
$g.DrawImage($mapImg, 0, $yOffset, $mapImg.Width, $mapImg.Height)

$tallBmp.Save('c:\0_z\stamp\src\assets\map_bg_dadora_tall_stitched.png', [System.Drawing.Imaging.ImageFormat]::Png)

$brush.Dispose()
$g.Dispose()
$tallBmp.Dispose()
$canvasImg.Dispose()
$mapImg.Dispose()
