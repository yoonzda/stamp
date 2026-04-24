using System;
using System.Drawing;
using System.Drawing.Imaging;

public class Program {
    public static void Main() {
        string oceanPath = @"C:\Users\누리아이 개발팀\.gemini\antigravity\brain\d610bd08-d1be-419b-b69c-e90ea979684c\pure_ocean_texture_1776992173298.png";
        string mapPath = @"c:\0_z\stamp\src\assets\map_bg_dadora.png";
        string outPath = @"c:\0_z\stamp\src\assets\map_bg_dadora_tall.png";
        
        using (Bitmap ocean = new Bitmap(oceanPath))
        using (Bitmap map = new Bitmap(mapPath))
        using (Bitmap result = new Bitmap(1024, 1800))
        using (Graphics g = Graphics.FromImage(result)) {
            
            // Tile ocean
            using (TextureBrush brush = new TextureBrush(ocean)) {
                g.FillRectangle(brush, 0, 0, 1024, 1800);
            }
            
            int yOffset = 388;
            int fadeHeight = 250;
            
            BitmapData resData = result.LockBits(new Rectangle(0, 0, 1024, 1800), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            BitmapData mapData = map.LockBits(new Rectangle(0, 0, 1024, 1024), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            
            unsafe {
                byte* resPtr = (byte*)resData.Scan0;
                byte* mapPtr = (byte*)mapData.Scan0;
                
                for (int y = 0; y < 1024; y++) {
                    float alpha = 1.0f;
                    if (y < fadeHeight) alpha = (float)y / fadeHeight;
                    else if (y > 1024 - fadeHeight) alpha = (float)(1024 - 1 - y) / fadeHeight;
                    
                    alpha = alpha * alpha * (3 - 2 * alpha); // smoothstep
                    
                    byte* mRow = mapPtr + (y * mapData.Stride);
                    byte* rRow = resPtr + ((y + yOffset) * resData.Stride);
                    
                    for (int x = 0; x < 1024; x++) {
                        int mB = mRow[x * 4];
                        int mG = mRow[x * 4 + 1];
                        int mR = mRow[x * 4 + 2];
                        
                        int rB = rRow[x * 4];
                        int rG = rRow[x * 4 + 1];
                        int rR = rRow[x * 4 + 2];
                        
                        // Multiply blend
                        int mulB = (mB * rB) / 255;
                        int mulG = (mG * rG) / 255;
                        int mulR = (mR * rR) / 255;
                        
                        rRow[x * 4] = (byte)(mulB * alpha + rB * (1 - alpha));
                        rRow[x * 4 + 1] = (byte)(mulG * alpha + rG * (1 - alpha));
                        rRow[x * 4 + 2] = (byte)(mulR * alpha + rR * (1 - alpha));
                    }
                }
            }
            
            result.UnlockBits(resData);
            map.UnlockBits(mapData);
            
            result.Save(outPath, ImageFormat.Png);
        }
    }
}
