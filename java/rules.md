# Java语法规则

## 一、继承

- 子类自动获得了父类的所有字段，严禁定义与父类重名的字段
- 子类无法访问父类的private字段或者private方法
- 用protected修饰的字段可以被子类访问
- protected关键字可以把字段和方法的访问权限控制在继承树内部
- 子类引用父类的字段时，可以用super.fieldName
- 任何class的构造方法，第一行语句必须是调用父类的构造方法。如果没有明确地调用父类的构造方法，编译器会帮我们自动加一句super()
- 如果父类没有默认的构造方法，子类就必须显式调用super()并给出参数以便让编译器定位到父类的一个合适的构造方法
- 子类不会继承任何父类的构造方法
- 使用`final`修饰的类不能被继承
- 使用`sealed`修饰的类能被指定的类名继承: `sealed class Shape permits Rect, Circle, Triangle`(Java>=15)

