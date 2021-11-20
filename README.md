# 纸片
该项目灵感来源于网络流行发广场投放纸片相亲
## 项目前设置
克隆本项目后请输入一下指令来更新本项目支持库
```
npm install
```
然后修改```vue.config```下面的
```
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1/houduan',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api': ''//重写,
                }
            }
        }
    }

```
target地址对应相应的php后端地址


### 项目介绍
 用户登录&注册
    进行登录和注册配置，注册默认最高密码安全等级
    ![image](https://user-images.githubusercontent.com/80571808/142711752-68634398-7e9e-4ad3-b087-304c7ea4b805.png)
  投纸
    默认登录后才能进行操作
    ![image](https://user-images.githubusercontent.com/80571808/142711792-e8ad48a4-c877-4e14-84c5-9330c3afcf7d.png)
    投纸只支持文字不支持表情和其他代码。
  查看投纸
    默认登录后才能进行操作
 ![image](https://user-images.githubusercontent.com/80571808/142711860-d3a336a4-7d69-43ce-8af0-555c140371f7.png)
 查看自己投放的纸片，以及这张纸片被谁看到了！
 捡纸
    默认登录后才能进行操作
 ![image](https://user-images.githubusercontent.com/80571808/142711887-487ea9a1-219b-4d7d-80ca-d2cad18f06b2.png)
 随机抽取一张未被查看的纸条进行查看，若全部查看即返回无纸条查看。
 我的捡纸
 ![image](https://user-images.githubusercontent.com/80571808/142711911-1d7865bc-cb5e-4452-bce5-7ed9dfccb5cf.png)
 查看自己投放的纸片，以及这张纸片是谁发送的！

### 对接后端
1.将houduan文件内的上传到网站，并修改项目设置内容！
2.将houduan中的.db后缀文件导入到服务器内.

