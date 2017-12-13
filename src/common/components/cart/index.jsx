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
		this.isEdit = false;
		this.editorprods = moco.slice();
		this.state.editor = {
			isEdit: false,
			prods: moco.slice(),
		};
		this.countCart = this.countCart.bind(this);
		this.changeEditorStatus = this.changeEditorStatus.bind(this);
		this.handleNumChange = this.handleNumChange.bind(this);
		this.saveEditor = this.saveEditor.bind(this);
		this.cancelEditor = this.cancelEditor.bind(this);
	}
	cheng(a, b) {
		return a * b;
	}

	numadd(a, b) {
		return a + b;
	}

		//计算商品总价、数量
	countCart(){
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

	changeEditorStatus() {
		this.setState({isEdit: !this.state.isEdit})
	}

	handleNumChange(idx, num, type, e) {
		//Array.slice() 和解构都是浅拷贝，引用对象依然相互关联，所以要对修改后的对象实现替换。
		const prods = [...this.state.editorprods];
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
		this.setState({editorprods: prods});
		
	}

	saveEditor() {
		this.setState({prods: this.state.editorprods})
	}
	cancelEditor() {
		// this.setState((prevState, props) => {
		//   let prods = prevState.prods;
		// 	let editor = prevState.editor;
		// 	return {...editor, prods};
		// });
	}

	render() {
		const countCart = this.countCart();
	
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
					prods={this.state.isEdit ? this.state.editorprods : this.state.prods} 
					editorStatus = {this.state.isEdit}
					onSelect={this.handleSelectChange} 
					onNumChange={this.handleNumChange}
				>

				</CartProds>

				<CountAll allMoney={countCart[0]} allNum={countCart[1]}></CountAll>
			</div>
		)
	};
}

function CartProds(props) {
	var ui = props.prods.map((item, idx) => {
			return (
				<li key={idx}><img src={item.imgUrl}/>
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
	return (
		<div>
			<span>总价：{props.allMoney}; 总数： {props.allNum}</span>
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
