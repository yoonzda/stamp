using System;
using System.Drawing;
using System.Collections.Generic;

public class Program {
    public static void Main() {
        string imgPath = @"C:\Users\누리아이 개발팀\.gemini\antigravity\brain\d610bd08-d1be-419b-b69c-e90ea979684c\premium_watercolor_map_1776995745435.png";
        using (Bitmap img = new Bitmap(imgPath)) {
            bool[,] visited = new bool[img.Width, img.Height];
            List<Point> islandCenters = new List<Point>();
            
            for (int y = 0; y < img.Height; y += 5) {
                for (int x = 0; x < img.Width; x += 5) {
                    if (!visited[x, y]) {
                        Color c = img.GetPixel(x, y);
                        // Islands are usually green or brown (G > B, R > B, or just dark)
                        // Ocean is usually blue (B > G, B > R)
                        if ((c.G > c.B + 10 || c.R > c.B + 10) && c.GetBrightness() < 0.8f) {
                            // Simple flood fill to find center
                            int sumX = 0, sumY = 0, count = 0;
                            Queue<Point> q = new Queue<Point>();
                            q.Enqueue(new Point(x, y));
                            visited[x, y] = true;
                            
                            while (q.Count > 0) {
                                Point p = q.Dequeue();
                                sumX += p.X;
                                sumY += p.Y;
                                count++;
                                
                                int[] dx = {-5, 5, 0, 0};
                                int[] dy = {0, 0, -5, 5};
                                for(int i=0; i<4; i++) {
                                    int nx = p.X + dx[i];
                                    int ny = p.Y + dy[i];
                                    if (nx >= 0 && nx < img.Width && ny >= 0 && ny < img.Height && !visited[nx, ny]) {
                                        Color nc = img.GetPixel(nx, ny);
                                        if ((nc.G > nc.B + 5 || nc.R > nc.B + 5) && nc.GetBrightness() < 0.85f) {
                                            visited[nx, ny] = true;
                                            q.Enqueue(new Point(nx, ny));
                                        }
                                    }
                                }
                            }
                            
                            if (count > 20) { // Only count large enough blobs
                                islandCenters.Add(new Point(sumX / count, sumY / count));
                            }
                        }
                    }
                }
            }
            
            Console.WriteLine("Found " + islandCenters.Count + " islands.");
            foreach (var pt in islandCenters) {
                float px = (float)pt.X / img.Width * 100;
                float py = (float)pt.Y / img.Height * 100;
                Console.WriteLine($"Island at X: {px:F1}% , Y: {py:F1}%");
            }
        }
    }
}
