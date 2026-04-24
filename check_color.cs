using System;
using System.Drawing;

public class Program {
    public static void Main() {
        string imgPath = @"c:\0_z\stamp\src\assets\baengnyeong_b1.png";
        using (Bitmap img = new Bitmap(imgPath)) {
            Color topLeft = img.GetPixel(0, 0);
            Color center = img.GetPixel(img.Width/2, img.Height/2);
            Console.WriteLine(string.Format("TopLeft: {0}, {1}, {2}", topLeft.R, topLeft.G, topLeft.B));
            Console.WriteLine(string.Format("Center: {0}, {1}, {2}", center.R, center.G, center.B));
        }
    }
}
