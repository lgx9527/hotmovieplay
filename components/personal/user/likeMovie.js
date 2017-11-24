var likeMovie=Vue.extend({
    template:'#likeMovie',
    data:function(){
        return{
            like:[],
            url:'http://localhost:18080/user/',
        }
    },
    created:function(){
        this.getMovie()
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
                console.log(this.like)
            }.bind(this)).catch(function(err){console.log(err)})
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
                this.getMovie()
            }.bind(this)).catch(function(err){
                console.log(err)
            })
        }
    }
})
Vue.component('likeMovie',likeMovie)