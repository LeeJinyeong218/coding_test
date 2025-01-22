import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.stream.Collectors;
import java.util.*;

public class Main {
  static int MAX = 20;

  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    int M = Integer.parseInt(br.readLine());
    int bit = 0;
    LinkedList<String> answer = new LinkedList<String>();

    for (int i = 0; i < M; i++) {
      String[] line = br.readLine().split(" ");

      String command = line[0];
      int num = 0;
      if (line.length == 2)
        num = Integer.parseInt(line[1]);

      switch (command) {
        case "add":
          bit |= 1 << (num - 1);
          break;
        case "remove":
          bit &= ~(1 << (num - 1));
          break;
        case "check":
          answer.add((bit & (1 << (num - 1))) != 0 ? "1" : "0");
          break;
        case "toggle":
          bit ^= (1 << (num - 1));
          break;
        case "all":
          bit = (1 << MAX) - 1;
          break;
        case "empty":
          bit = 0;
          break;
        default:
          break;
      }
    }

    System.out.println(answer.stream().collect(Collectors.joining("\n")));
  }
}
