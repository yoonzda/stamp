using System;
using System.Drawing;
using System.Drawing.Imaging;

public class Program {
    public static void Main() {
        string mapPath = @"C:\Users\누리아이 개발팀\.gemini\antigravity\brain\d610bd08-d1be-419b-b69c-e90ea979684c\new_tall_map_1776996277250.png";
        string outPath = @"c:\0_z\stamp\src\assets\map_bg_dadora_tall.png";
        
        int w = 1024;
        int h = 4000;
        
        using (Bitmap map = new Bitmap(mapPath))
        using (Bitmap result = new Bitmap(w, h))
        using (Graphics g = Graphics.FromImage(result)) {
            
            int yOffset = (h - 1024) / 2; // 1488
            
            // Draw center original image
            g.DrawImage(map, 0, yOffset);
            
            // Seamlessly extend top using the top 100 pixels mirrored
            Rectangle topEdge = new Rectangle(0, 0, 1024, 150);
            using (Bitmap topSlice = map.Clone(topEdge, map.PixelFormat))
            using (TextureBrush topBrush = new TextureBrush(topSlice, System.Drawing.Drawing2D.WrapMode.TileFlipY)) {
                topBrush.TranslateTransform(0, yOffset - 150);
                g.FillRectangle(topBrush, 0, 0, 1024, yOffset);
            }
            
            // Seamlessly extend bottom using the bottom 100 pixels mirrored
            Rectangle botEdge = new Rectangle(0, 1024 - 150, 1024, 150);
            using (Bitmap botSlice = map.Clone(botEdge, map.PixelFormat))
            using (TextureBrush botBrush = new TextureBrush(botSlice, System.Drawing.Drawing2D.WrapMode.TileFlipY)) {
                botBrush.TranslateTransform(0, yOffset + 1024);
                g.FillRectangle(botBrush, 0, yOffset + 1024, 1024, h - (yOffset + 1024));
            }
            
            result.Save(outPath, ImageFormat.Png);
        }
    }
}
