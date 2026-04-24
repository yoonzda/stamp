using System;
using System.Drawing;
using System.Drawing.Imaging;

public class Program {
    public static void Main() {
        string oceanPath = @"C:\Users\누리아이 개발팀\.gemini\antigravity\brain\d610bd08-d1be-419b-b69c-e90ea979684c\pure_ocean_texture_1776992173298.png";
        string mapPath = @"c:\0_z\stamp\src\assets\map_bg_dadora.png";
        string outPath = @"c:\0_z\stamp\src\assets\map_bg_dadora_tall.png";
        
        int w = 1024;
        int h = 4000;
        
        using (Bitmap ocean = new Bitmap(oceanPath))
        using (Bitmap map = new Bitmap(mapPath))
        using (Bitmap result = new Bitmap(w, h))
        using (Graphics g = Graphics.FromImage(result)) {
            
            // Tile ocean everywhere using TileFlipXY to GUARANTEE absolutely zero visible grid lines/seams
            using (TextureBrush brush = new TextureBrush(ocean, System.Drawing.Drawing2D.WrapMode.TileFlipXY)) {
                g.FillRectangle(brush, 0, 0, w, h);
            }
            
            int yOffset = (h - 1024) / 2; // 1488
            
            BitmapData resData = result.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            BitmapData mapData = map.LockBits(new Rectangle(0, 0, 1024, 1024), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            
            unsafe {
                byte* resPtr = (byte*)resData.Scan0;
                byte* mapPtr = (byte*)mapData.Scan0;
                
                for (int y = 0; y < 1024; y++) {
                    byte* mRow = mapPtr + (y * mapData.Stride);
                    byte* rRow = resPtr + ((y + yOffset) * resData.Stride);
                    
                    for (int x = 0; x < 1024; x++) {
                        // Blend heavily over the beige border to completely hide it
                        int distX = Math.Min(x, 1023 - x);
                        int distY = Math.Min(y, 1023 - y);
                        
                        float fadeX = distX / 250f; // Very wide fade to avoid sharp murky halos
                        float fadeY = distY / 350f;
                        
                        if (fadeX > 1f) fadeX = 1f;
                        if (fadeY > 1f) fadeY = 1f;
                        
                        float alpha = Math.Min(fadeX, fadeY);
                        
                        // Smoothstep
                        alpha = alpha * alpha * (3 - 2 * alpha);
                        
                        float blendFactor = 1.0f - alpha; 
                        
                        // Extreme edge fade to alpha 0
                        float extremeAlpha = 1.0f;
                        int exX = Math.Min(x, 1023 - x);
                        int exY = Math.Min(y, 1023 - y);
                        float eX = exX / 80f;
                        float eY = exY / 120f;
                        if (eX > 1f) eX = 1f;
                        if (eY > 1f) eY = 1f;
                        extremeAlpha = Math.Min(eX, eY);
                        
                        int mB = mRow[x * 4];
                        int mG = mRow[x * 4 + 1];
                        int mR = mRow[x * 4 + 2];
                        
                        int oB = rRow[x * 4];
                        int oG = rRow[x * 4 + 1];
                        int oR = rRow[x * 4 + 2];
                        
                        int mulB = (mB * oB) / 255;
                        int mulG = (mG * oG) / 255;
                        int mulR = (mR * oR) / 255;
                        
                        int finalB = (int)(mulB * blendFactor + mB * (1 - blendFactor));
                        int finalG = (int)(mulG * blendFactor + mG * (1 - blendFactor));
                        int finalR = (int)(mulR * blendFactor + mR * (1 - blendFactor));
                        
                        rRow[x * 4] = (byte)(finalB * extremeAlpha + oB * (1 - extremeAlpha));
                        rRow[x * 4 + 1] = (byte)(finalG * extremeAlpha + oG * (1 - extremeAlpha));
                        rRow[x * 4 + 2] = (byte)(finalR * extremeAlpha + oR * (1 - extremeAlpha));
                        rRow[x * 4 + 3] = 255;
                    }
                }
            }
            
            result.UnlockBits(resData);
            map.UnlockBits(mapData);
            
            result.Save(outPath, ImageFormat.Png);
        }
    }
}
