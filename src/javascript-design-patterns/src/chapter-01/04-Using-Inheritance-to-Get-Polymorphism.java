/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/05/23 22:10
 */

// Animal.java
// 抽象类
public abstract class Animal {
  // 抽象方法
  abstract void makeSound();
}

// Chicken.java
public class Chicken extands Animal {
  public void makeSound() {
    System.out.println('ge ge ge');
  }
}

// Duck.java
public class Duck extands Animal {
  public void makeSound() {
    System.out.println('ga ga ga');
  }
}

// AnimalSound.java
public class AnimalSound {
  public void makeSound(Animal animal) {
    animal.makeSound();
  }
}

// Test.java
public class Test {
  public static void main(String[] args) {
    AnimalSound as = new AnimalSound();
    Animal duck = new Duck();
    Animal chicken = new Chicken();
    as.makeSound(duck); // ga ga ga
    as.makeSound(chicken); // ge ge ge
  }
}
