function solution(users, emoticons) {
    const sales = [10, 20, 30, 40];
    let answer = [0, 0];
    
    const dfs = (emoticonIdx, sale, user_price, user_sign) => {
        if (emoticonIdx >= emoticons.length) {
            const sign_count = user_sign.reduce((p, n) => n ? p + 1 : p, 0);
            const total_price = user_price.reduce((p, n) => p + n, 0);
            
            if (
                answer[0] < sign_count ||
                answer[0] === sign_count && answer[1] < total_price
            ) {
                answer = [sign_count, total_price];
            }
            return;
        }
        if (emoticonIdx > -1) {
            for (let i = 0; i < users.length; i++) {
                const [user_sale, user_money] = users[i];

                if (!user_sign[i] && sale >= user_sale) {
                    user_price[i] += Math.round(emoticons[emoticonIdx] * (100 - sale) / 100)
                }
                if (user_price[i] >= user_money) {
                    user_price[i] = 0;
                    user_sign[i] = true;
                }
            }
        }

        for (let sale_ of sales) {
            dfs(emoticonIdx + 1, sale_, [...user_price], [...user_sign]);
        }
        
    }
    
    dfs(-1, 0, Array(users.length).fill(0), Array(users.length).fill(false))
    
    return answer;
}