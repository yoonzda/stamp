using System;
using System.Drawing;
using System.Collections.Generic;
using System.Linq;

public class Program {
    public static void Main() {
        string imgPath = @"C:\Users\누리아이 개발팀\.gemini\antigravity\brain\d610bd08-d1be-419b-b69c-e90ea979684c\new_tall_map_1776996277250.png";
        using (Bitmap img = new Bitmap(imgPath)) {
            bool[,] visited = new bool[img.Width, img.Height];
            List<Tuple<Point, int>> islandBlobs = new List<Tuple<Point, int>>();
            
            for (int y = 0; y < img.Height; y += 3) {
                for (int x = 0; x < img.Width; x += 3) {
                    if (!visited[x, y]) {
                        Color c = img.GetPixel(x, y);
                        // Islands are usually green/brown/dark. Ocean is light blue.
                        bool isIsland = (c.R < 150 && c.G < 200 && c.B < 150) || 
                                        (c.G > c.B && c.R > c.B) ||
                                        (c.GetBrightness() < 0.6f);
                        
                        if (isIsland) {
                            int sumX = 0, sumY = 0, count = 0;
                            Queue<Point> q = new Queue<Point>();
                            q.Enqueue(new Point(x, y));
                            visited[x, y] = true;
                            
                            while (q.Count > 0) {
                                Point p = q.Dequeue();
                                sumX += p.X;
                                sumY += p.Y;
                                count++;
                                
                                int[] dx = {-3, 3, 0, 0};
                                int[] dy = {0, 0, -3, 3};
                                for(int i=0; i<4; i++) {
                                    int nx = p.X + dx[i];
                                    int ny = p.Y + dy[i];
                                    if (nx >= 0 && nx < img.Width && ny >= 0 && ny < img.Height && !visited[nx, ny]) {
                                        Color nc = img.GetPixel(nx, ny);
                                        bool nisIsland = (nc.R < 150 && nc.G < 200 && nc.B < 150) || 
                                                         (nc.G > nc.B && nc.R > nc.B) ||
                                                         (nc.GetBrightness() < 0.6f);
                                        if (nisIsland) {
                                            visited[nx, ny] = true;
                                            q.Enqueue(new Point(nx, ny));
                                        }
                                    }
                                }
                            }
                            
                            if (count > 50) { 
                                islandBlobs.Add(new Tuple<Point, int>(new Point(sumX / count, sumY / count), count));
                            }
                        }
                    }
                }
            }
            
            var sortedIslands = islandBlobs.OrderByDescending(b => b.Item2).Take(7).ToList();
            Console.WriteLine("Found top 7 islands:");
            int idx = 1;
            foreach (var blob in sortedIslands) {
                float px = (float)blob.Item1.X / img.Width * 100;
                float py = (float)blob.Item1.Y / img.Height * 100;
                Console.WriteLine(string.Format("Island {0}: X: {1:F1}% , Y: {2:F1}%, Size: {3}", idx, px, py, blob.Item2));
                idx++;
            }
        }
    }
}
