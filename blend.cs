using System;
using System.Drawing;
using System.Drawing.Imaging;

public class Program {
    public static void Main() {
        string mapPath = @"c:\0_z\stamp\src\assets\map_bg_dadora.png";
        string outPath = @"c:\0_z\stamp\src\assets\map_bg_dadora_tall.png";
        
        int w = 1024;
        int h = 4000;
        
        using (Bitmap map = new Bitmap(mapPath))
        using (Bitmap cleanedMap = new Bitmap(1024, 1024))
        using (Bitmap result = new Bitmap(w, h))
        using (Graphics g = Graphics.FromImage(result)) {
            
            // Step 1: Clean the map by removing all yellow/beige paper and turning it into clean ocean blue
            BitmapData mapData = map.LockBits(new Rectangle(0, 0, 1024, 1024), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            BitmapData cleanData = cleanedMap.LockBits(new Rectangle(0, 0, 1024, 1024), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            
            unsafe {
                byte* mapPtr = (byte*)mapData.Scan0;
                byte* cleanPtr = (byte*)cleanData.Scan0;
                
                for (int y = 0; y < 1024; y++) {
                    byte* mRow = mapPtr + (y * mapData.Stride);
                    byte* cRow = cleanPtr + (y * cleanData.Stride);
                    
                    for (int x = 0; x < 1024; x++) {
                        int mB = mRow[x * 4];
                        int mG = mRow[x * 4 + 1];
                        int mR = mRow[x * 4 + 2];
                        
                        // 1. Eliminate Yellow (Beige paper)
                        int targetB = (mR + mG) / 2;
                        if (mB < targetB) {
                            float luma = (0.299f * mR + 0.587f * mG + 0.114f * mB);
                            if (luma > 180) { // Only affect bright paper
                                float factor = (luma - 180) / 75f;
                                if (factor > 1f) factor = 1f;
                                mB = (int)(mB * (1 - factor) + targetB * factor);
                            }
                        }
                        
                        // 2. Tint the now-neutral bright paper into clean ocean blue
                        float luma2 = (0.299f * mR + 0.587f * mG + 0.114f * mB);
                        if (luma2 > 200) {
                            float factor = (luma2 - 200) / 55f;
                            if (factor > 1f) factor = 1f;
                            
                            // Ocean blue target
                            int tintR = 175;
                            int tintG = 215;
                            int tintB = 225;
                            
                            mR = (int)(mR * (1 - factor) + (mR * tintR / 255f) * factor);
                            mG = (int)(mG * (1 - factor) + (mG * tintG / 255f) * factor);
                            mB = (int)(mB * (1 - factor) + (mB * tintB / 255f) * factor);
                        }
                        
                        cRow[x * 4] = (byte)mB;
                        cRow[x * 4 + 1] = (byte)mG;
                        cRow[x * 4 + 2] = (byte)mR;
                        cRow[x * 4 + 3] = 255;
                    }
                }
            }
            
            map.UnlockBits(mapData);
            cleanedMap.UnlockBits(cleanData);
            
            // Step 2: Build the 4000px image using the CLEANED map
            int yOffset = (h - 1024) / 2; // 1488
            
            // Draw center
            g.DrawImage(cleanedMap, 0, yOffset);
            
            // Top extension: TileFlipY the top 200 pixels of cleanedMap
            Rectangle topEdge = new Rectangle(0, 0, 1024, 200);
            using (Bitmap topSlice = cleanedMap.Clone(topEdge, cleanedMap.PixelFormat))
            using (TextureBrush topBrush = new TextureBrush(topSlice, System.Drawing.Drawing2D.WrapMode.TileFlipY)) {
                // We need to translate the brush so the flip aligns perfectly with yOffset
                topBrush.TranslateTransform(0, yOffset - 200);
                g.FillRectangle(topBrush, 0, 0, 1024, yOffset);
            }
            
            // Bottom extension: TileFlipY the bottom 200 pixels of cleanedMap
            Rectangle botEdge = new Rectangle(0, 1024 - 200, 1024, 200);
            using (Bitmap botSlice = cleanedMap.Clone(botEdge, cleanedMap.PixelFormat))
            using (TextureBrush botBrush = new TextureBrush(botSlice, System.Drawing.Drawing2D.WrapMode.TileFlipY)) {
                botBrush.TranslateTransform(0, yOffset + 1024);
                g.FillRectangle(botBrush, 0, yOffset + 1024, 1024, h - (yOffset + 1024));
            }
            
            result.Save(outPath, ImageFormat.Png);
        }
    }
}
