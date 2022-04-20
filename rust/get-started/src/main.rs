use std::io;

fn main() {
    println!("猜一个字符");

    let mut str = String::new();
    io::stdin().read_line(&mut str).expect("Error read_line");

    println!("输入的字符为：{}", str);
}