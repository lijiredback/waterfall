window.onload = function() {
    function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    }

    function getMinBoxIndex(value, array) {
        for (var i in array) {
            if (array[i] == value) {
                return i;
            }
        }
    }

    function waterfall (parent, box) {
        // 1.父盒子居中
        
        // 1.1 拿到父盒子下，所有的子盒子
        var allBox = $(parent).getElementsByClassName(box);
        // 1.2 求出盒子的宽度
        var boxWidth = allBox[0].offsetWidth;
        // 1.3 浏览器的宽度
        var screenWidth = document.body.offsetWidth;
        // 1.4 计算出盒子列，取整数
        var cols = Math.floor(screenWidth / boxWidth);
        // 1.5 父盒子 main 居中显示
        $(parent).style.width = boxWidth * cols + 'px';
        $(parent).style.margin = '0 auto';

        // 2.子盒子定位
        // 2.1 数组保存第一行高度
        var heightArr = [];
        // 2.2 遍历
        for (var i = 0; i < allBox.length; i++) {
            // 2.2.1 求出单个盒子的高度
            var boxHeight = allBox[i].offsetHeight;
            if (i < cols) {
                // 第一行盒子的高度装进数组
                heightArr.push(boxHeight);
            } else {
                // 不是第一行
                // 2.2.2 求出数组中最矮的盒子
                var minBoxHeight = Math.min.apply(this, heightArr);
                // 2.2.3 拿到最矮盒子的脚标
                var minBoxIndex = getMinBoxIndex(minBoxHeight, heightArr);
                console.log(minBoxIndex);
                // 2.2.4 布局定位
                allBox[i].style.position = 'absolute';
                allBox[i].style.top = minBoxHeight + 'px';
                allBox[i].style.left = minBoxIndex * boxWidth + 'px';
                // 2.2.5 更新数组高度
                heightArr[minBoxIndex] += boxHeight;
            }
        }
    }
    waterfall('main', 'box');
};

