// 定义一个 AOP 工具对象
var AOP = {
    // before 方法：在原函数执行前插入逻辑
    before: function (originalFn, beforeFn) {
        // 返回一个新的函数，包装原函数
        return function () {
            // 将 arguments 转为数组
            var args = [];
            for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }

            // 执行前置逻辑
            beforeFn.apply(this, args);
            // 执行原函数
            return originalFn.apply(this, args);
        };
    },

    // after 方法：在原函数执行后插入逻辑
    after: function (originalFn, afterFn) {
        return function () {
            var args = [];
            for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }

            // 执行原函数并保存结果
            var result = originalFn.apply(this, args);
            // 执行后置逻辑
            afterFn.apply(this, args);
            return result;
        };
    },

    // around 方法：用一个函数完整包裹原函数
    around: function (originalFn, aroundFn) {
        return function () {
            var args = [];
            for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }

            // 把 originalFn 和参数一起传给 aroundFn
            return aroundFn.apply(this, [originalFn].concat(args));
        };
    }
};

// 示例：定义一个目标函数
function sayHello(name) {
    console.log("Hello, " + name);
}

// 定义前置逻辑
function logBefore(name) {
    console.log("Before: going to greet " + name);
}

// 定义后置逻辑
function logAfter(name) {
    console.log("After: greeted " + name);
}

// 使用 AOP 将前后逻辑包裹到 sayHello 函数中
var enhancedSayHello = AOP.before(sayHello, logBefore);
enhancedSayHello = AOP.after(enhancedSayHello, logAfter);

// 调用增强后的函数
enhancedSayHello("Alice");
