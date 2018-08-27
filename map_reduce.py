from functools import reduce

def func1(x):
    return x * x

def func2(x, y):
    return x * 10 + y

# map()函数接收两个参数，一个是函数，一个是序列，map将传入的函数依次作用到序列的每个元素，并把结果作为新的list返回。
print(list(map(func1, [1, 2, 3, 4, 5, 6, 7, 8, 9])))
print(list(map(str, [1, 2, 3, 4, 5, 6, 7, 8, 9])))

# reduce把一个函数作用在一个序列[x1, x2, x3...]上，这个函数必须接收两个参数，reduce把结果继续和序列的下一个元素做累积计算
print(reduce(func2, [1, 3, 5, 7, 9]))
