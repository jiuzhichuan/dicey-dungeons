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
const overlays = {
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
    "匕首": "./image/匕首.png",
    "冰晶": "./image/冰晶.png",
    "锤": "./image/锤.png",
    "毒气": "./image/毒气.png",
    "盾牌": "./image/盾牌.png",
    "回旋镖": "./image/回旋镖.png",
    "火球": "./image/火球.png",
    "剑": "./image/剑.png",
    "绝佳手气": "./image/绝佳手气.png",
    "吸血": "./image/吸血.png",
    "战斗翻滚": "./image/战斗翻滚.png",
    "治愈": "./image/治愈.png",
    "复制": "./image/复制.png",
    "诅咒": "./image/诅咒.png",
}
// window.onload = function () {
//     function addDiceImages(cellNames, diceValues) {
//         cellNames.forEach((name, index) => {
//             var cell = document.querySelector('td[name="' + name + '"]');
//             if (cell && diceValues[index]) {
//                 var overlayDiv = document.createElement('div');
//                 overlayDiv.className = 'overlay';
//                 var overlayImg = document.createElement('img');
//                 overlayImg.src = equipment[diceValues[index]];
//                 overlayImg.id = diceValues[index];
//                 overlayImg.style.width = '50px';
//                 overlayImg.style.height = '50px';
//                 // 添加点击事件监听器
//                 overlayImg.addEventListener('click', function (e) {
//                     console.log(this.id)
//                     e.stopPropagation(); // 阻止事件冒泡
//                     // 创建提示图片元素
//                     var tipImg = document.createElement('img');
//                     tipImg.src = './image/tips.png';
//                     tipImg.className = 'tip-image';
//                     document.body.appendChild(tipImg);
//                     // 设置提示图片的位置
//                     var x = e.pageX + 10; // 鼠标位置右侧10px
//                     var y = e.pageY + 10; // 鼠标位置下方10px
//                     tipImg.style.left = x + 'px';
//                     tipImg.style.top = y + 'px';
//                     // 显示提示图片
//                     tipImg.classList.add('show-tip');
//                     // 鼠标移开装备图片时移除提示图片
//                     overlayImg.addEventListener('mouseleave', function () {
//                         document.body.removeChild(tipImg);
//                     });
//                 });
//                 overlayDiv.appendChild(overlayImg);
//                 cell.appendChild(overlayDiv);
//             }
//         });
//     }
// };
window.onload = function () {
    function addDiceImages(cellNames, diceValues) {
        cellNames.forEach((name, index) => {
            var cell = document.querySelector('td[name="' + name + '"]');
            if (cell && diceValues[index]) {
                var overlayDiv = document.createElement('div');
                overlayDiv.className = 'overlay';
                var overlayImg = document.createElement('img');
                overlayImg.src = equipment[diceValues[index]];
                overlayImg.id = diceValues[index];
                overlayImg.style.width = '50px';
                overlayImg.style.height = '50px';
                overlayImg.addEventListener('click', function (e) {
                    e.stopPropagation(); // 阻止事件冒泡
                    this.style.filter = 'brightness(1.3)';
                });
                // 鼠标悬停时开始计时
                overlayImg.addEventListener('mouseover', function (e) {
                    // 清除之前的定时器
                    if (this.hoverTimer) {
                        clearTimeout(this.hoverTimer);
                    }
                    // 设置新的定时器，1秒后显示提示图片
                    this.hoverTimer = setTimeout(function () {
                        showTipImage(e.pageX + 10, e.pageY - 160, './image/tips/' + this.id + '.png');
                    }.bind(this), 1000);
                });

                // 鼠标移开时清除定时器并移除提示图片
                overlayImg.addEventListener('mouseout', function () {
                    // 清除定时器
                    if (this.hoverTimer) {
                        clearTimeout(this.hoverTimer);
                    }
                    // 恢复图片原始亮度
                    this.style.filter = 'brightness(1)';
                    removeTipImage();
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
            tipImg.src = src;
            tipImg.className = 'tip-image';
            document.body.appendChild(tipImg);
        }
        tipImg.style.left = x + 'px';
        tipImg.style.top = y + 'px';
        tipImg.classList.add('show-tip');
    }

    function removeTipImage() {
        var tipImg = document.querySelector('.tip-image');
        if (tipImg) {
            tipImg.remove();
        }
    }
    // 调用函数，传入 td 的 name 属性值数组和对应的骰子图片编号数组
    addDiceImages(['k_3_1', 'k_3_2', 'k_3_3', 'k_3_4', 'k_3_5'], ["回旋镖", "冰晶", "盾牌", "锤", "战斗翻滚"]);
    addDiceImages(['k_4_1', 'k_4_2', 'k_4_3', 'k_4_4', 'k_4_5'], ['回旋镖', '诅咒', '治愈', '绝佳手气', '战斗翻滚']);
}
// class Player {

// }