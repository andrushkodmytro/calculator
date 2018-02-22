	function Calculator(id){
		this.id=id;
		this.initProp();
		this.createDom();
		this.createEvent();

	}
	
	Calculator.prototype.createDom=function(){
		var calc=document.getElementById(this.id);
		if(calc==null) {
			alert('відсутній контенер з заданим id');
		return;
		}
		calc.classList.add('calculator');
		var sqrt=String.fromCharCode(8730);
		var lineButton2=[7,8,9,'/', 'C'];
		var lineButton3=[4,5,6,'*', sqrt];
		var lineButton4=['='];
		var lineButton5=[1,2,3,'-'];
		var lineButton6=[0,'.','+'];
		var lineButton=null;
		for(var i=1; i<=6;i++){
			var divLine=document.createElement('div');
			divLine.classList.add('line');
			calc.appendChild(divLine);
			if(i==1){
				for(var j=1;j<=2;j++){
					var input=document.createElement('input');
					input.setAttribute('type', 'text');
					input.setAttribute('readonly', 'true');
					divLine.appendChild(input);
					if(j==1){
						input.classList.add('top');
					}
					else{
						input.classList.add('bottom');
						input.setAttribute('value',0)
					}
				}
			}
		
		else{
			switch(i){
				case 2:
				lineButton=lineButton2;
				break;
				case 3:
				lineButton=lineButton3;
				break;
				case 4:
				lineButton=lineButton4;
				break;
				case 5:
				lineButton=lineButton5;
				break;
				case 6:
				lineButton=lineButton6;
				break;
			}
			for(var j=0;j<lineButton.length;j++){
				var input=document.createElement('input');
				input.setAttribute('type', 'button');
				divLine.appendChild(input);
				input.value=lineButton[j];
				if(input.value=='=') 
					input.classList.add('equel');
				if(input.value=='0')
					input.classList.add('zero');
			}
			}
		}
		}
		


Calculator.prototype.createEvent=function(){
	var calcSelector='#'+this.id+'.calculator';
	console.log(calcSelector);
	var calc=document.querySelector(calcSelector);
	console.log(calc);
	var topSelector='#'+this.id+' .top';
	var bottomSelector='#'+this.id+' .bottom';
	var top=document.querySelector(topSelector);
	var bottom=document.querySelector(bottomSelector);
	console.log(top);
	console.log(bottom);
	calc.onmouseover=function(event){
		var target=event.target;
		if(target.tagName!=='INPUT') return;
		if(target.getAttribute('type')=='text') return;
		target.classList.add('select');
	}
	calc.onmouseout=function(event){
		var target=event.target;
		target.classList.remove('select')
	}
	var self=this;
	calc.onclick=function(event){
	var target=event.target;
	if(target.tagName!=='INPUT') return;
	if(target.getAttribute('type')=='text') return;
	var btnValue=target.value;
	if(!isNaN(btnValue)){
		self.numberClick( btnValue, bottom);
		return;
		
	}
	if(btnValue=='+'||btnValue=='-'||btnValue=='*'||btnValue==''){
			self.operationClick(btnValue, top, bottom);
			return
		}
	if(btnValue=='='){
			self.equelClick(top, bottom);
			return;
				}	
	if(btnValue=='C'){
		alert('helo');
		self.initProp(top, bottom);
		top.value='';
		bottom.value=0;
		return;
				}	
	if(btnValue=='.'){
		self.pointClick(bottom);
		return
	}
	if(btnValue==String.fromCharCode(8730)){
		self.sqrtClick(top, bottom, btnValue);
		return
	}

	}

}

Calculator.prototype.numberClick=function(btnValue, bottom){
			this.repeatOperation=false;
			if(this.replace||bottom.value=='0'){
				bottom.value=btnValue;
				this.replace=false;
			}
			else{
				bottom.value+=btnValue;
			}

		}

Calculator.prototype.operationClick=function(btnValue, top, bottom){

			if(this.repeatOperation) return;
			this.repeatOperation=false;

			if(this.sqrt){
				top.value+=btnValue;
				this.sqrt=false;
			} 
			else
				top.value+=bottom.value+btnValue;


			if(this.operation==''){
				this.memory=bottom.value;
			}
			else{
				this.memory=+eval(this.memory+this.operation+bottom.value);
				
			}
			bottom.value=this.memory;
				this.operation=btnValue;
				this.replace=true;
				
		}
	
Calculator.prototype.equelClick=function(top, bottom){
	top.value='';
	bottom.value=eval(this.memory+this.operation+bottom.value);
	this.initProp();
	
}

Calculator.prototype.initProp=function(){
	this.replace=false;
	this.memory=0;
	this.repeatOperation=false;
	this.operation='';
	this.sqrt=false;
}
Calculator.prototype.pointClick=function(bottom){
	if(this.replace){
		bottom.value='0.';
		this.replace=false;
		return
	}
	var str=bottom.value;
	var pos=str.indexOf('.');
	if(pos!=-1)return;
	bottom.value+='.';

	}
	Calculator.prototype.sqrtClick=function(top, bottom){
	this.sqrt=true;
	var str=top.value;
	var last=str[str.length-1];
	if(last=='+'||last=='-'||last=='*'||last==''){
		top.value+='sqrt('+bottom.value+')';
	}
	else{
		if(top.value=='')
			top.value='sqrt('+bottom.value+')';
		else
			top.value='sqrt('+top.value+')';
	}
	bottom.value=Math.sqrt(+bottom.value);
	}
	
