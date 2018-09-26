##MySql帮助文档

####导出数据字典

```mysql
SELECT
	TABLE_SCHEMA AS '数据库名',
	TABLE_NAME AS '表名',
	COLUMN_NAME AS '列名',
	COLUMN_TYPE AS '数据类型',
	COLUMN_COMMENT AS '注释'
FROM
	information_schema.COLUMNS
WHERE
	TABLE_SCHEMA = 'cms-circle-manage' #替换为数据库名称
```

####关联查询

```mysql
SELECT
	a.create_time,
	c.mobile,
	c.address,
	c.store_id,
	c.store_name
FROM
	goods_demand_response a
INNER JOIN store c ON (a.user_id=c.store_id or a.user_id=c.user_id)
WHERE
	a.demand_id = '200360246177300480'
```