using System;
using System.Drawing;
using System.Drawing.Imaging;

public class Program {
    public static void Main() {
        string[] images = { "baengnyeong_b1", "baengnyeong_b2", "baengnyeong_b3", "baengnyeong_b4", "baengnyeong_b5" };
        
        foreach (string name in images) {
            string imgPath = @"c:\0_z\stamp\src\assets\" + name + ".png";
            Console.WriteLine("Cropping center of " + imgPath);
            using (Bitmap img = new Bitmap(imgPath)) {
                // Crop center 80% to remove any DALL-E watercolor borders
                int cropX = img.Width * 12 / 100;
                int cropY = img.Height * 12 / 100;
                int cropW = img.Width * 76 / 100;
                int cropH = img.Height * 76 / 100;
                
                Rectangle cropRect = new Rectangle(cropX, cropY, cropW, cropH);
                using (Bitmap cropped = img.Clone(cropRect, img.PixelFormat)) {
                    cropped.Save(@"c:\0_z\stamp\src\assets\" + name + "_cropped.png", ImageFormat.Png);
                }
            }
        }
    }
}
