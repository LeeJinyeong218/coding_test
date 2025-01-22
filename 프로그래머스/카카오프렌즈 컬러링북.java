import java.util.*;

class Solution {
    public int[] solution(int m, int n, int[][] picture) {
        int[][] d = {
            {-1, 0}, {1, 0}, {0, -1}, {0, 1}
        };
        
        boolean[][] visited = new boolean[m][n];
        
        int areaCount = 0;
        int maxSize = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (!visited[i][j] && picture[i][j] > 0) {
                    areaCount++;
                    int color = picture[i][j];
                    visited[i][j] = true;
                    
                    Queue<int[]> q = new LinkedList<>();
                    q.add(new int[]{i, j});
                    int size = 1;
                    
                    while (!q.isEmpty()) {
                        int[] xy = q.remove();
                        
                        for (int[] dxy : d) {
                            int nx = xy[0] + dxy[0];
                            int ny = xy[1] + dxy[1];
                            
                            if (
                                nx >= 0 && nx < m && ny >= 0 && ny < n &&
                                !visited[nx][ny] &&
                                picture[nx][ny] == color
                            ) {
                                q.add(new int[]{nx, ny});
                                visited[nx][ny] = true;
                                size++;
                            }
                        }
                    }
                    
                    maxSize = maxSize < size ? size : maxSize;
                }
            }
        }

        int[] answer = new int[2];
        answer[0] = areaCount;
        answer[1] = maxSize;
        return answer;
    }
}