import React from 'react';
import style from './styles/pageTwo.less';
import { connect } from "react-redux";
import Counter from "components/counter";
import { increment, decrement, fetchData } from "../../redux/actions";

/**
 * pageTwo
 * @description pageTwo
 */

const mapStateToProps = value => ({
    ...value.counter
})
const mapDispatchToProps = dispatch => ({
    onIncrement: () => dispatch(increment()),
    onDecrement: () => dispatch(decrement()),
    fetchData: () => dispatch(fetchData())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);