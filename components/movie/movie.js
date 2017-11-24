var movie=Vue.extend({
    template:'#movie',
    data:function(){
        return{
            // name:['','','','','大灌篮','叶问2','狼牙','','遗落战境','地狱究竟有几层','上车，走吧','八月','建军大业','','','罪恶终结者','南口1937','智取威虎山','','','','','反贪风暴','','','','','','走出尘埃','三缺一'],
            url:'http://localhost:18080/user/',
            chineseMovie:[{name:'大话西游之月光宝盒',isLike:false},{name:'大话西游之仙履奇缘',isLike:false},{name:'让子弹飞',isLike:false},{name:'菊豆',isLike:false}],
            outMovie:[{name:'阿甘正传',isLike:false},{name:'猩球崛起',isLike:false},{name:'暮光之城',isLike:false},{name:'诸神之怒',isLike:false}],
            funMovie:[{name:'举起手来',isLike:false},{name:'举起手来二之追击阿多丸',isLike:false},{name:'武状元苏乞儿',isLike:false},{name:'制服',isLike:false}],
            oldMovie:[{name:'画皮',isLike:false},{name:'鸿门宴',isLike:false},{name:'宫锁沉香',isLike:false},{name:'神话',isLike:false}],
            like:[],
            move:false,
            showWhat:'',
        }
    },
    created:function(){
        if(window.localStorage.length!==0){
            this.getMovie()
        }
    },
    methods:{
        getMovie:function(){
            var userName=window.localStorage.userName;
            axios({
                url:this.url+'getMovie',
                methods:'get',
                params:{'userName':userName}
            }).then(function(result){
                var arr=[];
                for(var i in result.data[0]){
                    arr.push(result.data[0][i]);
                };
                this.like=arr.slice(7);
                for(var i=0;i<this.chineseMovie.length;i++){
                    for(var j=0;j<this.like.length;j++){
                        if(this.chineseMovie[i].name==this.like[j])
                            this.chineseMovie[i].isLike=true
                    }
                };
                for(var i=0;i<this.outMovie.length;i++){
                    for(var j=0;j<this.like.length;j++){
                        if(this.outMovie[i].name==this.like[j])
                            this.outMovie[i].isLike=true
                    }
                };
                for(var i=0;i<this.funMovie.length;i++){
                    for(var j=0;j<this.like.length;j++){
                        if(this.funMovie[i].name==this.like[j])
                            this.funMovie[i].isLike=true
                    }
                };
                for(var i=0;i<this.oldMovie.length;i++){
                    for(var j=0;j<this.like.length;j++){
                        if(this.oldMovie[i].name==this.like[j])
                            this.oldMovie[i].isLike=true
                    }
                };
            }.bind(this)).catch(function(err){console.log(err)})
        },
        toMove:function(i,num){
            this.move=!this.move;
            this.showWhat=num+'-'+i;
        },
        noMove:function(){
            this.move=!this.move;
            this.showWhat=''
        },
        goMove:function(i,num){
            this.move=true;
            this.showWhat=num+'-'+i;
        },
        deepCopy:function(obj1,obj2){
			for(var p in obj1){
				if(Array.isArray(obj1[p]))
					obj2[p]=obj1[p].slice(0);
				else if(obj1[p]!=null&&(typeof obj1[p]=='object')){
					obj2[p]={};
					arguments.callee(obj1[p],obj2[p]);
				}else
					obj2[p]=obj1[p];
			}
		},
        delLike:function(name,num){
            if(localStorage.length==0){
                alert('请登录后再进行操作')
            }else{
                var newLike=[];
                var data={}
                this.deepCopy(this.like,newLike);
                for(var i=0;i<newLike.length;i++){
                    if(newLike[i]==name){
                        newLike.splice(i,1)
                    };
                };
                for(var j=0;j<newLike.length;j++){
                    data['movie'+(j+1)]=newLike[j]
                };
                if(data=={}){
                    data.movie1=name;
                    data.onlyDel='true';
                }
                data.userName=window.localStorage.userName;
                data.num=newLike.length+1;
                axios({
                    url:this.url+'delLike',
                    method:'get',
                    params:data
                }).then(function(result){
                    this.like=newLike;
                    this.chineseMovie[num].isLike=false;
                }.bind(this)).catch(function(err){
                    console.log(err)
                })
            }
        },
        addLike:function(name,num){
            if(localStorage.length==0){
                alert('请登录后再进行操作')
            }else{
                var newLike=[];
                var data={}
                this.deepCopy(this.like,newLike);
                newLike.push(name);
                for(var j=0;j<newLike.length;j++){
                    data['movie'+(j+1)]=newLike[j]
                };
                data.userName=window.localStorage.userName;
                axios({
                    url:this.url+'addLike',
                    method:'get',
                    params:data
                }).then(function(result){
                    this.like=newLike;
                    this.chineseMovie[num].isLike=true;
                }.bind(this)).catch(function(err){
                    console.log(err)
                })
            }
        },
        delLike2:function(name,num){
            if(localStorage.length==0){
                alert('请登录后再进行操作')
            }else{
                var newLike=[];
                var data={}
                this.deepCopy(this.like,newLike);
                for(var i=0;i<newLike.length;i++){
                    if(newLike[i]==name){
                        newLike.splice(i,1)
                    };
                };
                for(var j=0;j<newLike.length;j++){
                    data['movie'+(j+1)]=newLike[j]
                };
                if(data=={}){
                    data.movie1=name;
                    data.onlyDel='true';
                }
                data.userName=window.localStorage.userName;
                data.num=newLike.length+1;
                axios({
                    url:this.url+'delLike',
                    method:'get',
                    params:data
                }).then(function(result){
                    this.like=newLike;
                    this.outMovie[num].isLike=false;
                }.bind(this)).catch(function(err){
                    console.log(err)
                })
            }
        },
        addLike2:function(name,num){
            if(localStorage.length==0){
                alert('请登录后再进行操作')
            }else{
                var newLike=[];
                var data={}
                this.deepCopy(this.like,newLike);
                newLike.push(name);
                for(var j=0;j<newLike.length;j++){
                    data['movie'+(j+1)]=newLike[j]
                };
                data.userName=window.localStorage.userName;
                axios({
                    url:this.url+'addLike',
                    method:'get',
                    params:data
                }).then(function(result){
                    this.like=newLike;
                    this.outMovie[num].isLike=true;
                }.bind(this)).catch(function(err){
                    console.log(err)
                })
            }
        },
        delLike3:function(name,num){
            if(localStorage.length==0){
                alert('请登录后再进行操作')
            }else{
                var newLike=[];
                var data={}
                this.deepCopy(this.like,newLike);
                for(var i=0;i<newLike.length;i++){
                    if(newLike[i]==name){
                        newLike.splice(i,1)
                    };
                };
                for(var j=0;j<newLike.length;j++){
                    data['movie'+(j+1)]=newLike[j]
                };
                if(data=={}){
                    data.movie1=name;
                    data.onlyDel='true';
                }
                data.userName=window.localStorage.userName;
                data.num=newLike.length+1;
                axios({
                    url:this.url+'delLike',
                    method:'get',
                    params:data
                }).then(function(result){
                    this.like=newLike;
                    this.funMovie[num].isLike=false;
                }.bind(this)).catch(function(err){
                    console.log(err)
                })
            }
        },
        addLike3:function(name,num){
            if(localStorage.length==0){
                alert('请登录后再进行操作')
            }else{
                var newLike=[];
                var data={}
                this.deepCopy(this.like,newLike);
                newLike.push(name);
                for(var j=0;j<newLike.length;j++){
                    data['movie'+(j+1)]=newLike[j]
                };
                data.userName=window.localStorage.userName;
                axios({
                    url:this.url+'addLike',
                    method:'get',
                    params:data
                }).then(function(result){
                    this.like=newLike;
                    this.funMovie[num].isLike=true;
                }.bind(this)).catch(function(err){
                    console.log(err)
                })
            }
        },
        delLike4:function(name,num){
            if(localStorage.length==0){
                alert('请登录后再进行操作')
            }else{
                var newLike=[];
                var data={}
                this.deepCopy(this.like,newLike);
                for(var i=0;i<newLike.length;i++){
                    if(newLike[i]==name){
                        newLike.splice(i,1)
                    };
                };
                for(var j=0;j<newLike.length;j++){
                    data['movie'+(j+1)]=newLike[j]
                };
                if(data=={}){
                    data.movie1=name;
                    data.onlyDel='true';
                }
                data.userName=window.localStorage.userName;
                data.num=newLike.length+1;
                axios({
                    url:this.url+'delLike',
                    method:'get',
                    params:data
                }).then(function(result){
                    this.like=newLike;
                    this.oldMovie[num].isLike=false;
                }.bind(this)).catch(function(err){
                    console.log(err)
                })
            }
        },
        addLike4:function(name,num){
            if(localStorage.length==0){
                alert('请登录后再进行操作')
            }else{
                var newLike=[];
                var data={}
                this.deepCopy(this.like,newLike);
                newLike.push(name);
                for(var j=0;j<newLike.length;j++){
                    data['movie'+(j+1)]=newLike[j]
                };
                data.userName=window.localStorage.userName;
                axios({
                    url:this.url+'addLike',
                    method:'get',
                    params:data
                }).then(function(result){
                    this.like=newLike;
                    this.oldMovie[num].isLike=true;
                }.bind(this)).catch(function(err){
                    console.log(err)
                })
            }
        },
    },
})
Vue.component('movie',movie)