#include <iostream>
#include <ctime>

using namespace std;

int fib(int x)
{
    if (x <= 0)
        return 0;
    if (x <= 2)
        return 1;
    return fib(x - 1) + fib(x - 2);
}

int main()
{
    int t1, t2;
    t1 = clock();

    fib(40);

    t2 = clock();
    cout << t2 - t1 << "ms" << endl;

    return 0;
}
