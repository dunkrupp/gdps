GDPS Citations Discord Bot
===

 
Schema
---

##### Offenders
```
cid         name        type        notnull     dflt_value  pk        
----------  ----------  ----------  ----------  ----------  ----------
0           id          integer     1                       1         
1           name        text        1                       0         
2           alliance    text        0           NULL        0         
3           created_at  datetime    1           current_ti  0         
4           updated_at  datetime    1           current_ti  0         
5           deleted_at  datetime    0                       0
``` 


##### Citations
```
cid         name        type        notnull     dflt_value  pk        
----------  ----------  ----------  ----------  ----------  ----------
0           id          integer     1                       1         
1           offender_i  integer     1                       0         
2           note        text        0           NULL        0         
3           created_at  datetime    1           current_ti  0         
4           updated_at  datetime    1           current_ti  0         
5           deleted_at  datetime    0                       0 
```


Install
---
```shell
# Create && Setup Database
npm run setup

# Run Tests and Standards
npm run test

# Run Bot
node index.js
```