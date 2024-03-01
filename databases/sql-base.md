# SQL 常用语句

## 删除用户

```sql
DELETE FROM table_name WHERE table_column = "column_name";
```

## mysql常用函数

### UPPER、LOWER、UCASE

> 将文本转换为大(小)写, 可用于查询时忽略大小写。(MySQL >= 4.0)

```sql
SELECT * FROM table_name WHERE UPPER(name) LIKE '%ALICE%';
-- UPPER与UCASE等价
SELECT * FROM table_name WHERE UCASE(name) LIKE '%ALICE%';
SELECT * FROM table_name WHERE LOWER(name) LIKE '%alice%';
-- LOWER与LCASE等价
SELECT * FROM table_name WHERE LCASE(name) LIKE '%alice%';
SELECT UPPER(CustomerName) AS UppercaseCustomerName FROM Customers;
```

## 参考链接

- [Mysql函数 - wschool](https://www.w3schools.cn/mysql/mysql_ref_functions.html)
