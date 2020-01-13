import React from "react";
import style from "./styles/pageOne.less";
import { connect } from "react-redux";
import Counter from "components/counter";
import { increment, decrement } from "../../actions";
/**
 * pageOne
 * @description pageOne
 */
const mapStateToProps = value => ({
  ...value.counter
});
const mapDispatchToProps = dispatch => ({
  onIncrement: () => dispatch(increment()),
  onDecrement: () => dispatch(decrement())
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
