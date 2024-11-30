const Introduction = {
    // descriptions是装备描述 austerity是类别 dice是点数 quantities是数量 harm是伤害 Category函数调用 trigger是触发条件 例如3可以触发锁定骰子 trigger_
    "剑": { descriptions: "造成□伤害", trigge: 0, austerity: 3, dice: '', quantities: 1, harm: '□', Category: ['造成'] },
    "匕首": { descriptions: "[1-3]造成□伤害", trigge: 0, austerity: 1, dice: '1-3', quantities: 9, harm: '□', Category: ['造成'] },
    "回旋镖": { descriptions: "造成□*2伤害,自身受到□伤害", trigge: 0, austerity: 3, dice: '', quantities: 1, harm: '□*2', Category: ['造成', '自身'] },
    "火球": { descriptions: "[偶数]造成□伤害,燃烧1个骰子", trigge: 0, austerity: 2, dice: '偶数', quantities: 1, harm: '□', Category: ['造成', '燃烧'] },
    "冰晶": { descriptions: "[奇数]造成□伤害,冰冻1个骰子", trigge: 0, austerity: 2, dice: '奇数', quantities: 1, harm: '□', Category: ['造成', '冰冻'] },
    "诅咒": { descriptions: "[1]造成□+1伤害,施加1层诅咒", trigge: 0, austerity: 0, dice: 1, quantities: 1, harm: '□+1', Category: ['造成', '诅咒'] },
    "毒气": { descriptions: "[3]施加4层中毒", trigge: 0, austerity: 0, dice: 3, quantities: 1, harm: '□+1', Category: ['中毒'] },
    "治愈": { descriptions: "[1-3]回复□生命值", trigge: 0, austerity: 1, dice: '1-3', quantities: 1, harm: '□', Category: ['回复'] },
    "盾牌": { descriptions: "[1-4]获得□点护盾", trigge: 0, austerity: 1, dice: '1-4', quantities: 1, harm: '□', Category: ['护盾'] },
    "复制": { descriptions: "[4-6]复制1个骰子", trigge: 0, austerity: 1, dice: '4-6', quantities: 1, harm: '□', Category: ['复制'] },
    "锤": { descriptions: "颠倒1个骰子", trigge: 0, austerity: 3, dice: '', quantities: 1, harm: '□', Category: ['颠倒'] },
    "绝佳手气": { descriptions: "[1-5]重投1个点数更大的骰子", trigge: 0, austerity: 1, dice: '1-5', quantities: 1, harm: '□', Category: ['重投更大'] },
    "战斗翻滚": { descriptions: "重投1个骰子", trigge: 0, austerity: 3, dice: '', quantities: 3, harm: '□', Category: ['重投'] },
    "吸血": { descriptions: "[1-4]造成□伤害,回复□生命值", trigge: 0, austerity: 1, dice: '1-4', quantities: 1, harm: '□', Category: ['造成', '回复'] },
};
const dices = {
    '1': './image/dice/dice_1.png',
    '2': './image/dice/dice_2.png',
    '3': './image/dice/dice_3.png',
    '4': './image/dice/dice_4.png',
    '5': './image/dice/dice_5.png',
    '6': './image/dice/dice_6.png',
};
const debuff = {
    "诅咒": "./image/debuff/诅咒.png",
    "燃烧": "./image/debuff/燃烧.png",
    "冰冻": "./image/debuff/冰冻.png",
    "护盾": "./image/debuff/护盾.png",
    "中毒": "./image/debuff/中毒.png"
}
const equipment = {
    "匕首": "./image/skill/匕首.png",
    "冰晶": "./image/skill/冰晶.png",
    "锤": "./image/skill/锤.png",
    "毒气": "./image/skill/毒气.png",
    "盾牌": "./image/skill/盾牌.png",
    "回旋镖": "./image/skill/回旋镖.png",
    "火球": "./image/skill/火球.png",
    "剑": "./image/skill/剑.png",
    "绝佳手气": "./image/skill/绝佳手气.png",
    "吸血": "./image/skill/吸血.png",
    "战斗翻滚": "./image/skill/战斗翻滚.png",
    "治愈": "./image/skill/治愈.png",
    "复制": "./image/skill/复制.png",
    "诅咒": "./image/skill/诅咒.png",
}
class Player {
    constructor(name) {
        this.name = name;
        this.hp = 50; // 玩家血量
        this.dice = rollDice(5); // [⚀,⚁,⚂,⚃,⚄,⚅]
        this.skills = generateRandomSkillSet(); //技能列表[]
        this.skill = { [this.skills[0]]: Introduction[this.skills[0]].quantities, [this.skills[1]]: Introduction[this.skills[1]].quantities, [this.skills[2]]: Introduction[this.skills[2]].quantities, [this.skills[3]]: Introduction[this.skills[3]].quantities, [this.skills[4]]: Introduction[this.skills[4]].quantities }; // 技能{}
        this.status = { "燃烧": 0, "冰冻": 0, "中毒": 0, "诅咒": 0, "护盾": 0 };
    }
    async 颠倒(player, dice, harm = '') {
        const sum = String(7 - Number(dice))
        const dices = this.dice;
        dices?.push(sum);
        this.dice = dices;
        return `骰子点数变为${sum}`
    }
    async 轻顶(player, dice, harm = '') {
        const new_hanrm = eval(harm.replace("□", String(dice)));
        const dices = this.dice;
        dices?.push(new_hanrm);
        this.dice = dices;
        return `将骰子转为${new_hanrm}点`
    }
    async 重投更大(player, dice, harm = '') {
        const sum = String(random.int((Number(dice) + 1), 6));
        const dices = this.dice;
        dices?.push(sum);
        this.dice = dices;
        return `重投更大骰子${sum}点`
    }
    async 重投(player, dice, harm = '') {
        const sum = String(random.int(1, 6));
        const dices = this.dice;
        dices?.push(sum);
        this.dice = dices
        return `重投骰子${sum}点`
    }
    async 复制(player, dice, harm = '') {
        const new_hanrm = eval(harm.replace("□", String(dice)));
        const dices = this.dice;
        dices.push(new_hanrm)
        this.dice = dices;
        return `复制了一个骰子`
    }
    async 诅咒(player, dice, harm = '') {
        this.status['诅咒'] += 1;
        return `施加状态：诅咒*1`
    }
    async 燃烧(player, dice, harm = '') {
        this.status['燃烧'] += 1;
        return `施加状态：燃烧*1`
    }
    async 护盾(player, dice, harm = '') {
        const new_hanrm = eval(harm.replace("□", String(dice)));
        this.shield += new_hanrm;
        return `施加状态：护盾*${new_hanrm}`
    }
    async 冰冻(player, dice, harm = '') {
        this.freeze += 1;
        return `施加状态：冰冻*1`
    }
    async 中毒(player, dice, harm = '') {
        const new_hanrm = eval(harm.replace("□", dice));
        this.status['中毒'] += 4;
        return `施加状态：中毒*${new_hanrm}`
    }
    async 回复(player, dice, harm = '') {
        const dice_player = await ctx.database.get('dice_player', { userId });
        const a = Number(dice) + this.hp;
        this.hp = (a >= 50 ? 50 : a);
        return `回复${dice}生命值\n`
    }
    async 造成(player, dice, harm = '') {
        const new_hanrm = eval(harm.replace("□", dice));
        if (Number(player.shield) <= 0 || !dice_player_2?.[0]?.shield) {
            player.hp -= Number(new_hanrm);
            return `造成${new_hanrm}伤害`
        } else {
            return await this.护盾判定(player, new_hanrm)
        }
    }
    async 自身(player, dice, harm = '') {
        // const new_hanrm = eval(harm.replace("□",Number(dice)));
        if (Number(this.shield) <= 0 || !this.shield) {
            await ctx.database.set('dice_player', { userId }, { hp: this.hp - dice })
            return `自身受到${dice}伤害`
        } else {
            return await 护盾判定(player, userId, dice)
        }
    }
    // async函数，用于护盾判定
    async 护盾判定(player, harm) {
        // 如果玩家护盾大于等于伤害，则减少玩家护盾，并返回减少的护盾
        if (player.status["护盾"] > harm) {
            player.status['护盾'] -= harm;
            return `护盾抵挡${harm}伤害`
        } else {
            player.status['护盾'] -= 0;
            player.hp -= (harm - player.status['护盾'])
            // 如果玩家护盾小于等于伤害，则减少玩家血量，并返回减少的血量
            return `护盾抵挡${dice_player?.[0]?.shield}伤害,承受了${(harm - dice_player?.[0]?.shield)}伤害`
        }
    }
}
function rollDice(numDice) {
    const diceRolls = [];
    for (let i = 0; i < numDice; i++) {
        diceRolls.push(Math.floor(Math.random() * 6) + 1); // 生成1到6之间的随机整数
    }
    return diceRolls;
}
// 生成装备
function generateRandomSkillSet() {
    const outfit = ["剑", "匕首", "回旋镖"];
    const Attributes = ["毒气", "火球", '吸血', "冰晶", "诅咒"];
    const Defence = ["治愈", "盾牌"];
    const Auxiliary = ["绝佳手气", "锤"];
    const unusual = ["战斗翻滚"];
    function getRandomElement(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
    const randomOutfit = getRandomElement(outfit);
    const randomAttributes = getRandomElement(Attributes);
    const randomDefence = getRandomElement(Defence);
    const randomAuxiliary = getRandomElement(Auxiliary);
    const randomUnusual = getRandomElement(unusual);
    const newSkillSet = [randomOutfit, randomAttributes, randomDefence, randomAuxiliary, randomUnusual];
    return newSkillSet;
}
// async函数，用于状态判定
async function 状态判定(ctx, userId) {
    // 获取玩家状态
    const dice_player = await ctx.database.get('dice_player', { userId });
    // 获取玩家骰子
    const dices = dice_player?.[0]?.dice;
    // ["燃烧":"burn","冰冻": "freeze","中毒": "poison", "诅咒":"curse","护盾":"shield"]
    if (dice_player?.[0]?.freeze >= 1) {
        // 如果玩家冰冻大于等于1，则从0开始删除dice个骰子，也就是冰冻
        const a = dices.map((element, index) => (index < dice_player?.[0]?.freeze ? 1 : element));
        await ctx.database.set('dice_player', { userId }, { dice: a, freeze: dice_player?.[0]?.freeze - 1 })
        return `冰冻${dice_player?.[0]?.freeze}骰子`
    } else if (dice_player?.[0]?.poison >= 1) {
        await ctx.database.set('dice_player', { userId }, { hp: dice_player?.[0]?.hp - dice_player?.[0]?.poison, poison: dice_player?.[0]?.poison - 1 })
        return `中毒 血量-${dice_player?.[0]?.poison}`
    } else {
        // 否则返回空
        return ''
    }
}
/**
 * 骰子判断
 * @param {number} Decision 骰子判断条件
 * @param dice_a 玩家骰子
 * @param dice_b 约束骰子
 */
async function Dice_Decision(Decision, dice_a, dice_b) {
    // Decision说明：0 表示只能投出指定点数的骰子，例如 [1] 表示只能投出点数为 1 的骰子;
    // 1 表示只能投出指定范围内的点数，如 [1-5] 表示只能投出点数在 1 到 5 之间的骰子;
    // 2 表示只能投出奇数或偶数的点数，例如 [奇数] [偶数] 表示只能投出奇数或偶数的点数;
    // 3代表无任何约束只需要任意点数即可.
    if (Decision == 0 && dice_a == dice_b) {
        return true;
    } else if (Decision == 1 && Number(dice_a) >= Number(dice_b.split('-')[0]) && Number(dice_a) <= Number(dice_b.split('-')[1])) {
        return true;
    } else if (Decision == 2 && dice_b == '偶数' && dice_a % 2 == 0) {
        return true;
    } else if (Decision == 2 && dice_b == '奇数' && dice_a % 2 == 1) {
        return true;
    } else if (Decision == 3) {
        return true;
    } else {
        return false;
    }
}
// window.onload = function () {

// }

// 定义一个函数来添加图片和事件处理
function Add_images(cellNames, imageValues, groupName) {
    cellNames.forEach((name, index) => {
        var cell = document.querySelector('td[name="' + name + '"]');
        if (cell && imageValues[index]) {
            var overlayDiv = document.createElement('div');
            overlayDiv.className = 'overlay';
            var overlayImg = document.createElement('img');
            overlayImg.src = (groupName === 'dice' ? dices : equipment)[imageValues[index]];
            overlayImg.id = imageValues[index];
            overlayImg.style.width = '50px';
            overlayImg.style.height = '50px';
            overlayImg.isClicked = false;

            overlayImg.addEventListener('click', function (e) {
                // 切换点击状态
                this.isClicked = !this.isClicked;
                this.style.filter = this.isClicked ? 'brightness(1.3)' : 'brightness(1)';
            });

            overlayImg.addEventListener('mouseover', function (e) {
                if (!this.isClicked && groupName !== 'dice') {
                    this.style.filter = 'brightness(1.3)';
                    showTipImage(e.pageX + 10, e.pageY - 160, './image/tips/' + this.id + '.png');
                } else if (!this.isClicked) {
                    this.style.filter = 'brightness(1.3)';
                }
            });

            overlayImg.addEventListener('mouseout', function () {
                if (!this.isClicked) {
                    this.style.filter = 'brightness(1)';
                    removeTipImage();
                }
            });

            overlayDiv.appendChild(overlayImg);
            cell.appendChild(overlayDiv);
        }
    });
}

function showTipImage(x, y, src) {
    var tipImg = document.querySelector('.tip-image');
    if (!tipImg) {
        tipImg = document.createElement('img');
        tipImg.className = 'tip-image';
        document.body.appendChild(tipImg);
    }
    tipImg.src = src;
    tipImg.style.display = 'block';
    tipImg.style.left = x + 'px';
    tipImg.style.top = y + 'px';
}

function removeTipImage() {
    var tipImg = document.querySelector('.tip-image');
    if (tipImg) {
        tipImg.style.display = 'none';
    }
}

function typeText(element, text, typingDelay = 100) {
    let index = 0;
    let currentText = '';

    function typeNextChar() {
        if (index < text.length) {
            currentText += text.charAt(index);
            index++;

            // 检查是否遇到了 <br>
            if (text.substring(index - 6, index) === '<br>') {
                currentText += '<br>';
                element.innerHTML = currentText;
                setTimeout(typeNextChar, typingDelay * 2); // 增加延迟以模拟换行效果
            } else {
                element.innerHTML = currentText;
                setTimeout(typeNextChar, typingDelay);
            }
        } else {
            element.innerHTML = currentText; // 确保最后一个字符也被添加
        }
    }

    typeNextChar();
}

// 假设 Add_images 是一个已经定义好的函数

const battleTd = document.querySelector('td[name="battle"]');
const player_1 = new Player("一");
const player_2 = new Player("二");
const textOverlay = document.createElement('div');
textOverlay.className = 'text-overlay';
battleTd.appendChild(textOverlay);
const message = `
    加载玩家${player_1.name}数据成功<br>
    加载玩家${player_2.name}数据成功<br>
    游戏开始！<br>
    左侧玩家是【玩家一】<br>
    右侧玩家是【玩家二】
  `;
typeText(textOverlay, message, 50); // 50毫秒作为打字速度

setTimeout(function () {
    // const battleTd = document.querySelector('td[name="battle"]');
    const textOverlay = document.createElement('div');
    const text = '这是新添加的文字';
    typeText(textOverlay, text, 50); // 50毫秒作为打字速度
    battleTd.appendChild(newDiv); // 将新创建的 div 添加到 battleTd 中
}, 5000); // 延迟时间是5000毫秒（5秒)

Add_images(['k_1_1', 'k_1_2', 'k_1_3', 'k_1_4', 'k_1_5'], player_1.dice, 'dice');
Add_images(['k_2_1', 'k_2_2', 'k_2_3', 'k_2_4', 'k_2_5'], player_2.dice, 'dice');
Add_images(['k_3_1', 'k_3_2', 'k_3_3', 'k_3_4', 'k_3_5'], player_1.skills, 'skill');
Add_images(['k_4_1', 'k_4_2', 'k_4_3', 'k_4_4', 'k_4_5'], player_2.skills, 'skill');