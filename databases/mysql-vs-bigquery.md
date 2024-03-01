# MySQL 与 BigQuery 在查询使用上的一些区别

## 日期类函数

MySQL支持的一些日期函数在 BigQuery中不可用，例如: `NOW()`, `UNIX_TIMESTAMP(timestamp?: string)`:

```sql
SELECT CURRENT_TIMESTAMP() AS now, CURRENT_DATE() AS today, UNIX_TIMESTAMP() AS now_unix, UNIX_TIMESTAMP(CONCAT(CURRENT_DATE(), ' 00:00:00')) AS today_unix;
```

| now | today | now_unix | today_unix |
| --- | ----- | ------- | ---------- |
| 2022-01-17 02:11:02 | 2022-01-17 | 1642385462 | 1642377600 |

MySQL中的 `NOW()` 和 `CURRENT_TIMESTAMP()` 返回的内容一样，在 `BigQuery` 中仅支持 `CURRENT_TIMESTAMP()`

`BigQuery` 中 支持的日期函数有:

- `CURRENT_TIMESTAMP()`
- `CURRENT_DATE()`
- `UNIX_SECONDS(CURRENT_TIMESTAMP())`
- `TIMESTAMP()`

不支持的日期函数有:

- `NOW()`
- `UNIX_TIMESTAMP(timestamp?: string)`

```sql
SELECT
  CURRENT_TIMESTAMP() AS now_timestamp,
  CURRENT_DATE() AS date_today,
  UNIX_SECONDS(CURRENT_TIMESTAMP()) AS unix_now,
  UNIX_SECONDS(TIMESTAMP(CURRENT_DATE())) AS unix_today
```

| now_timestamp | date_today | unix_now | unix_today |
| ------------- | ---------- | -------- | ---------- |
| 2022-01-17 02:28:33.708768 UTC | 2022-01-17 | 1642386513 | 1642377600 |
