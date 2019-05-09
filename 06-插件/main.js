require.config({
	baseUrl: "./libs",
	paths: {
		text: "text",
		domReady: "domReady",
		i18n: "i18n",
		data: "../js/maizuo",
		At: "artTemplate"
	}
})

require(["text!../modules/films.html","data","At","domReady"], function(text,data,At,domReady){
	domReady(function(){
		console.log("dom节点加载完成后执行")
		// console.log(text);	//模板
		// console.log(data);	//数据
		let myHtml = At.render(text,data.data);
		document.getElementById("container").innerHTML = myHtml;
		
		// 绑定下拉框选择语言
		document.querySelector("#lang").onchange = function(){
			
			// 对应获取语言资源包(形参data对应语言的数据)
			require([`i18n!../nls/${this.value}/maizuo`],function(data){
				
				// 将更新的语言数据渲染到模板
				// let newHtml = At.render(text,data.jsonData.data);
				
				let newHtml = At.compile(text)(data.jsonData.data);
				document.getElementById("container").innerHTML = newHtml;
			})
		}
		
	})
})