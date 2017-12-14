import React from 'react';
const moco = [{
	imgUrl: '',
	title: '123test',
	price: 2,
	num: 1,
	},{
	imgUrl: '',
	title: '123test',
	price: 3,
	num: 1,
},{
	imgUrl: '',
	title: '123test',
	price: 4,
	num: 1,
},{
	imgUrl: '',
	title: '123test',
	price: 2,
	num: 1,
},{
	imgUrl: '',
	title: '123test',
	price: 1,
	num: 1,
}];
class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.prods = moco.slice();
		this.state.isEdit = false;
		this.state.prodsbk =[];
		this.state.selector = Array(this.state.prods.length).fill(false);
		this.countCart = this.countCart.bind(this);
		this.changeEditorStatus = this.changeEditorStatus.bind(this);
		this.handleNumChange = this.handleNumChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleSelectAll = this.handleSelectAll.bind(this);
		this.saveEditor = this.saveEditor.bind(this);
		this.cancelEditor = this.cancelEditor.bind(this);
		this.deletSelected = this.deletSelected.bind(this);
	}
	cheng(a, b) {
		return a * b;
	}

	numadd(a, b) {
		return a + b;
	}

		//计算商品总价、数量
	countCart(){
		if(this.state.isEdit) return [0, 0];
		const prods = this.state.prods;		
		if(prods.length === 0) return [0, 0];
		var i = 0, len = prods.length, countTemp, allMoney = 0, allNum = 0;
		for(i; i < len; i++) {
			countTemp = this.cheng(prods[i].price, prods[i].num);
			allMoney = this.numadd(countTemp, allMoney);
			allNum = this.numadd(prods[i].num, allNum);

		}
		return [allMoney, allNum];
	}

	isSelectAll() {
		const selector = this.state.selector;
		const sl = selector.length && selector.filter(v => v === true).length === selector.length;
		console.log('isSelect all', sl);
		return sl;
	}

	changeEditorStatus() {
		this.setState({isEdit: !this.state.isEdit}, () => {
		
			if(this.state.isEdit) {
				const prodsbk = this.state.prods.slice(0);
				this.setState({prodsbk});
			}
			
		})
	}

	handleSelect(idx, e) {
		//生成prods副本
		const selector = this.state.selector.slice(0);
		const isSelected =  e.target.checked;
		selector[idx] = isSelected;
		this.setState({selector: selector}, () => {})
	}

	handleSelectAll() {
		const selector = Array(this.state.prods.length).fill(true);
		this.setState({selector});
	}

	handleNumChange(idx, num, type, e) {
		//Array.slice() 和解构都是浅拷贝，引用对象依然相互关联，所以要对修改后的对象实现替换。
		const prods = [...this.state.prods];
		const preprod = prods[idx];
		var newprod;

		switch (type) {
			case 1://+
				
				newprod = {...preprod, num: preprod.num + 1 }

				break;
			case -1: //-
				newprod = {...preprod, num: preprod.num - 1 }
				break;
			case 2: //input
				newprod = {...preprod, num: e.target.value}
				break;
		}

		prods.splice(idx, 1, newprod)
		this.setState({prods});
	}

	saveEditor() {
		// this.setState({prods: this.state.prodsbk})
	}
	cancelEditor() {
		const preprods = this.state.prodsbk.slice(0); 
		this.setState({prods: preprods, selector: Array(preprods.length).fill(false)})
	}

	deletSelected() {
		const selector = this.state.selector;
		const prods = this.state.prods.slice(0);
		const filterProds = prods.map((v, i) => {
			return selector[i] ? false : v;
		}).filter(v => v != false);

		this.setState({prods:filterProds, selector: Array(filterProds.length).fill(false)}, () => console.log('selector after delet', this.isSelectAll(), this.state.selector));
		//清空selector
		//this.setState({selector: Array(filterProds.length).fill(false)});
		
	}
	gopay() {

	}

	render() {
		const countCart = this.countCart();
		const isSelectAll = this.isSelectAll();
	
		return (
			<div className="cart-container">
				<div className="top-tool">
					<span>购物车</span>
					<div onClick={this.changeEditorStatus}>
						{this.state.isEdit ? 
							( <div>
								<div onClick={this.saveEditor}>完成</div>
							 <div onClick={this.cancelEditor}>取消</div></div>) 
							: 
							(<div>编辑</div>)
						}
					</div>
				</div>

				<CartProds 
					prods={this.state.prods} 
					selector = {this.state.selector}
					editorStatus = {this.state.isEdit}
					onSelect={this.handleSelect} 
					onNumChange={this.handleNumChange}
				>
				</CartProds>

				<CountAll 
					allMoney={countCart[0]} 
					allNum={countCart[1]} 
					isSelectAll={isSelectAll}
					isEdit={this.state.isEdit}
					handleSlectAll={this.handleSelectAll}
					deletSelected={this.deletSelected}
					gopay={this.gopay} 
				>
				</CountAll>
			</div>
		)
	};
}

function CartProds(props) {
	var ui = props.prods.map((item, idx) => {
			return (
				<li key={idx}><input type="checkbox" checked={props.selector[idx]} onClick={(e) => {props.onSelect(idx,e)}}/><img src={item.imgUrl}/>
					<span>{item.title}</span>
					<span>价格：{item.price}</span>
					<ChangeProdNum 
						onNumChange={props.onNumChange} 
						id={idx}  
						value={item.num}
						isEdit={props.editorStatus}
					>
					</ChangeProdNum></li>
			)
		})
		return (
			<ul>{ui}</ul>
		)
}



function ChangeProdNum(props) {
	return(
		<div>
			{props.isEdit && (<span onClick={(e) => {props.onNumChange(props.id, 1, 1, e)}}> + </span>)}
			<input type="number" disabled={!props.isEdit} value={props.value} onChange={(e) => {props.onNumChange(props.id, null, 2, e)}} />
			{props.isEdit && (<span onClick={(e) => {props.onNumChange(props.id, 1, -1, e)}}> - </span>)}
		</div>
	)
}

function CountAll(props) {
	const allSelectStyle = props.isSelectAll ? {color: '#f60'} : {};
	var actionUi;
	if(props.isEdit) {
		actionUi = (<span onClick={props.deletSelected}>删除所选</span>)
	}else{
		actionUi = (<span onClick={props.goPay}>去支付</span>)
	}
	return (
		<div>
			<span>总价：{props.allMoney}; 总数： {props.allNum}</span><span onClick={props.handleSlectAll} style={allSelectStyle}>全选</span>{actionUi}
		</div>
	)
}

function replaceObjectOfArray(newObj, idx, arrayObj) {
	return arrayObj.splice(idx, 1, newObj);
}

export {
	Cart,
	CartProds,
	ChangeProdNum,
} 
