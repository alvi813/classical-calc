import React, {Component} from 'react';
import CalculatorTitle from './calculatorTitle.js';
import OutputScreen from './outputScreen.js';
import Button from './button.js';

import '../index.css'

class Calculator extends Component {

    constructor(props) {
        super(props);
        // set our default state
        this.state = {
            request: 0,
            calculationResult: false
        }
    }


    render() {
        return (
            <div className="mainAll">
                <CalculatorTitle value="Classical Calculator"/>
                <div className="mainCalc">
                    <OutputScreen request={this.state.request}/>
                    <div className="button-row">
                        <Button label={'C'} handleClick={this.handleClick}/>
                        <Button label={'CE'} handleClick={this.handleClick}/>
                        <Button label={'/'} handleClick={this.handleClick}/>
                        <Button label={'*'} handleClick={this.handleClick}/>
                    </div>
                    <div className="button-row">
                        <Button label={'7'} handleClick={this.handleClick}/>
                        <Button label={'8'} handleClick={this.handleClick}/>
                        <Button label={'9'} handleClick={this.handleClick}/>
                        <Button label={'-'} handleClick={this.handleClick}/>
                    </div>
                    <div className="button-row">
                        <Button label={'4'} handleClick={this.handleClick}/>
                        <Button label={'5'} handleClick={this.handleClick}/>
                        <Button label={'6'} handleClick={this.handleClick}/>
                        <Button label={'+'} handleClick={this.handleClick}/>
                    </div>
                    <div className="button-row">
                        <Button label={'1'} handleClick={this.handleClick}/>
                        <Button label={'2'} handleClick={this.handleClick}/>
                        <Button label={'3'} handleClick={this.handleClick}/>
                        <Button label={'.'} handleClick={this.handleClick}/>
                    </div>
                    <div className="button-row">
                        <Button label={'0'} handleClick={this.handleClick}/>
                        <Button label={'='} handleClick={this.handleClick}/>
                    </div>
                </div>
            </div>
        );
    }

    // method to handle click events from buttons
    handleClick = (event) => {

        // get the value from the target element (button)
        const value = event.target.value;
        //let calculationResult = false;

        switch (value) {
            case '=': {
                if (this.state.request !== 0) {
                    let num = 0;

                    if (this.state.request.includes('/')) {
                        num = (eval(this.state.request)).toPrecision(14);       // toPrecision - total number of digits displayed on the output screen

                        while (num.substr(num.length - 1, num.length) === '0') {
                            num = num.substr(0, num.length - 1);
                        }

                        if (num.substr(num.length - 1, num.length) === '.') {
                            num = num.substr(0, num.length - 1);
                        }

                        num = num.replace(/0*$/, "");
                    } else {
                        num = eval(this.state.request)
                    }

                    if (num === undefined)
                        this.setState({request: "Math Error"})
                    else {
                        this.setState({request: num});
                        this.setState({calculationResult: true}); // the result of the calculation was output. the next button click should clear the output screen
                    }
                }
                break;
            }
            case 'C': {
                this.setState({request: 0});
                break;
            }

            case 'CE': {
                let str = this.state.request;
                if(str !== 0) {
                    str = str.substr(0, str.length - 1);
                    this.setState({request: str});
                }
                break;
            }

            default: {
                let str = this.state.request;



                if(str === 0 && value !== '.') {
                    this.setState({request: value})
                }
                else if (str !== 0 && this.state.calculationResult === true) {

                    this.setState({calculationResult: false});

                    /* if we entered a number, then start counting from the beginning.
                    if we entered an arithmetic sign, we continue working with the resulting value */
                    isNaN(value) ? this.setState({request: this.state.request += value}) : this.setState({request: value});
                }

                //if we type two non numbers in a row (exception minus)
                else if ((str !== 0) && ((value === '/')  || (value === '*')  || (value === '+'))  &&
                    ((str.slice(-1) === '/') || (str.slice(-1) ==='*') || (str.slice(-1) ==='-') || (str.slice(-1) ==='+'))) {
                        str = str.substr(0, str.length - 1);
                    this.setState({request: str += value})
                }
                else {
                    this.setState({request: this.state.request += value})
                }
                break;
            }
        }
    }

}

export default Calculator;
