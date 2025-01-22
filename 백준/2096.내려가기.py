import sys

input = sys.stdin.read
data = input().strip().split("\n")

N = int(data[0])
lines = data[1:]

max_vals = [0, 0, 0]
min_vals = [0, 0, 0]

for line in lines:
    nums = list(map(int, line.split()))
    max_vals = [
        nums[0] + max(max_vals[0], max_vals[1]),
        nums[1] + max(max_vals[0], max_vals[1], max_vals[2]),
        nums[2] + max(max_vals[1], max_vals[2])
    ]
    min_vals = [
        nums[0] + min(min_vals[0], min_vals[1]),
        nums[1] + min(min_vals[0], min_vals[1], min_vals[2]),
        nums[2] + min(min_vals[1], min_vals[2])
    ]

print(f"{max(max_vals)} {min(min_vals)}")
