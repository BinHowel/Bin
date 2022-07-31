/**
 * @author ShuHao 
 * @Date 22.07.26
 * @description 轮播图及导航滑块控制
 */

/**
 * 滑块控制
 * 
 */
function normalSlider(){
	let navItems = document.querySelectorAll('.nav-item'); 	//导航体
	let slider = document.querySelector('.slider');		   //滑块
	
	navItems.forEach((item,index,arr) =>{
		item.onmouseover = function(){
			slider.style.left = index * 140 + 10 + "px";
		}
	}) 	
}
normalSlider();


/**
 *	轮播图 
 *
 */
var indexOfSwiper = 0;										//轮播图Index
var imgs = document.querySelectorAll('.img-list > img');	//轮播图片个体
var imgList = document.querySelector(".img-list");			//轮播图片集

/*右滑动*/
function SwiperToRight(){
	ActiveSelect();
	imgList.style.right = indexOfSwiper * 100 + "vh";
	indexOfSwiper++;
	indexOfSwiper = indexOfSwiper%(imgs.length);			//计算轮播图index
}
/*左滑动*/
function SwiperToLeft(){
	if(indexOfSwiper-1 >= 0){
		indexOfSwiper--;
	}else{
		indexOfSwiper = 4;
	}
	ActiveSelect();
	imgList.style.right = indexOfSwiper* 100 + "vh";
}


var selectList = document.querySelectorAll(".select");		//轮播图选择
/*激活选择样式*/
function ActiveSelect(){
	selectList[indexOfSwiper].classList.add("active");
	selectList.forEach((item,index,arr) =>{
		
		if(index != indexOfSwiper){
			item.classList.remove("active");
		}
		
	})	
}
/*点选激活选择样式*/
function ClickSelect(){
	selectList.forEach((item,index,arr) =>{
		item.onclick = function(data){
			var index = data.target.getAttribute("index");
			imgList.style.right = index * 100 + "vh";
			
			selectList.forEach((item,index,arr) =>{
				item.classList.remove("active");
			})	
			
			selectList[index].classList.add("active");
			indexOfSwiper = index;
		}
	})
	
}
ClickSelect();

/*绑定点击监听*/
var Right = document.querySelector(".right");
var Left = document.querySelector(".left");
Right.addEventListener("click", SwiperToRight);
Left.addEventListener("click", SwiperToLeft);




/*自动轮播 及 鼠标停留监听 设置*/
var autoSwiper = setInterval(SwiperToRight, 2000);	//自动轮播: 2s执行一次右滑动
var mouseFlag = document.querySelector(".swiper");  //轮播图

mouseFlag.addEventListener("mouseenter", () => {
	clearInterval(autoSwiper);
});
mouseFlag.addEventListener("mouseleave", () => {
	clearInterval(autoSwiper);
	autoSwiper = setInterval(SwiperToRight, 2000);
});
