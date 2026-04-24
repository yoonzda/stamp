using System;
using System.Drawing;
using System.Drawing.Imaging;

public class Program {
    public static void Main() {
        string oceanPath = @"C:\Users\누리아이 개발팀\.gemini\antigravity\brain\d610bd08-d1be-419b-b69c-e90ea979684c\pure_ocean_texture_1776992173298.png";
        string mapPath = @"c:\0_z\stamp\src\assets\map_bg_dadora.png";
        string outPath = @"c:\0_z\stamp\src\assets\map_bg_dadora_tall.png";
        
        int w = 1024;
        int h = 4000; // Extremely tall to allow safe vertical cropping on any device
        
        using (Bitmap ocean = new Bitmap(oceanPath))
        using (Bitmap map = new Bitmap(mapPath))
        using (Bitmap result = new Bitmap(w, h))
        using (Graphics g = Graphics.FromImage(result)) {
            
            // Tile ocean everywhere
            using (TextureBrush brush = new TextureBrush(ocean)) {
                g.FillRectangle(brush, 0, 0, w, h);
            }
            
            int yOffset = (h - 1024) / 2; // 1488
            int fadeHeight = 350; // generous fade
            
            BitmapData resData = result.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            BitmapData mapData = map.LockBits(new Rectangle(0, 0, 1024, 1024), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            
            unsafe {
                byte* resPtr = (byte*)resData.Scan0;
                byte* mapPtr = (byte*)mapData.Scan0;
                
                for (int y = 0; y < 1024; y++) {
                    float blendFactor = 0f; // 0 = original map, 1 = multiply with ocean
                    
                    if (y < fadeHeight) {
                        blendFactor = 1f - ((float)y / fadeHeight);
                    }
                    else if (y > 1024 - fadeHeight) {
                        blendFactor = (float)(y - (1024 - fadeHeight)) / fadeHeight;
                    }
                    
                    // Smoothstep the blendFactor for a natural gradient
                    blendFactor = blendFactor * blendFactor * (3 - 2 * blendFactor);
                    
                    // Also we need an alpha fade at the absolute extreme edges so there is no hard seam
                    float alpha = 1.0f;
                    int extremeEdge = 100;
                    if (y < extremeEdge) alpha = (float)y / extremeEdge;
                    else if (y > 1024 - extremeEdge) alpha = (float)(1024 - 1 - y) / extremeEdge;
                    
                    byte* mRow = mapPtr + (y * mapData.Stride);
                    byte* rRow = resPtr + ((y + yOffset) * resData.Stride);
                    
                    for (int x = 0; x < 1024; x++) {
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
                        
                        // Apply alpha at extreme edges to avoid hard lines
                        rRow[x * 4] = (byte)(finalB * alpha + oB * (1 - alpha));
                        rRow[x * 4 + 1] = (byte)(finalG * alpha + oG * (1 - alpha));
                        rRow[x * 4 + 2] = (byte)(finalR * alpha + oR * (1 - alpha));
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
