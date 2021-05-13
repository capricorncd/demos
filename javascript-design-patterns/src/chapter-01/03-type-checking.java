/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/05/23 22:10
 */

// Duck.java
public class Duck {
  public void makeSound() {
    System.out.println('ga ga ga');
  }
}

// Chicken.java
public class Chicken {
  public void makeSound() {
    System.out.println('ge ge ge');
  }
}

// AnimalSound.java
public class AnimalSound {
  // 只能Duck类型
  public void makeSound(Duck duck) {
    duck.makeSound();
  }
}

// Test.java
// main
public class Test {
  public static void main(String args[]) {
    AnimalSound as = new AnimalSound();
    Duck duck = new Duck();
    as.makeSound(duck); // print: ga ga ga
    Chicken chicken = new Chicken();
    as.makeSound(chicken); // 抛出异常，只能接收Duck类型参数。
  }
}
