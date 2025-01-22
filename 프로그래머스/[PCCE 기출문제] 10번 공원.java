import java.util.*;

class Solution {
    public int solution(int[] mats, String[][] park) {
        int r = park.length;
        int c = park[0].length;
        Arrays.sort(mats);
        
        int idx = -1;
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (!park[i][j].equals("-1")) continue;
                
                for (int mat = idx != -1 ? idx : 0; mat < mats.length; mat++) {
                    boolean flag = false;
                    for (int i2 = i; i2 < i + mats[mat]; i2++) {
                        if (i2 >= r) {
                            flag = true;
                            break;
                        }
                        for (int j2 = j; j2 < j + mats[mat]; j2++) {
                            if (j2 >= c || !park[i2][j2].equals("-1")) {
                                flag = true;
                                break;
                            }
                        }
                        if (flag) break;
                    }
                    if (flag) break;
                    else idx = mat;
                }
                
                if (idx == mats.length - 1) {
                    return mats[idx];
                }
            }
        }
        
        return idx != -1 ? mats[idx] : -1;
    }
}