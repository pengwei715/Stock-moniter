
import "bootstrap/dist/css/bootstrap.css";
import { getPrice} from "@/components/utils";
window.React = require('react');
import React, { Component, PropTypes } from 'react';
import SortableTable from 'react-sortable-table';

class ChangeBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            symbol:'ibm',
            more:0,
            less:0
        }
    }

    handleSumbitAdd(e) {
        e.preventDefault()
        this.props.addHandler(this.state)
    }
    handleSumbitSub(e) {
        e.preventDefault()
        this.props.subHandler(this.state)
    }
    handleChangeSymbol(e) {
        this.setState({symbol:e.target.value})
    }
    handleChangeAmount(e) {
        this.setState({more:parseInt(e.target.value), less:parseInt(e.target.value)})
    }
    render(){
        return (
        <div >
           <form className='row ml-1 mr-1 text-center'>
           <input className="col-md-3 p-2 ml-3" onChange={(a)=>this.handleChangeSymbol(a)} placeholder="Search by symbol..."></input> 
           <input className="col-md-3 p-2 ml-3" onChange={(b)=>this.handleChangeAmount(b)} placeholder="amount..."></input> 
           <button className = 'btn btn-primary col-md-1 ml-3' onClick={(c)=>this.handleSumbitAdd(c)} >Buy</button>
           <button className = 'btn btn-primary col-md-1 ml-3' onClick={(d)=>this.handleSumbitSub(d)}>Sell</button>
           <h5 className = 'col-md-2 ml-5 text-light text-center'>Current total value : {this.props.total}</h5>    
            </form> 
        </div>
        )
    }
}

const symbolSorter = {
desc: (data, key) => {
    var result = data.sort(function (_a, _b) {
        const a = _a[key]
        const b = _b[key] 
      if ( a <= b ) {
        return 1;
      } else if ( a > b) {
        return -1;
      }
    });
    return result;
  },
 
  asc: (data, key) => {
    return data.sort(function (_a, _b) {
    const a = _a[key]
    const b = _b[key]
      if ( a >= b ) {
        return 1;
      } else if ( a < b) {
        return -1;
      }
    })
  }
};


class SortTable extends React.Component {
  constructor() {
    super()
    this.state = {
        data: this.get_data()  
    };
    this.get_price()
  }

  get_price(){

    var promises = this.state.data.map((item) => {
      return getPrice(item.symbol).then((res) => {
        return {symbol: item.symbol, share: item.share, current_price: res, total_value: res*item.share}
      })
    })
    Promise.all(promises).then((res) => {
      this.setState({data:res})
    })
   
}

  get_total_value(){
      var res = 0
      this.state.data.forEach(element => {
          res += element.total_value    
      });
      return res
  }

  get_data(){
      if(localStorage){
        return JSON.parse(localStorage.getItem('data'))
    }
    return [{ symbol: 'amzn', share: 0, current_price: 0, total_value:0 },
    {symbol: 'ibm', share: 0, current_price: 0, total_value:0 }]
  }

  componentDidMount() {
    const json = localStorage.getItem('data')
    const items = JSON.parse(json)
    this.setState(() => ({ data: items }))
    this.get_price()
  }
  componentDidUpdate(){
    const json = JSON.stringify(this.state.data)
    localStorage.setItem('data', json)

  }

  add(val){
    var amount = val.more
    var sym = val.symbol
    var copy = [...this.state.data] 
    var stk
    for (stk of copy) {
        if (stk.symbol == sym) {
            stk.share += amount
            this.setState({data:copy})
            this.get_price()
            return
        }
    }
    copy.push({symbol:sym, share:amount, current_price:0, total_value:0 })
    this.setState({data:copy})
  }

  sub(val){
    var amount = val.more
    var sym = val.symbol
    var copy = [...this.state.data] 
    var stk
    for (stk of copy) {
        if (stk.symbol == sym && stk.share>= amount) {
            stk.share -= amount
            copy = copy.filter(function(item) {
              return item.share !== 0
            })
            this.setState({data:copy})
            this.get_price()
            return
        }
    }
    alert(`you can't sell ${amount} shares of ${sym}`)
  }

  render() {
    const columns = [
      {
        header: 'symbol',
        key: 'symbol',
        defaultSorting: 'ASC',
        descSortFunction: symbolSorter.desc,
        ascSortFunction: symbolSorter.asc,
        headerStyle: { fontSize: '15px', backgroundColor: '#FFDAB9', width: '100px' },
        dataStyle: { fontSize: '15px', backgroundColor: '#FFDAB9'},
        dataProps: { className: 'align-right' },
      },
      {
        header: 'share',
        key: 'share',
        headerStyle: { fontSize: '15px' },
        headerProps: { className: 'align-left' },
        descSortFunction: symbolSorter.desc,
        ascSortFunction: symbolSorter.asc
      },
      {
        header: 'current_price',
        key: 'current_price',
        headerStyle: { fontSize: '15px' },
        descSortFunction: symbolSorter.desc,
        ascSortFunction: symbolSorter.asc
      },

      {
        header: 'total_value',
        key: 'total_value',
        headerStyle: { fontSize: '15px' },
        descSortFunction: symbolSorter.desc,
        ascSortFunction: symbolSorter.asc
      }

    ];
 
    const style = {
      backgroundColor: '#eee'
    };
 
    const iconStyle = {
      color: '#aaa',
      paddingLeft: '5px',
      paddingRight: '5px'
    };

    const json = JSON.stringify(this.state.data)
    localStorage.setItem('data', json)

    return (
        <div>
      <SortableTable
        data={this.state.data}
        columns={columns}
        style={style}
        iconStyle={iconStyle} />
        <div className = 'row mb-5'>
             <ChangeBar addHandler = {(e)=>this.add(e)}  subHandler = {(b)=>{this.sub(b)}}
               total = {this.get_total_value()}
             />
        </div>
       
        </div>
    );
  }
}

export default SortTable;