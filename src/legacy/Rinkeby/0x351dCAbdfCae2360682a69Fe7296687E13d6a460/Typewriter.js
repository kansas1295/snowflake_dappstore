
import React from "react";

export default class Typewriter extends React.Component {
  state = {
    typeColor: {
      color: "white"
    },
    typed: ""
  };

  componentDidMount() {
    this.typeWord(
      this.props.inputStrings[0],
      [].concat(this.props.inputStrings)
    );
  }

  componentDidUpdate(prevProps,prevState) {
    if(prevProps.inputStrings !== this.props.inputStrings){
        this.setState({typed:" "},()=>console.log())
        this.typeWord(
            this.props.inputStrings[0],
            [].concat(this.props.inputStrings)
          );
    }
  }
  

  typeWord(word, words) {
    this.stringChecker(word, words);
  }

  typeWriter(string, words) {
    if (string.length === 0) {
      words = words.slice(1);
      words[0] && this.typeWord(words[0], words);
    } else {
      this.setState((state, props) => ({
        typed: state.typed.concat(string[0])
      }));

      setTimeout(() => this.typeWriter(string.slice(1), words), 100);
    }
  }

  stringChecker(string, words) {
    if (this.props.fontColor === true) {
      this.setState({ typeColor: { color: "white" } });
    } else {
      this.setState({ typeColor: { color: "rgb(255, 197, 89)" } });
    }
    this.typeWriter(string, words);
  }

  render() {
    return <div style={this.state.typeColor}>{this.state.typed}</div>;
  }
}
